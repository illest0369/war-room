import { NextRequest, NextResponse } from 'next/server'
import { getContentQueue, getContentItem } from '@/lib/notion'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const status = searchParams.get('status')

    if (id) {
      const item = await getContentItem(id)
      if (!item) {
        return NextResponse.json(
          { success: false, error: 'Content item not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true, data: item })
    }

    const items = await getContentQueue(status || undefined)
    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
}
