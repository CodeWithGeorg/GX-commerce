# 🚀 GX Commerce

<div align="center">

![GX Commerce](https://img.shields.io/badge/GX-Commerce-v0.0.0-FA1E4E?style=for-the-badge&logo=rocket)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-2.89-3FCF8E?style=flat-square&logo=supabase)

_A futuristic gaming e-commerce platform with AI-powered shopping assistance_

</div>

---

## ✨ Features

### 🛒 E-Commerce Core

- **Product Catalog** - Browse gaming hardware across multiple categories (Components, Peripherals, Laptops, Audio)
- **Shopping Cart** - Full cart functionality with quantity management
- **Wishlist** - Save products for later with one-click toggling
- **Search** - Global search across product names and descriptions
- **Category Filtering** - Filter products by category

### 🤖 AI Shopping Assistant

- **GX-ARES** - AI-powered shopping assistant built with Google Gemini
- **Tactical Gaming Persona** - Provides recommendations with a "gamer-cool" personality
- **Product Intelligence** - Can explain specs, recommend gear, and help build optimal loadouts

### 🎨 Cyberpunk Theme System

- **Dark/Light Mode** - Full theme switching support
- **Customizable Accent Color** - Change the primary accent color
- **RGB Glow Intensity** - Adjustable glow effects
- **Scanline Effects** - Retro-futuristic visual effects
- **Responsive Design** - Optimized for desktop and mobile

### 👤 User Authentication

- **Supabase Auth** - Secure user authentication
- **User Profiles** - Persistent user data
- **Order History** - View past purchases (simulated)

### 📱 Modern UI Components

- **Animated Sidebar** - Collapsible navigation
- **Product Cards** - Rich product displays with ratings
- **Checkout Flow** - Multi-step checkout process
- **Settings Panel** - Theme customization options
- **Trailers Section** - Product video showcase

---

## 🛠️ Tech Stack

| Category           | Technology                       |
| ------------------ | -------------------------------- |
| **Frontend**       | React 19.2.3                     |
| **Language**       | TypeScript 5.8                   |
| **Build Tool**     | Vite 6.2                         |
| **Styling**        | Tailwind CSS + Custom CSS        |
| **Icons**          | Lucide React 0.561               |
| **Authentication** | Supabase (JS Client 2.89)        |
| **AI/LLM**         | Google Gemini API 1.34           |
| **Analytics**      | Vercel Analytics                 |
| **Fonts**          | Orbitron (Headers), Inter (Body) |

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for authentication)
- Google Gemini API key (for AI assistant)

### Setup

1. **Clone the repository**

   ```bash
   cd /home/george/Desktop/gx-commerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Google Gemini API
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Configure Supabase**

   Create a `users` table in your Supabase project:

   ```sql
   create table users (
     id uuid references auth.users not null,
     email text,
     created_at timestamp with time zone default timezone('utc'::text, now())
   );
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 🔧 Environment Variables

| Variable                 | Description               | Required |
| ------------------------ | ------------------------- | -------- |
| `VITE_SUPABASE_URL`      | Your Supabase project URL | ✅ Yes   |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key    | ✅ Yes   |
| `VITE_GEMINI_API_KEY`    | Google Gemini API key     | ✅ Yes   |

### Obtaining API Keys

**Supabase:**

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy the Project URL and anon key

---

## 📁 Project Structure

```
gx-commerce/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── AIChat.tsx         # AI assistant chat interface
│   │   ├── AuthModal.tsx      # User authentication modal
│   │   ├── CheckoutModal.tsx  # Checkout flow modal
│   │   ├── ProductCard.tsx    # Product display card
│   │   ├── Profile.tsx        # User profile page
│   │   ├── Settings.tsx       # Theme settings panel
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   └── Trailers.tsx       # Product video trailers
│   ├── services/           # External service integrations
│   │   ├── geminiService.ts   # Google Gemini AI service
│   │   └── supabaseClient.ts  # Supabase client setup
│   ├── App.tsx             # Main application component
│   ├── constants.tsx       # Product data & categories
│   ├── index.tsx           # Application entry point
│   ├── main.tsx            # React DOM rendering
│   └── types.ts            # TypeScript type definitions
├── .env                    # Environment variables (create)
├── .gitignore              # Git ignore rules
├── index.html              # HTML entry point
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

---

## 🎮 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm install`     | Install all dependencies |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

