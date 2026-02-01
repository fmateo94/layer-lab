import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch fragrance with brand
  const { data: fragrance, error: fragranceError } = await supabase
    .from('fragrances')
    .select(`
      id,
      name,
      concentration,
      gender_marketing,
      description,
      image_url,
      release_year,
      brands (
        id,
        name
      )
    `)
    .eq('id', id)
    .single()

  if (fragranceError || !fragrance) {
    return NextResponse.json({ error: 'Fragrance not found' }, { status: 404 })
  }

  // Fetch notes grouped by layer
  const { data: noteData, error: notesError } = await supabase
    .from('fragrance_notes')
    .select(`
      layer,
      notes (
        id,
        name,
        note_family
      ),
      sources (
        name
      )
    `)
    .eq('fragrance_id', id)

  if (notesError) {
    console.error('Error fetching notes:', notesError)
  }

  // Fetch accords
  const { data: accordData, error: accordsError } = await supabase
    .from('fragrance_accords')
    .select(`
      accords (
        id,
        name
      ),
      sources (
        name
      )
    `)
    .eq('fragrance_id', id)

  if (accordsError) {
    console.error('Error fetching accords:', accordsError)
  }

  // Group notes by layer
  const notes: { top: string[]; middle: string[]; base: string[] } = {
    top: [],
    middle: [],
    base: []
  }

  noteData?.forEach(fn => {
    const noteName = fn.notes?.name
    if (noteName && fn.layer in notes) {
      notes[fn.layer as keyof typeof notes].push(noteName)
    }
  })

  // Get unique source names for provenance
  const sourceNames = new Set<string>()
  noteData?.forEach(fn => {
    if (fn.sources?.name) sourceNames.add(fn.sources.name)
  })
  accordData?.forEach(fa => {
    if (fa.sources?.name) sourceNames.add(fa.sources.name)
  })

  const response = {
    id: fragrance.id,
    name: fragrance.name,
    brand: fragrance.brands?.name || 'Unknown',
    brand_id: fragrance.brands?.id,
    concentration: fragrance.concentration,
    gender: fragrance.gender_marketing,
    description: fragrance.description,
    image_url: fragrance.image_url,
    release_year: fragrance.release_year,
    notes,
    accords: accordData?.map(a => a.accords?.name).filter(Boolean) || [],
    provenance: Array.from(sourceNames)
  }

  return NextResponse.json(response)
}
