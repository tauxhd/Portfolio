import { NextRequest, NextResponse } from 'next/server'
import { getProjects, createProject, deleteProject } from '@/lib/db'
import { isAdmin } from '@/lib/session'

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await req.json()

    if (!data.title || !data.description || !data.tech) {
      return NextResponse.json(
        { error: 'Title, description and tech are required' },
        { status: 400 }
      )
    }

    const project = await createProject({
      title: data.title,
      description: data.description,
      long_description: data.long_description || null,
      tech: Array.isArray(data.tech) ? data.tech : data.tech.split(',').map((t: string) => t.trim()),
      github_url: data.github_url || null,
      live_url: data.live_url || null,
      figma_url: data.figma_url || null,
      image_url: data.image_url || null,
      featured: data.featured || false,
    })

    return NextResponse.json(project, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await req.json()
    await deleteProject(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}