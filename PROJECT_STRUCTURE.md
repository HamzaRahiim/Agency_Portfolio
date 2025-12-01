# Next.js Base Template - Project Structure

This document outlines the recommended project structure for a feature-based Next.js application template that can be reused across all your development projects.

## 📁 Complete Project Structure

```
base_template/
├── .env.local                    # Environment variables (gitignored)
├── .env.example                  # Example environment variables template
├── .gitignore                    # Git ignore rules
├── .eslintrc.json                # ESLint configuration (if using JSON)
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── pnpm-lock.yaml               # Package lock file (or yarn.lock/npm)
├── postcss.config.mjs           # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration (if needed)
├── README.md                     # Project documentation
├── PROJECT_STRUCTURE.md          # This file
│
├── public/                       # Static assets
│   ├── favicon.ico              # Site favicon
│   ├── apple-touch-icon.png     # Apple touch icon
│   ├── og-image.jpg             # Open Graph image
│   ├── robots.txt               # Robots.txt (optional, can use route)
│   └── images/                  # Image assets
│       └── logo.svg
│
└── src/
    ├── app/                      # Next.js App Router
    │   ├── layout.tsx           # Root layout (required)
    │   ├── page.tsx              # Home page (required)
    │   ├── globals.css           # Global styles
    │   ├── loading.tsx           # Global loading UI
    │   ├── error.tsx             # Global error boundary
    │   ├── not-found.tsx         # 404 page
    │   ├── template.tsx          # Template wrapper (optional)
    │   ├── robots.ts             # Dynamic robots.txt
    │   ├── sitemap.ts            # Dynamic sitemap.xml
    │   ├── favicon.ico           # Favicon
    │   │
    │   ├── (auth)/               # Route group (auth pages)
    │   │   ├── login/
    │   │   │   ├── page.tsx
    │   │   │   └── loading.tsx
    │   │   └── register/
    │   │       ├── page.tsx
    │   │       └── loading.tsx
    │   │
    │   ├── (dashboard)/          # Route group (dashboard pages)
    │   │   ├── layout.tsx        # Dashboard layout
    │   │   ├── dashboard/
    │   │   │   ├── page.tsx
    │   │   │   └── loading.tsx
    │   │   └── settings/
    │   │       ├── page.tsx
    │   │       └── loading.tsx
    │   │
    │   └── api/                  # API routes
    │       ├── route.ts          # Example API route
    │       └── health/
    │           └── route.ts
    │
    ├── components/               # Shared React components
    │   ├── ui/                   # Base UI components (buttons, inputs, etc.)
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── card.tsx
    │   │   ├── modal.tsx
    │   │   └── index.ts          # Barrel exports
    │   │
    │   ├── layout/               # Layout components
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Sidebar.tsx
    │   │   └── Navbar.tsx
    │   │
    │   ├── common/               # Common reusable components
    │   │   ├── LoadingSpinner.tsx
    │   │   ├── ErrorMessage.tsx
    │   │   ├── EmptyState.tsx
    │   │   └── PageHeader.tsx
    │   │
    │   └── providers/            # Context providers
    │       ├── ThemeProvider.tsx
    │       └── ToastProvider.tsx
    │
    ├── features/                 # Feature-based modules
    │   ├── auth/                 # Authentication feature
    │   │   ├── components/
    │   │   │   ├── LoginForm.tsx
    │   │   │   └── RegisterForm.tsx
    │   │   ├── hooks/
    │   │   │   └── useAuth.ts
    │   │   ├── lib/
    │   │   │   └── auth.ts
    │   │   └── types/
    │   │       └── auth.types.ts
    │   │
    │   ├── dashboard/            # Dashboard feature
    │   │   ├── components/
    │   │   │   ├── StatsCard.tsx
    │   │   │   └── Chart.tsx
    │   │   ├── hooks/
    │   │   │   └── useDashboard.ts
    │   │   └── lib/
    │   │       └── dashboard.ts
    │   │
    │   └── users/                # Users feature
    │       ├── components/
    │       │   ├── UserList.tsx
    │       │   └── UserCard.tsx
    │       ├── hooks/
    │       │   └── useUsers.ts
    │       └── lib/
    │           └── users.ts
    │
    ├── lib/                      # Shared utilities and configurations
    │   ├── utils.ts              # General utility functions
    │   ├── constants.ts          # App constants
    │   ├── validations.ts        # Zod/validation schemas
    │   └── api/                  # API client configuration
    │       ├── client.ts
    │       └── endpoints.ts
    │
    ├── hooks/                    # Shared custom React hooks
    │   ├── useDebounce.ts
    │   ├── useLocalStorage.ts
    │   ├── useMediaQuery.ts
    │   └── useClickOutside.ts
    │
    ├── types/                    # TypeScript type definitions
    │   ├── index.ts              # Global types
    │   ├── api.types.ts          # API response types
    │   └── global.d.ts           # Global type declarations
    │
    ├── styles/                   # Additional styles (if needed)
    │   ├── components.css
    │   └── animations.css
    │
    └── middleware.ts             # Next.js middleware (auth, redirects, etc.)
```

