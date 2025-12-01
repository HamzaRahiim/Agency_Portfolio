# Agency Portfolio Template

A professional, modern agency portfolio template built with **Next.js**, **Tailwind CSS**, and **TypeScript**. This template is designed for agencies and freelancers to showcase their work, services, and expertise.

## 🚀 Tech Stack

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 19](https://react.dev/)** - UI library

## 📋 Features

- ✅ Modern, responsive design
- ✅ Feature-based project structure
- ✅ Custom loading states
- ✅ Error handling with error boundaries
- ✅ Custom 404 page
- ✅ SEO optimized (robots.txt, sitemap.xml)
- ✅ Dark mode support (via CSS variables)
- ✅ Type-safe development

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository:**

```bash
git clone <your-repo-url>
cd base_template
```

2. **Install dependencies:**

```bash
pnpm install
# or
npm install
# or
yarn install
```

3. **Run the development server:**

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

4. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

This template follows a **feature-based architecture** for better organization and scalability. See `PROJECT_STRUCTURE.md` for complete details.

```
src/
├── app/              # Next.js App Router pages
├── components/        # Reusable React components
├── features/          # Feature-based modules
├── lib/              # Utilities and configurations
├── hooks/            # Custom React hooks
└── types/            # TypeScript type definitions
```

## 🎨 Customization

1. **Update metadata** in `src/app/layout.tsx`
2. **Modify colors** in `src/app/globals.css` (CSS variables)
3. **Add your content** in `src/app/page.tsx`
4. **Customize components** in `src/components/`

## 📦 Build for Production

```bash
pnpm build
pnpm start
```

## 🚢 Deploy

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

Or follow the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 📄 License

This template is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this template and customize it for your needs. If you make improvements, contributions are welcome!

---

Built with ❤️ using Next.js, Tailwind CSS, and TypeScript
