import { NextRequest, NextResponse } from 'next/server'
import { getKnowledgeItems, getKnowledgeItem, searchKnowledge } from '@/lib/notion'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const category = searchParams.get('category')
    const query = searchParams.get('q')

    if (id) {
      const item = await getKnowledgeItem(id)
      if (!item) {
        return NextResponse.json(
          { success: false, error: 'Knowledge item not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true, data: item })
    }

    if (query) {
      const results = await searchKnowledge(query)
      return NextResponse.json({ success: true, data: results })
    }

    const items = await getKnowledgeItems(category || undefined)
    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    console.error('Error fetching knowledge:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch knowledge' },
      { status: 500 }
    )
  }
}
