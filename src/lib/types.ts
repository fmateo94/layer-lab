// API response types for LayerLab

export interface FragranceListItem {
  id: string
  name: string
  brand: string
  brand_id?: string
  concentration: string | null
  gender: string | null
  image_url?: string | null
  release_year?: number | null
}

export interface FragranceDetail extends FragranceListItem {
  description?: string | null
  notes: {
    top: string[]
    middle: string[]
    base: string[]
  }
  accords: string[]
  provenance?: string[]
}

export interface RecommendationExplanation {
  shared_notes: string[]
  complementary_notes: string[]
  accord_balance_notes: string
  risk_flags: string[]
}

export interface RecommendationItem {
  fragrance_id: string
  name: string
  brand: string
  concentration: string | null
  image_url?: string | null
  score: number
  rank: number
  explanation: RecommendationExplanation
}

export interface RecommendationsResponse {
  base_fragrance: {
    id: string
    name: string
    brand: string
  }
  recommendations: RecommendationItem[]
}

// For compatibility with existing components, we map the API data to this format
export interface Fragrance {
  id: string
  name: string
  brand: string
  gender: 'masculine' | 'feminine' | 'unisex'
  concentration: 'EDT' | 'EDP' | 'Parfum' | 'Cologne' | string
  notes: {
    top: string[]
    middle: string[]
    base: string[]
  }
  accords: string[]
  season?: string[]
  occasion?: string[]
  imageUrl?: string | null
}

export interface LayeringRecommendation {
  fragrance: Fragrance
  score: number
  reasons: string[]
  layeringType: 'enhance' | 'complement' | 'contrast'
  sharedNotes: string[]
  complementaryNotes: string[]
}

// Convert API recommendation to component format
export function mapApiRecommendation(item: RecommendationItem): LayeringRecommendation {
  const layeringType: 'enhance' | 'complement' | 'contrast' =
    item.explanation.shared_notes.length >= 2 ? 'enhance' :
    item.explanation.complementary_notes.length > 0 ? 'complement' : 'contrast'

  const reasons: string[] = []
  if (item.explanation.shared_notes.length > 0) {
    reasons.push(`Shares ${item.explanation.shared_notes.slice(0, 2).join(', ')} notes`)
  }
  if (item.explanation.complementary_notes.length > 0) {
    reasons.push(`Adds ${item.explanation.complementary_notes.slice(0, 2).join(', ')} character`)
  }
  if (item.explanation.accord_balance_notes) {
    reasons.push(item.explanation.accord_balance_notes)
  }
  if (item.explanation.risk_flags.length > 0) {
    reasons.push(...item.explanation.risk_flags.map(f => `Note: ${f}`))
  }

  return {
    fragrance: {
      id: item.fragrance_id,
      name: item.name,
      brand: item.brand,
      gender: 'unisex', // API doesn't return this in recommendations, default to unisex
      concentration: item.concentration || 'EDP',
      notes: { top: [], middle: [], base: [] }, // Not needed for display
      accords: [],
      imageUrl: item.image_url
    },
    score: item.score,
    reasons: reasons.length > 0 ? reasons : ['Creates an interesting combination'],
    layeringType,
    sharedNotes: item.explanation.shared_notes,
    complementaryNotes: item.explanation.complementary_notes
  }
}

// Convert API fragrance detail to component format
export function mapApiFragrance(detail: FragranceDetail): Fragrance {
  return {
    id: detail.id,
    name: detail.name,
    brand: detail.brand,
    gender: (detail.gender as 'masculine' | 'feminine' | 'unisex') || 'unisex',
    concentration: detail.concentration || 'EDP',
    notes: detail.notes,
    accords: detail.accords,
    season: [],
    occasion: [],
    imageUrl: detail.image_url
  }
}
