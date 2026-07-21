# Portfolio — Shaikh Prothomaa Binte Minhaz

A single-page academic portfolio: bright white canvas, electric blue / neon cyan / sunset pink
gradient accents, deep-slate text, an animated node-graph hero (a nod to protein-structure /
graph research), and scroll-triggered staggered reveals throughout.

## Files

```
portfolio/
├── index.html
├── css/style.css
├── js/main.js
└── assets/images/        ← put your photos here (see below)
```

## 1. Add your photos

The site works with **no photos** — every image spot gracefully falls back to a gradient
placeholder if the file is missing. Drop in real photos with these exact filenames and it'll
pick them up automatically, no code changes needed:

| File | Where it's used | Suggested size |
|---|---|---|
| `assets/images/hero-bg.jpg` | Hero background (behind the animated graph) | 1920×1080, landscape, you at work / whiteboard / lab / campus |
| `assets/images/portrait.jpg` | About section | 800×1000 (portrait orientation) |
| `assets/images/project-student-performance.jpg` | Project card | 800×500 (16:10) |
| `assets/images/project-bangla-parsing.jpg` | Project card | 800×500 |
| `assets/images/project-ct-mri.jpg` | Project card | 800×500 |
| `assets/images/project-prime-game.jpg` | Project card | 800×500 |
| `assets/images/project-blind-stick.jpg` | Project card | 800×500 |
| `assets/images/project-graphics.jpg` | Project card | 800×500 |

Tips:
- Compress images first (e.g. [squoosh.app](https://squoosh.app)) so the site stays fast — aim
  for under ~300 KB each.
- The hero photo sits behind a dark gradient overlay so it stays readable — brighter, higher
  contrast photos work best there.
- If a project doesn't have a real screenshot, a relevant stock-style or diagram image works
  fine — or just leave it out and the gradient placeholder will show instead.

## 2. Personalize the placeholder links

Open `index.html` and search for `href="#"` — these mark the three spots that need your real
profile links (currently placeholders since your CV didn't include the URLs):

- LinkedIn (in the nav... actually in the footer `.footer-links`)
- Google Scholar
- GitHub

Your email is already wired up as a `mailto:` link using the address from your CV.

## 3. Preview locally

Just open `index.html` in a browser — no build step, no dependencies to install. For a closer-
to-production preview (some browsers restrict local file access), run a tiny local server from
inside the `portfolio` folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 4. Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `your-username.github.io` for a root-domain site, or any
   name for a project site).
2. Push the contents of this `portfolio` folder to the repo root:

   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch → Branch: `main` / `root`** → Save.
4. Your site goes live at `https://<your-username>.github.io/<repo-name>/` (or
   `https://<your-username>.github.io/` if you used the special repo name) within a minute or two.

## Customizing the palette

All colors are CSS custom properties at the top of `css/style.css`:

```css
--blue: #2f5bff;
--cyan: #00d9e8;
--pink: #ff3d8a;
--orange: #ff7a45;
```

Change any of these and the gradients, hover states, and accent colors update everywhere
automatically.

## Notes on the build

- No frameworks or build tools — plain HTML/CSS/JS, ready to serve as static files.
- Fonts (Space Grotesk / Inter / JetBrains Mono) load from Google Fonts via `<link>` tags in
  `index.html` — no local font files needed.
- The hero's animated network of nodes and connecting lines is drawn on a `<canvas>` in
  `js/main.js` (`heroGraph` function) — it respects `prefers-reduced-motion` and pauses/repaints
  automatically on resize.
- All scroll-reveal animations use `IntersectionObserver`, so there's no per-frame scroll-handler
  cost beyond the progress bar and nav background swap.
- Fully responsive down to small mobile widths, with a slide-in nav on narrow screens.
