# Portfolio + Lab 🧪

> A digital garden and experimental laboratory.

This is a hybrid project: it serves as both my professional portfolio and a "Lab" environment for isolated experiments. Built to be performant, type-safe, and easily extensible without the overhead of a complex backend.

## ⚡ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Animations:** Framer Motion (Page Transitions)
- **Navigation:** Command Menu (`cmdk`)
- **Package Manager:** pnpm

## 📂 Project Structure

```bash
├── app/
│   ├── lab/            # The Lab environment (isolated layout)
│   │   └── [slug]/     # Dynamic experiment workbench
│   ├── layout.tsx      # Root layout (Providers)
│   └── page.tsx        # Main Portfolio
├── components/
│   ├── lab/            # Isolated experiment components (Physics engine, etc.)
│   └── ui/             # shadcn/ui primitives
├── data/               # The "Database" (projects.ts, experience.ts)
└── public/             # Static assets
```
