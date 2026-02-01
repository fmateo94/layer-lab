import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: recipes, error } = await supabase
    .from('recipes')
    .select(`
      id,
      title,
      occasion,
      season,
      created_at,
      recipe_items (
        position,
        sprays,
        fragrances (
          id,
          name,
          brands (name)
        )
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching recipes:', error)
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 })
  }

  // Transform to a cleaner format
  const formattedRecipes = recipes?.map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    occasion: recipe.occasion,
    season: recipe.season,
    created_at: recipe.created_at,
    items: recipe.recipe_items
      ?.sort((a, b) => a.position - b.position)
      .map(item => ({
        position: item.position,
        sprays: item.sprays,
        fragrance: {
          id: item.fragrances?.id,
          name: item.fragrances?.name,
          brand: item.fragrances?.brands?.name
        }
      }))
  }))

  return NextResponse.json(formattedRecipes)
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, occasion, season, items } = body

    if (!items || !Array.isArray(items) || items.length < 2) {
      return NextResponse.json({ error: 'Recipe must have at least 2 fragrances' }, { status: 400 })
    }

    // Create the recipe
    const { data: recipe, error: recipeError } = await supabase
      .from('recipes')
      .insert({
        user_id: user.id,
        title,
        occasion,
        season
      })
      .select()
      .single()

    if (recipeError || !recipe) {
      console.error('Error creating recipe:', recipeError)
      return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 })
    }

    // Add recipe items
    const recipeItems = items.map((item: { fragrance_id: string; sprays?: number }, index: number) => ({
      recipe_id: recipe.id,
      fragrance_id: item.fragrance_id,
      position: index + 1,
      sprays: item.sprays || (index === 0 ? 2 : 1) // Default: 2 sprays base, 1 spray topper
    }))

    const { error: itemsError } = await supabase
      .from('recipe_items')
      .insert(recipeItems)

    if (itemsError) {
      console.error('Error adding recipe items:', itemsError)
      // Clean up the recipe if items failed
      await supabase.from('recipes').delete().eq('id', recipe.id)
      return NextResponse.json({ error: 'Failed to add recipe items' }, { status: 500 })
    }

    return NextResponse.json({ id: recipe.id, message: 'Recipe created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Recipe creation error:', error)
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 })
  }
}
