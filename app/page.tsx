import { isAdmin } from '@/lib/session'
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Design from '@/components/sections/Design'
import Contact from '@/components/sections/Contact'

export default async function Home() {
  const admin = await isAdmin()

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects isAdmin={admin} />
      <Design />
      <Contact />
    </main>
  )
}