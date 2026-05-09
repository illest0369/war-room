import { NextRequest, NextResponse } from 'next/server'
import { getAgents, getAgent } from '@/lib/notion'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const agent = await getAgent(id)
      if (!agent) {
        return NextResponse.json(
          { success: false, error: 'Agent not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true, data: agent })
    }

    const agents = await getAgents()
    return NextResponse.json({ success: true, data: agents })
  } catch (error) {
    console.error('Error fetching agents:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch agents' },
      { status: 500 }
    )
  }
}
