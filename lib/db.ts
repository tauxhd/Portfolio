import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

export const sql = neon(process.env.DATABASE_URL)

export interface Project {
  id: number
  title: string
  description: string
  long_description: string | null
  tech: string[]
  github_url: string | null
  live_url: string | null
  figma_url: string | null
  image_url: string | null
  featured: boolean
  created_at: string
}

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await sql`
      SELECT * FROM projects
      ORDER BY featured DESC, created_at DESC
    `
    return projects as Project[]
  } catch (error) {
    console.error('getProjects error:', error)
    throw error
  }
}

export async function createProject(data: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
  const [project] = await sql`
    INSERT INTO projects (
      title, description, long_description,
      tech, github_url, live_url, figma_url,
      image_url, featured
    ) VALUES (
      ${data.title}, ${data.description}, ${data.long_description},
      ${data.tech}, ${data.github_url}, ${data.live_url}, ${data.figma_url},
      ${data.image_url}, ${data.featured}
    )
    RETURNING *
  `
  return project as Project
}

export async function deleteProject(id: number): Promise<void> {
  await sql`DELETE FROM projects WHERE id = ${id}`
}