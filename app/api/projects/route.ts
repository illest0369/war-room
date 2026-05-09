import { NextRequest, NextResponse } from 'next/server'
import { getProjects, getProject } from '@/lib/notion'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const project = await getProject(id)
      if (!project) {
        return NextResponse.json(
          { success: false, error: 'Project not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true, data: project })
    }

    const projects = await getProjects()
    return NextResponse.json({ success: true, data: projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
