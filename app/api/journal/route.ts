import { NextRequest, NextResponse } from 'next/server'
import { getJournalEntries, getJournalEntry, searchJournalEntries } from '@/lib/notion'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const query = searchParams.get('q')

    if (id) {
      const entry = await getJournalEntry(id)
      if (!entry) {
        return NextResponse.json(
          { success: false, error: 'Entry not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true, data: entry })
    }

    if (query) {
      const results = await searchJournalEntries(query)
      return NextResponse.json({ success: true, data: results })
    }

    const entries = await getJournalEntries()
    return NextResponse.json({ success: true, data: entries })
  } catch (error) {
    console.error('Error fetching journal entries:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch journal entries' },
      { status: 500 }
    )
  }
}
