require('dotenv').config({ path: '.env.local' })
const { neon } = require('@neondatabase/serverless')

const sql = neon(process.env.DATABASE_URL)

sql`SELECT 1`
  .then(r => console.log('Connected!', r))
  .catch(e => console.error('Error:', e.message))