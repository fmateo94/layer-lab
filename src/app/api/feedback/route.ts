import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      base_fragrance_id,
      layered_fragrance_id,
      recipe_id,
      rating,
      liked,
      tags,
      comment
    } = body

    // Validate that at least one reference is provided
    if (!base_fragrance_id && !recipe_id) {
      return NextResponse.json(
        { error: 'Either base_fragrance_id or recipe_id is required' },
        { status: 400 }
      )
    }

    // Validate rating if provided
    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Validate tags if provided
    const validTags = [
      'too sweet', 'too loud', 'too subtle', 'office safe',
      'date night', 'summer', 'winter', 'spring', 'fall',
      'compliment getter', 'long lasting', 'poor longevity',
      'projects well', 'intimate only'
    ]

    if (tags && Array.isArray(tags)) {
      const invalidTags = tags.filter((t: string) => !validTags.includes(t.toLowerCase()))
      if (invalidTags.length > 0) {
        // Allow custom tags but warn in logs
        console.warn('Custom tags provided:', invalidTags)
      }
    }

    const { data: feedback, error } = await supabase
      .from('feedback')
      .insert({
        user_id: user.id,
        base_fragrance_id,
        layered_fragrance_id,
        recipe_id,
        rating,
        liked,
        tags,
        comment
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating feedback:', error)
      return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 })
    }

    return NextResponse.json({
      id: feedback.id,
      message: 'Feedback saved successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Feedback creation error:', error)
    return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 })
  }
}

export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: feedback, error } = await supabase
    .from('feedback')
    .select(`
      id,
      rating,
      liked,
      tags,
      comment,
      created_at,
      base_fragrance:fragrances!feedback_base_fragrance_id_fkey (
        id,
        name,
        brands (name)
      ),
      layered_fragrance:fragrances!feedback_layered_fragrance_id_fkey (
        id,
        name,
        brands (name)
      ),
      recipe:recipes (
        id,
        title
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 })
  }

  return NextResponse.json(feedback)
}
