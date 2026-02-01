import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

interface RecommendationRequest {
  base_fragrance_id: string
  candidate_scope?: 'my_collection' | 'global' | 'both'
  filters?: {
    season?: string
    occasion?: string
    office_safe?: boolean
    avoid_notes?: string[]
  }
}

interface FragranceWithNotes {
  id: string
  name: string
  brand: string
  concentration: string | null
  gender: string | null
  notes: { top: string[]; middle: string[]; base: string[] }
  accords: string[]
  note_families: string[]
}

// Note family complementary relationships
const COMPLEMENTARY_FAMILIES: Record<string, string[]> = {
  citrus: ['woody', 'aromatic', 'floral', 'spicy'],
  floral: ['woody', 'musk', 'oriental', 'citrus', 'green'],
  woody: ['citrus', 'spicy', 'floral', 'oriental', 'leather'],
  spicy: ['woody', 'oriental', 'citrus', 'leather'],
  oriental: ['spicy', 'woody', 'floral', 'gourmand'],
  fresh: ['citrus', 'green', 'aromatic', 'musk'],
  green: ['floral', 'citrus', 'fresh', 'woody'],
  aromatic: ['citrus', 'fresh', 'woody', 'green'],
  gourmand: ['oriental', 'spicy', 'fruity'],
  fruity: ['floral', 'gourmand', 'fresh', 'citrus'],
  musk: ['floral', 'fresh', 'woody', 'oriental'],
  leather: ['woody', 'spicy', 'tobacco', 'smoky'],
  tobacco: ['leather', 'woody', 'spicy', 'oriental'],
  smoky: ['leather', 'woody', 'spicy', 'oriental'],
  earthy: ['woody', 'green', 'aromatic']
}

