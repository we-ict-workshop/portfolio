import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  FileText,
  Github,
  Link2,
  Quote,
  Calendar,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Research-area accent map. Each area gets a fixed color + label so the
// left-edge "spine" and the tag pill always mean the same thing across the
// list — like a color-coded shelf of journals.
// ---------------------------------------------------------------------------
const AREA_STYLES = {
  "Machine Learning": {
    spine: "bg-[#2E5EFF]",
    tag: "bg-[#2E5EFF]/10 text-[#2E5EFF]",
    ring: "focus-visible:ring-[#2E5EFF]",
  },
  Systems: {
    spine: "bg-[#14D8B4]",
    tag: "bg-[#14D8B4]/10 text-[#0FAF91]",
    ring: "focus-visible:ring-[#14D8B4]",
  },
  Theory: {
    spine: "bg-[#FF5C8A]",
    tag: "bg-[#FF5C8A]/10 text-[#E14374]",
    ring: "focus-visible:ring-[#FF5C8A]",
  },
};

// ---------------------------------------------------------------------------
// Sample data — swap this array for your real publication list.
// ---------------------------------------------------------------------------
const PUBLICATIONS = [
  {
    id: "pub-1",
    year: 2025,
    area: "Machine Learning",
    title: "Curriculum-Aware Contrastive Pretraining for Low-Resource NLP",
    authors: "A. Rahman, S. Chen, M. Okafor",
    venue: "NeurIPS 2025",
    abstract:
      "We introduce a curriculum scheduling method for contrastive pretraining that adapts sample difficulty over training steps, improving downstream accuracy by 4.2% on five low-resource language benchmarks while reducing pretraining compute by 18%.",
    links: { pdf: "#", code: "#", doi: "#" },
  },
  {
    id: "pub-2",
    year: 2024,
    area: "Systems",
    title: "ElasticShard: Dynamic Repartitioning for Serverless OLTP",
    authors: "A. Rahman, T. Iverson",
    venue: "OSDI 2024",
    abstract:
      "ElasticShard automatically repartitions transactional workloads across serverless compute units in response to skew, cutting p99 latency by 37% under bursty traffic compared to static sharding baselines, with no manual tuning.",
    links: { pdf: "#", code: "#", doi: "#" },
  },
  {
    id: "pub-3",
    year: 2024,
    area: "Theory",
    title: "Tight Bounds on Streaming Approximation for Submodular Cover",
    authors: "A. Rahman, D. Petrov",
    venue: "STOC 2024",
    abstract:
      "We prove matching upper and lower bounds for single-pass streaming algorithms solving the submodular set cover problem, closing a gap left open since 2016 and giving an optimal (1 - 1/e)-approximation under sublinear memory.",
    links: { pdf: "#", doi: "#" },
  },
  {
    id: "pub-4",
    year: 2023,
    area: "Machine Learning",
    title: "Robustness Under Distribution Shift via Test-Time Calibration",
    authors: "A. Rahman, L. Fernandez, S. Chen",
    venue: "ICML 2023",
    abstract:
      "A lightweight test-time calibration layer that adapts model confidence estimates under covariate shift, improving expected calibration error by 31% on OOD image classification without any access to target labels.",
    links: { pdf: "#", code: "#" },
  },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

function LinkPill({ href, icon: Icon, label }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-[#1E2233] shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
    >
      <Icon size={13} strokeWidth={2.25} />
      {label}
    </motion.a>
  );
}

function PublicationCard({ pub }) {
  const [open, setOpen] = useState(false);
  const styles = AREA_STYLES[pub.area] ?? AREA_STYLES["Machine Learning"];

  return (
    <motion.li
      variants={itemVariants}
      whileHover={{ scale: 1.012, y: -3 }}
      transition={{ type: "spring", stiffness: 340, damping: 24 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(30,34,51,0.04)]"
    >
      {/* color-coded spine */}
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-1.5 ${styles.spine}`}
      />

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex w-full items-start justify-between gap-4 rounded-2xl px-6 py-5 pl-8 text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.ring}`}
      >
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${styles.tag}`}
            >
              {pub.area}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
              <Calendar size={12} />
              {pub.year}
            </span>
            <span className="text-[11px] font-medium text-slate-400">
              {pub.venue}
            </span>
          </div>

          <h3 className="text-[17px] font-semibold leading-snug text-[#1E2233] [font-family:'Space_Grotesk',sans-serif]">
            {pub.title}
          </h3>
          <p className="mt-1 text-sm text-[#4B5268]">{pub.authors}</p>
        </div>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-1 shrink-0 rounded-full bg-slate-100 p-1.5 text-slate-500"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 px-6 py-5 pl-8">
              <p className="flex gap-2 text-sm leading-relaxed text-[#4B5268]">
                <Quote
                  size={15}
                  className="mt-0.5 shrink-0 text-slate-300"
                  strokeWidth={2}
                />
                {pub.abstract}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {pub.links.pdf && (
                  <LinkPill href={pub.links.pdf} icon={FileText} label="PDF" />
                )}
                {pub.links.code && (
                  <LinkPill href={pub.links.code} icon={Github} label="Code" />
                )}
                {pub.links.doi && (
                  <LinkPill href={pub.links.doi} icon={Link2} label="DOI" />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default function PublicationsList() {
  return (
    <section className="mx-auto w-full max-w-3xl bg-[#FAFAFD] px-4 py-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Selected Work
        </span>
        <h2 className="mt-2 text-3xl font-bold text-[#1E2233] [font-family:'Space_Grotesk',sans-serif]">
          Publications
        </h2>
        <p className="mt-2 text-sm text-[#4B5268]">
          Click any entry to expand the abstract and links.
        </p>
      </motion.div>

      <motion.ul
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="flex flex-col gap-4"
      >
        {PUBLICATIONS.map((pub) => (
          <PublicationCard key={pub.id} pub={pub} />
        ))}
      </motion.ul>
    </section>
  );
}
