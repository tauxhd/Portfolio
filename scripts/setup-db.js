require('dotenv').config({ path: '.env.local' })
const { neon } = require('@neondatabase/serverless')

const sql = neon(process.env.DATABASE_URL)

async function setup() {
  console.log('Setting up database...')

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      long_description TEXT,
      tech TEXT[] NOT NULL,
      github_url VARCHAR(500),
      live_url VARCHAR(500),
      figma_url VARCHAR(500),
      image_url VARCHAR(500),
      featured BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
  console.log('✓ Projects table created')

  await sql`
    INSERT INTO projects (title, description, long_description, tech, github_url, live_url, figma_url, featured)
    VALUES (
      'PennyPilot',
      'A full-stack finance app helping Malaysian university students track expenses, set budgets, and get AI-powered spending insights.',
      'Designed and built end-to-end in one week — from Figma UI design to full deployment. Features expense tracking with filtering, category-based budgets with visual progress indicators, an AI spending coach powered by Groq (Llama 3.3 70B) with Malaysian context, and a profile system with photo upload.',
      ARRAY['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Groq API', 'Vercel'],
      'https://github.com/tauxhd/PennyPilot',
      'https://penny-pilot-red.vercel.app',
      'https://shorturl.at/5yK4m',
      true
    )
    ON CONFLICT DO NOTHING
  `
  console.log('✓ PennyPilot project seeded')

  console.log('✅ Database ready!')
  process.exit(0)
}

setup().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})