---

## 🤖 GX-ARES AI Assistant

### Overview

GX-ARES (Automated Research & Equipment Specialist) is an AI shopping assistant designed specifically for gamers. It uses Google Gemini to provide intelligent product recommendations.

### Personality

- **Identity** - Tactical wingman for your "Commander"
- **Communication** - High-energy, gamer-cool, but professional
- **Lingo** - Uses gaming terminology (loadout, meta, squad, GG)

### System Prompt Features

- Product-aware recommendations based on current inventory
- Technical explanations with "Tactical Advantage" framing
- Formatted responses with headers like [STATUS], [INTEL], [COMMAND_DECISION]
- Knowledge of all products in the catalog

### Sample Interactions

```
User: Hi
GX-ARES: "Uplink stable! Great to have you back on the grid, Commander.
My processors are primed and I'm ready to help you build a meta-tier loadout.
What's the mission today?"

User: What's the best GPU?
GX-ARES: [INTEL] The GX-9000 Phantom GPU leads the grid with 24GB GDDR6X
and a 2.8 GHz clock. [COMMAND_DECISION] For pure performance, this is your
best tactical choice for any high-end build.
```

---

## 🎨 Theme Customization

### CSS Variables

The theme system uses CSS custom properties:

```css
:root {
  --bg-primary: #0b0b0d; /* Main background */
  --bg-secondary: #161618; /* Secondary background */
  --bg-tertiary: #1a1a1c; /* Tertiary elements */
  --text-primary: #ffffff; /* Primary text */
  --text-secondary: #9ca3af; /* Secondary text */
  --border-color: #1f2937; /* Borders */
  --accent-color: #fa1e4e; /* Accent color (default) */
  --glow-intensity: 0.8; /* RGB glow intensity (0-1) */
}
```

### Light Mode

Add `class="light"` to the `<html>` element to switch to light theme.

### Dynamic Color Changes

Update `--accent-color` at runtime to change the accent color:

```typescript
document.documentElement.style.setProperty("--accent-color", "#00ff00");
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel project settings
5. Deploy

### Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Import your repository
4. Add build command: `npm run build`
5. Add output directory: `dist`
6. Add environment variables
7. Deploy

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

---

## 📝 API Reference

### getShoppingAdvice

```typescript
import { getShoppingAdvice } from "./services/geminiService";

const response = await getShoppingAdvice(
  "What's the best laptop for gaming?",
  availableProducts,
);
console.log(response);
```

**Parameters:**

- `userMessage` (string): The user's question
- `availableProducts` (Product[]): Array of available products for context

**Returns:** Promise<string> - AI response text

### Supabase Client

```typescript
import { supabase } from "./services/supabaseClient";

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password123",
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password123",
});

// Sign out
await supabase.auth.signOut();

// Get current user
const {
  data: { user },
} = await supabase.auth.getUser();
```

---

## 🧪 Development Notes

### Hot Module Replacement

Vite provides instant HMR - changes to any file will be reflected immediately.

### TypeScript Strict Mode

The project uses strict TypeScript mode. Ensure all new components follow the type definitions.

### Custom Alias

The `@` alias is configured to point to the project root for cleaner imports:

```typescript
import { supabase } from "@/services/supabaseClient";
```

---

## 📄 License

MIT License - Feel free to use this project for learning or as a starting point for your own e-commerce applications.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

For questions or issues:

1. Check the [Issues](https://github.com/CodeWithGeorg/gx-commerce/issues) page
2. Review the documentation above
3. Check environment variable configuration

---

## ☕ Support the Project

If you enjoy GX Commerce and want to support its development, consider buying me a coffee! Every bit of support helps keep the project alive and improving.

<a href="https://buymeacoffee.com/CodeWithGeorg" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 160px !important;" />
</a>

---

## 🏆 Sponsors

Become a sponsor and get your logo here, early access to features, and priority support!

<a href="https://github.com/sponsors/CodeWithGeorg" target="_blank">
  <img src="https://img.shields.io/badge/Become-a_Sponsor-FA1E4E?style=for-the-badge&logo=github-sponsors" alt="Sponsor" />
</a>

---

<div align="center">

**Built with ⚡ by GX Commerce Team**

_Beyond Limits. Beyond Ordinary._

</div>
