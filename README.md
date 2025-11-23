# Portfolio + Lab 🧪

> A digital garden and experimental laboratory.

This is a hybrid project: it serves as both my professional portfolio and a "Lab" environment for isolated frontend experiments. Built to be performant, type-safe, and easily extensible without the overhead of a complex backend.

## 🏗 Architecture & Decisions

### 1. The "Registry Pattern"

Instead of over-engineering a database (CMS) for a personal site, I utilized a **Static Registry Pattern**.

- **Data:** All projects and experiments are defined in strict TypeScript arrays (`data/projects.ts`).
- **Benefits:** Zero API latency, full type safety, and instant static generation (SSG).
- **Scalability:** Adding a new project is as simple as adding an object to the array; the UI updates automatically.

### 2. Isolated "Lab" Environment

The application uses Next.js Route Groups to create two distinct visual contexts:

- **Portfolio (`/`):** Clean, minimal, typographic-centric.
- **The Lab (`/lab`):** Immersive, dark-mode default, experiment-focused.

### 3. "Desktop First" Experiments

While the portfolio is fully responsive, the "Lab" allows for complex canvas/physics experiments that may not translate to touch. A custom `LabLayout` handles mobile detection and provides warnings without blocking access.

## ⚡ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Animations:** Framer Motion (Page Transitions)
- **Navigation:** Command Menu (`cmdk`)
- **Package Manager:** pnpm

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone [https://github.com/Rohit-Saini7/portfolio-lab.git](https://github.com/Rohit-Saini7/portfolio-lab.git)
   cd portfolio-lab
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run development server**

   ```bash
   pnpm dev
   ```

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

## 🧪 Adding an Experiment

The architecture is designed for rapid prototyping:

1.  Build the component in `components/lab/`.
2.  Register it in `data/projects.ts` with type `"lab"`.
3.  Add a case to the switch statement in `app/lab/[slug]/page.tsx`.

## 📄 License

MIT © [Rohit Saini](https://github.com/Rohit-Saini7)
