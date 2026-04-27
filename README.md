# ⚡ Nexus — Premium Tech Marketplace

A polished, full-featured Next.js application built for the Odyssey assessment. Nexus is a tech product marketplace with Firebase authentication, protected routes, and a rich dark-luxury UI.

## Live Link
- **[https://nexus-gad.vercel.app/](https://nexus-gad.vercel.app/)**

## ✨ Key Features

- **Landing Page** — Hero, Stats, Features, Featured Products, Testimonials, CTA (7 sections)
- **Products Catalogue** — Search + category, price range & rating filters, sorting, responsive grid
- **Product Detail** — Full specs, related products, dynamic routing `/items/[id]`
- **About Page** — Mission, team, values, stats
- **Firebase Auth** — Email/password + Google OAuth, Context API state management
- **Protected: Add Product** — Form with inline validation + toast confirmation
- **Protected: Manage Products** — Table/grid view, delete with modal confirmation
- **Sticky Responsive Navbar** — User dropdown with profile info, mobile hamburger
- **Footer** — Links, social icons, copyright

## 🛠️ Tech Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Firebase Authentication** (Email/Password + Google)
- **CSS Variables** + Tailwind v4 for styling
- **Lucide React** for icons, **react-hot-toast** for notifications
- **Playfair Display** + **DM Sans** typography
- **localStorage** for persisting user-added products

## 🚀 Setup & Installation

### 1. Clone & install

```bash
git clone https://github.com/itihash-oboshonno/Nexus.git
cd nexus-app
npm install
```

### 2. Set up Firebase

1. Visit [Firebase Console](https://console.firebase.google.com/) and create a project
2. Enable **Authentication** → Email/Password and Google sign-in methods
3. Go to **Project Settings → Your Apps** → Add a Web App → copy config

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy to Vercel

```bash
npm install -g vercel && vercel
```

Add all `NEXT_PUBLIC_FIREBASE_*` environment variables in Vercel → Project Settings → Environment Variables.

## 🗺️ Route Summary

| Route             | Access     | Description                          |
|-------------------|------------|--------------------------------------|
| `/`               | Public     | Landing page (6 sections)            |
| `/items`          | Public     | Catalogue with search & filters      |
| `/items/[id]`     | Public     | Product detail (dynamic route)       |
| `/about`          | Public     | About page                           |
| `/login`          | Public     | Email + Google sign-in               |
| `/register`       | Public     | Account registration                 |
| `/items/add`      | 🔒 Private | Add a new product                    |
| `/items/manage`   | 🔒 Private | Manage & delete products             |

## 📁 Project Structure

```
nexus-app/
├── app/
│   ├── layout.tsx          # Root layout (AuthProvider + Toaster)
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Design system
│   ├── about/page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── items/
│       ├── page.tsx        # Catalogue + search/filter
│       ├── [id]/page.tsx   # Product detail
│       ├── add/page.tsx    # Protected
│       └── manage/page.tsx # Protected
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ItemCard.tsx
├── contexts/AuthContext.tsx
├── data/items.ts
├── lib/firebase.ts
└── .env.local.example
```
