# Expandable Publications List — Integration Guide

## 1. Install dependencies
```bash
npm install framer-motion lucide-react
```
(Tailwind CSS is assumed to already be configured in your Vite project.)

## 2. Add the fonts
This component uses **Space Grotesk** (headings) + **Inter** (body/UI text).
Add this to your `index.html` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

Then in your global CSS (e.g. `src/index.css`), set Inter as the base body font:
```css
body {
  font-family: "Inter", sans-serif;
}
```
(The component already references `'Space_Grotesk'` inline for headings via
Tailwind's arbitrary `[font-family:...]` syntax, so no `tailwind.config.js`
changes are strictly required — but see step 3 if you want the colors as
reusable theme tokens.)

## 3. (Optional) Promote colors to Tailwind theme tokens
The component uses arbitrary hex values directly (e.g. `bg-[#2E5EFF]`) so it
works with zero config changes. If you'd rather reuse these accents
elsewhere in your portfolio, add them to `tailwind.config.js`:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        "electric-blue": "#2E5EFF",
        "neon-teal": "#14D8B4",
        "sunset-pink": "#FF5C8A",
        ink: "#1E2233",      // deep slate for headings
        slate-body: "#4B5268", // deep slate for body text
      },
    },
  },
};
```

## 4. Drop in the component
Copy `PublicationsList.jsx` into `src/components/` and use it anywhere:

```jsx
import PublicationsList from "./components/PublicationsList";

function App() {
  return (
    <main>
      {/* ... your hero / nav ... */}
      <PublicationsList />
    </main>
  );
}

export default App;
```

## 5. Swap in your real data
Edit the `PUBLICATIONS` array at the top of the file. Each entry supports:
- `area`: `"Machine Learning" | "Systems" | "Theory"` (controls the color
  spine + tag — add more keys to `AREA_STYLES` if you have other research
  areas)
- `year`, `title`, `authors`, `venue`, `abstract`
- `links`: any of `pdf`, `code`, `doi` (omit a key to hide that pill)

## Notes on the design choices
- **Color-coded spine**: the 6px left-edge bar and the tag pill share one
  color per research area, so a reader can scan the list by field at a
  glance — this is the one "signature" visual element, kept restrained
  everywhere else.
- **Deep slate, not black**: headings use `#1E2233`, body text uses
  `#4B5268` — both pass strong contrast against the white/pastel
  background without the harshness of pure black.
- **Motion is snappy**: stagger is 0.08s per card, expand/collapse is
  ~0.3s with an ease-out curve — nothing sluggish, and `AnimatePresence`
  ensures collapse animates out smoothly instead of just disappearing.
- **Reduced motion**: if your portfolio has a global
  `prefers-reduced-motion` handler, wrap the `motion` components'
  `transition` props accordingly, or set Framer Motion's
  `MotionConfig reducedMotion="user"` at the app root — recommended for
  accessibility.
