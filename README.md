# Tauedea Gabi — Portfolio

Personal portfolio website showcasing my software engineering projects and UI/UX design work. Built with Next.js 14, Tailwind CSS, and Neon DB.

🔗 **Live site:** [portfolio-snowy-psi-59.vercel.app](https://portfolio-snowy-psi-59.vercel.app)

---

## Features

- **Animated hero** with typewriter effect cycling through roles
- **About section** with tech stack and university info
- **Projects section** powered by Neon DB — dynamically loaded, no hardcoding
- **Admin panel** at `/admin` — password-protected, lets me add or delete projects without touching code
- **Design work section** linking to my Figma community profile
- **Contact section** with links to GitHub, LinkedIn, Figma and email
- **Fully responsive** — works on mobile, tablet and desktop
- **Black & gold theme** with smooth scroll animations

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Neon DB (Serverless Postgres) |
| Auth | iron-session (cookie-based) |
| Deployment | Vercel |

---

## Project Structure

```
portfolio/
├── app/
│   ├── admin/
│   │   └── page.tsx          # Admin login page
│   ├── api/
│   │   ├── admin/
│   │   │   └── login/
│   │   │       └── route.ts  # Login & logout API
│   │   └── projects/
│   │       └── route.ts      # Projects CRUD API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Main page
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Design.tsx
│   │   └── Contact.tsx
│   └── Navbar.tsx
├── lib/
│   ├── db.ts                 # Neon DB client & queries
│   └── session.ts            # iron-session config
└── scripts/
    └── setup-db.js           # DB setup & seed script
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon DB](https://neon.tech) account (free)

### Installation

1. Clone the repo
```bash
git clone https://github.com/tauxhd/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables — create a `.env.local` file in the root:
```env
DATABASE_URL=your_neon_connection_string
ADMIN_PASSWORD=your_chosen_password
SESSION_SECRET=a_random_32_character_string
```

4. Set up the database
```bash
node scripts/setup-db.js
```

5. Run the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

---

## Admin Panel

To add or delete projects without touching code:

1. Go to `/admin` on your live site
2. Enter your admin password
3. A floating **+** button will appear on the projects section
4. Click it to add a new project via a modal form
5. Hover over any project card and click the trash icon to delete it

---

## Deployment

The site is deployed on Vercel with automatic deployments on every push to `main`.

To deploy your own version:

1. Push the repo to GitHub
2. Import it on [vercel.com](https://vercel.com)
3. Add the three environment variables (`DATABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET`)
4. Deploy

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built by [Tauedea Arehui Gabi](https://www.linkedin.com/in/tauxhd) • [GitHub](https://github.com/tauxhd) • [Figma](https://www.figma.com/@tauxhd)