function calculateScore(base: FragranceWithNotes, candidate: FragranceWithNotes): {
  score: number
  explanation: {
    shared_notes: string[]
    complementary_notes: string[]
    accord_balance_notes: string
    risk_flags: string[]
  }
} {
  let score = 0
  const sharedNotes: string[] = []
  const complementaryNotes: string[] = []
  const riskFlags: string[] = []

  const baseAllNotes = [...base.notes.top, ...base.notes.middle, ...base.notes.base]
  const candidateAllNotes = [...candidate.notes.top, ...candidate.notes.middle, ...candidate.notes.base]

  // 1. Shared notes (15 points each, max 3)
  baseAllNotes.forEach(note => {
    if (candidateAllNotes.includes(note) && sharedNotes.length < 3) {
      sharedNotes.push(note)
      score += 15
    }
  })

  // 2. Complementary note families (20 points each)
  const baseNoteFamilies = new Set(base.note_families)
  const candidateNoteFamilies = new Set(candidate.note_families)

  baseNoteFamilies.forEach(family => {
    const complementary = COMPLEMENTARY_FAMILIES[family] || []
    complementary.forEach(compFamily => {
      if (candidateNoteFamilies.has(compFamily)) {
        if (!complementaryNotes.includes(compFamily)) {
          complementaryNotes.push(compFamily)
          score += 20
        }
      }
    })
  })

  // 3. Accord harmony (10 points each)
  const baseAccords = new Set(base.accords.map(a => a.toLowerCase()))
  const candidateAccords = new Set(candidate.accords.map(a => a.toLowerCase()))
  let accordMatches = 0
  baseAccords.forEach(accord => {
    if (candidateAccords.has(accord)) {
      accordMatches++
    }
  })
  score += accordMatches * 10

  // 4. Base note compatibility (25 points)
  const baseBaseNotes = new Set(base.notes.base.map(n => n.toLowerCase()))
  const candidateBaseNotes = new Set(candidate.notes.base.map(n => n.toLowerCase()))
  let baseNoteOverlap = 0
  baseBaseNotes.forEach(note => {
    if (candidateBaseNotes.has(note)) {
      baseNoteOverlap++
    }
  })
  if (baseNoteOverlap === 1) {
    score += 25 // Some cohesion
  } else if (baseNoteOverlap >= 2) {
    score += 15 // Too much overlap can be cloying
    riskFlags.push('Similar base notes may blend together')
  }

  // 5. Top-to-base layering bonus (15 points)
  // If candidate has fresh/citrus top and base has warm/woody base
  const candidateHasFreshTop = candidate.notes.top.some(n =>
    ['bergamot', 'lemon', 'grapefruit', 'orange', 'lime', 'mint'].includes(n.toLowerCase())
  )
  const baseHasWarmBase = base.notes.base.some(n =>
    ['vanilla', 'amber', 'sandalwood', 'cedar', 'musk', 'tonka bean'].includes(n.toLowerCase())
  )
  if (candidateHasFreshTop && baseHasWarmBase) {
    score += 15
  }

  // 6. Penalize heavy accord stacking
  const heavyAccords = ['oud', 'amber', 'tobacco', 'leather', 'smoky']
  const baseHeavyCount = base.accords.filter(a => heavyAccords.includes(a.toLowerCase())).length
  const candidateHeavyCount = candidate.accords.filter(a => heavyAccords.includes(a.toLowerCase())).length
  if (baseHeavyCount >= 1 && candidateHeavyCount >= 1) {
    score -= 10
    riskFlags.push('Both fragrances have heavy accords - may be overpowering')
  }

  // 7. Gender compatibility bonus (10 points)
  if (base.gender === candidate.gender || base.gender === 'unisex' || candidate.gender === 'unisex') {
    score += 10
  }

  // Generate accord balance notes
  let accordBalanceNotes = ''
  if (sharedNotes.length > 0 && complementaryNotes.length > 0) {
    accordBalanceNotes = `Creates cohesion through ${sharedNotes.slice(0, 2).join(', ')} while adding ${complementaryNotes.slice(0, 2).join(', ')} complexity`
  } else if (sharedNotes.length > 0) {
    accordBalanceNotes = `Amplifies the ${sharedNotes.slice(0, 2).join(', ')} notes`
  } else if (complementaryNotes.length > 0) {
    accordBalanceNotes = `Adds contrasting ${complementaryNotes.slice(0, 2).join(', ')} notes`
  } else {
    accordBalanceNotes = 'Creates an interesting contrast'
  }

  return {
    score: Math.max(0, score),
    explanation: {
      shared_notes: sharedNotes,
      complementary_notes: complementaryNotes,
      accord_balance_notes: accordBalanceNotes,
      risk_flags: riskFlags
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: RecommendationRequest = await request.json()
    const { base_fragrance_id, filters } = body

    if (!base_fragrance_id) {
      return NextResponse.json({ error: 'base_fragrance_id is required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Fetch base fragrance with notes and accords
    const { data: baseFragrance, error: baseError } = await supabase
      .from('fragrances')
      .select(`
        id,
        name,
        concentration,
        gender_marketing,
        brands (name)
      `)
      .eq('id', base_fragrance_id)
      .single()

    if (baseError || !baseFragrance) {
      return NextResponse.json({ error: 'Base fragrance not found' }, { status: 404 })
    }

    // Fetch base fragrance notes
    const { data: baseNotes } = await supabase
      .from('fragrance_notes')
      .select(`
        layer,
        notes (name, note_family)
      `)
      .eq('fragrance_id', base_fragrance_id)

    // Fetch base fragrance accords
    const { data: baseAccords } = await supabase
      .from('fragrance_accords')
      .select('accords (name)')
      .eq('fragrance_id', base_fragrance_id)

    // Build base fragrance object
    const base: FragranceWithNotes = {
      id: baseFragrance.id,
      name: baseFragrance.name,
      brand: baseFragrance.brands?.name || 'Unknown',
      concentration: baseFragrance.concentration,
      gender: baseFragrance.gender_marketing,
      notes: { top: [], middle: [], base: [] },
      accords: baseAccords?.map(a => a.accords?.name).filter(Boolean) as string[] || [],
      note_families: []
    }

    const noteFamiliesSet = new Set<string>()
    baseNotes?.forEach(fn => {
      const noteName = fn.notes?.name
      const noteFamily = fn.notes?.note_family
      if (noteName && fn.layer in base.notes) {
        base.notes[fn.layer as keyof typeof base.notes].push(noteName)
      }
      if (noteFamily) noteFamiliesSet.add(noteFamily)
    })
    base.note_families = Array.from(noteFamiliesSet)

    // Fetch all candidate fragrances (excluding base)
    const { data: candidates, error: candidatesError } = await supabase
      .from('fragrances')
      .select(`
        id,
        name,
        concentration,
        gender_marketing,
        brands (name)
      `)
      .neq('id', base_fragrance_id)

    if (candidatesError) {
      return NextResponse.json({ error: 'Failed to fetch candidates' }, { status: 500 })
    }

    // Fetch all notes for candidates
    const candidateIds = candidates?.map(c => c.id) || []
    const { data: allCandidateNotes } = await supabase
      .from('fragrance_notes')
      .select(`
        fragrance_id,
        layer,
        notes (name, note_family)
      `)
      .in('fragrance_id', candidateIds)

    // Fetch all accords for candidates
    const { data: allCandidateAccords } = await supabase
      .from('fragrance_accords')
      .select('fragrance_id, accords (name)')
      .in('fragrance_id', candidateIds)

    // Group notes and accords by fragrance
    const notesByFragrance: Record<string, { layer: string; name: string; family: string | null }[]> = {}
    const accordsByFragrance: Record<string, string[]> = {}

    allCandidateNotes?.forEach(fn => {
      if (!notesByFragrance[fn.fragrance_id]) notesByFragrance[fn.fragrance_id] = []
      if (fn.notes?.name) {
        notesByFragrance[fn.fragrance_id].push({
          layer: fn.layer,
          name: fn.notes.name,
          family: fn.notes.note_family
        })
      }
    })

    allCandidateAccords?.forEach(fa => {
      if (!accordsByFragrance[fa.fragrance_id]) accordsByFragrance[fa.fragrance_id] = []
      if (fa.accords?.name) {
        accordsByFragrance[fa.fragrance_id].push(fa.accords.name)
      }
    })

    // Score each candidate
    const scoredCandidates = candidates?.map(c => {
      const candidateNotes = notesByFragrance[c.id] || []
      const notes = { top: [] as string[], middle: [] as string[], base: [] as string[] }
      const noteFamilies = new Set<string>()

      candidateNotes.forEach(n => {
        if (n.layer in notes) {
          notes[n.layer as keyof typeof notes].push(n.name)
        }
        if (n.family) noteFamilies.add(n.family)
      })

      const candidate: FragranceWithNotes = {
        id: c.id,
        name: c.name,
        brand: c.brands?.name || 'Unknown',
        concentration: c.concentration,
        gender: c.gender_marketing,
        notes,
        accords: accordsByFragrance[c.id] || [],
        note_families: Array.from(noteFamilies)
      }

      // Apply avoid_notes filter
      if (filters?.avoid_notes && filters.avoid_notes.length > 0) {
        const candidateAllNotes = [...notes.top, ...notes.middle, ...notes.base].map(n => n.toLowerCase())
        const hasAvoidedNote = filters.avoid_notes.some(an =>
          candidateAllNotes.includes(an.toLowerCase())
        )
        if (hasAvoidedNote) {
          return null // Skip this candidate
        }
      }

      const { score, explanation } = calculateScore(base, candidate)

      return {
        fragrance_id: c.id,
        name: c.name,
        brand: candidate.brand,
        concentration: c.concentration,
        score,
        explanation
      }
    }).filter(Boolean) || []

    // Sort by score and take top results
    const rankedResults = scoredCandidates
      .sort((a, b) => (b?.score || 0) - (a?.score || 0))
      .slice(0, 15)
      .map((r, index) => ({
        ...r,
        rank: index + 1
      }))

    return NextResponse.json({
      base_fragrance: {
        id: base.id,
        name: base.name,
        brand: base.brand
      },
      recommendations: rankedResults
    })
  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 })
  }
}
