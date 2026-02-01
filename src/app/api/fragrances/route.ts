import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query') || ''
  const limit = parseInt(searchParams.get('limit') || '20', 10)

  const supabase = await createClient()

  let dbQuery = supabase
    .from('fragrances')
    .select(`
      id,
      name,
      concentration,
      gender_marketing,
      image_url,
      release_year,
      brands (
        id,
        name
      )
    `)
    .order('name')
    .limit(limit)

  if (query) {
    // Use trigram similarity search
    dbQuery = dbQuery.or(`name.ilike.%${query}%,brands.name.ilike.%${query}%`)
  }

  const { data, error } = await dbQuery

  if (error) {
    console.error('Error fetching fragrances:', error)
    return NextResponse.json({ error: 'Failed to fetch fragrances' }, { status: 500 })
  }

  // Transform to match expected format
  const fragrances = data?.map(f => ({
    id: f.id,
    name: f.name,
    brand: f.brands?.name || 'Unknown',
    brand_id: f.brands?.id,
    concentration: f.concentration,
    gender: f.gender_marketing,
    image_url: f.image_url,
    release_year: f.release_year
  })) || []

  return NextResponse.json(fragrances)
}
