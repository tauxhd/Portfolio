import { SessionOptions, getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
  isAdmin: boolean
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'portfolio-admin-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 24 hours
  },
}

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  )
  return session
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSession()
  return session.isAdmin === true
}