import { NextRequest, NextResponse } from 'next/server'
import { getTasks, getTask } from '@/lib/notion'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const owner = searchParams.get('owner')

    if (id) {
      const task = await getTask(id)
      if (!task) {
        return NextResponse.json(
          { success: false, error: 'Task not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true, data: task })
    }

    const filter = {
      ...(status && { status }),
      ...(priority && { priority }),
      ...(owner && { owner })
    }

    const tasks = await getTasks(Object.keys(filter).length > 0 ? filter : undefined)
    return NextResponse.json({ success: true, data: tasks })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}