## 📄 Essential Files Explained

### App Router Files (src/app/)

#### 1. `layout.tsx` ✅ (Required)

- Root layout component
- Wraps all pages
- Contains metadata, fonts, global providers
- **Status**: Already exists

#### 2. `page.tsx` ✅ (Required)

- Home page component
- **Status**: Already exists

#### 3. `globals.css` ✅ (Required)

- Global CSS styles
- Tailwind imports
- CSS variables
- **Status**: Already exists (needs improvement)

#### 4. `loading.tsx` ⚠️ (Recommended)

- Global loading UI
- Shows while pages are loading
- **Status**: Needs to be created

#### 5. `error.tsx` ⚠️ (Recommended)

- Global error boundary
- Catches errors in the app
- **Status**: Needs to be created

#### 6. `not-found.tsx` ⚠️ (Recommended)

- Custom 404 page
- Shows when route doesn't exist
- **Status**: Needs to be created

#### 7. `template.tsx` (Optional)

- Similar to layout but re-renders on navigation
- Use for animations/transitions
- **Status**: Optional

#### 8. `robots.ts` ✅ (Recommended)

- Dynamic robots.txt generation
- **Status**: Already exists (needs completion)

#### 9. `sitemap.ts` ✅ (Recommended)

- Dynamic sitemap.xml generation
- **Status**: Already exists (needs completion)

### Feature-Based Structure (src/features/)

Each feature should be self-contained with:

- `components/` - Feature-specific components
- `hooks/` - Feature-specific hooks
- `lib/` - Feature-specific utilities
- `types/` - Feature-specific types

### Shared Components (src/components/)

- `ui/` - Base UI components (reusable across features)
- `layout/` - Layout components (Header, Footer, etc.)
- `common/` - Common components (Loading, Error, etc.)
- `providers/` - Context providers

### Utilities (src/lib/)

- `utils.ts` - General utility functions
- `constants.ts` - App-wide constants
- `validations.ts` - Validation schemas
- `api/` - API client setup

## 🎯 Recommended File Checklist

### ✅ Must Have Files

- [x] `src/app/layout.tsx`
- [x] `src/app/page.tsx`
- [x] `src/app/globals.css`
- [x] `src/app/robots.ts`
- [x] `src/app/sitemap.ts`
- [ ] `src/app/loading.tsx`
- [ ] `src/app/error.tsx`
- [ ] `src/app/not-found.tsx`
- [ ] `src/middleware.ts`
- [ ] `.env.example`

### ⚠️ Recommended Files

- [ ] `src/components/ui/button.tsx`
- [ ] `src/components/ui/input.tsx`
- [ ] `src/components/layout/Header.tsx`
- [ ] `src/components/layout/Footer.tsx`
- [ ] `src/components/common/LoadingSpinner.tsx`
- [ ] `src/components/common/ErrorMessage.tsx`
- [ ] `src/lib/utils.ts`
- [ ] `src/lib/constants.ts`
- [ ] `src/types/index.ts`
- [ ] `src/hooks/useDebounce.ts`

### 📝 Configuration Files

- [x] `next.config.ts`
- [x] `tsconfig.json`
- [x] `package.json`
- [x] `eslint.config.mjs`
- [x] `postcss.config.mjs`
- [ ] `tailwind.config.ts` (if using Tailwind v3)

## 🚀 Next Steps

1. Review this structure
2. Confirm which files you want to create
3. I'll create all the necessary base files with proper boilerplate code
4. Customize as needed for your projects

## 📌 Notes

- **Route Groups**: Use `(folderName)` for organizing routes without affecting URL structure
- **Feature-Based**: Keep features isolated and reusable
- **Barrel Exports**: Use `index.ts` files for cleaner imports
- **Type Safety**: Define types in `types/` directory
- **API Routes**: Keep API logic in `src/app/api/` or `src/lib/api/`
