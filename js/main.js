/* =========================================================
   NAV: scrolled state + mobile toggle + active link
   ========================================================= */
const nav = document.getElementById('siteNav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const scrollBar = document.getElementById('scrollBar');

function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 40);

  // scroll progress
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (y / docHeight) * 100 : 0;
  scrollBar.style.width = progress + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* Active link highlight based on section in view */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('[data-nav]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => navObserver.observe(s));

/* =========================================================
   SCROLL-TRIGGERED REVEAL (staggered)
   ========================================================= */
const revealEls = document.querySelectorAll('[data-reveal]');

const groups = new Map();
revealEls.forEach(el => {
  const parent = el.closest('section') || document.body;
  if (!groups.has(parent)) groups.set(parent, []);
  groups.get(parent).push(el);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const siblings = groups.get(el.closest('section') || document.body) || [el];
      const index = siblings.indexOf(el);
      el.style.transitionDelay = `${Math.min(index, 8) * 70}ms`;
      el.classList.add('in-view');
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* =========================================================
   HERO NODE-GRAPH CANVAS
   A subtle animated network graph — nodes + connecting edges —
   echoing the site owner's research into graph & protein
   structure representations.
   ========================================================= */
(function heroGraph() {
  const canvas = document.getElementById('graphCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hero = canvas.closest('.hero');

  let w, h, dpr;
  let nodes = [];

  const COLORS = ['#00d9e8', '#2f5bff', '#ff3d8a'];
  const MAX_DIST = 150;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(24, Math.min(70, Math.floor((w * h) / 22000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 1.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }));
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function step() {
    ctx.clearRect(0, 0, w, h);

    // update
    if (!reduceMotion) {
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });
    }

    // edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.strokeStyle = `rgba(120, 190, 255, ${0.16 * (1 - dist / MAX_DIST)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.fillStyle = n.color;
      ctx.globalAlpha = 0.85;
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    requestAnimationFrame(step);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(step);
})();

/* Add active-link style hook (nav-links a.active) purely via class;
   visual styling for .active can be extended in CSS if desired. */
const style = document.createElement('style');
style.textContent = `.nav-links a[data-nav].active { color: var(--ink); } .nav-links a[data-nav].active::after { width: 100%; }`;
document.head.appendChild(style);
