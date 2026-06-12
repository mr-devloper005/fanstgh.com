import type { CSSProperties } from 'react'

export const editableRootStyle = {
  // bizMap-inspired directory palette: clean white surfaces, violet primary,
  // deep-indigo hero/footer, green "open now" cues, amber rating stars.
  '--slot4-page-bg': '#f7f7fb',
  '--slot4-page-text': '#1b1530',
  '--slot4-panel-bg': '#f3effc',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#5d5775',
  '--slot4-soft-muted-text': '#7a7490',
  '--slot4-accent': '#6d28d9',
  '--slot4-accent-fill': '#6d28d9',
  '--slot4-accent-soft': '#ede9fe',
  '--slot4-dark-bg': '#15102a',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#e9e6f3',
  '--slot4-cream': '#f6f3fd',
  '--slot4-warm': '#ffffff',
  '--slot4-lavender': '#ede9fe',
  '--slot4-gray': '#f4f4f8',
  '--slot4-green': '#22c55e',
  '--slot4-star': '#f59e0b',
  '--slot4-body-gradient': 'linear-gradient(180deg, #ffffff 0%, #f7f7fb 45%, #f4f4f8 100%)',
  // Shared layout + chrome tokens consumed across every editable page (navbar, footer,
  // archives, detail pages, auth, search, create). Defining them globally keeps page
  // widths "normal" instead of stretching edge-to-edge, and keeps borders/colors aligned
  // with the home palette so the whole site feels like one product.
  '--editable-container': '1200px',
  '--editable-border': 'rgba(27,21,48,0.08)',
  '--editable-page-bg': '#f7f7fb',
  '--editable-page-text': '#1b1530',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-black/[0.06]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_12px_40px_rgba(0,0,0,0.08)]',
  shadowStrong: 'shadow-[0_18px_70px_rgba(0,0,0,0.14)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.62))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[140px] shrink-0 snap-start sm:w-[160px]',
  },
  type: {
    eyebrow: 'text-xs font-extrabold uppercase tracking-[0.18em]',
    heroTitle: 'text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]',
    sectionTitle: 'text-3xl font-extrabold tracking-tight sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-2xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-full ${editablePalette.accentBg} px-8 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(109,40,217,0.30)] transition hover:opacity-90`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border ${editablePalette.border} ${editablePalette.surfaceBg} px-8 py-3.5 text-sm font-bold ${editablePalette.surfaceText} transition hover:bg-black/[0.03]`,
    accent: `inline-flex items-center justify-center gap-2 rounded-full ${editablePalette.darkBg} px-8 py-3.5 text-sm font-bold text-white transition hover:opacity-90`,
  },
  media: {
    frame: `relative overflow-hidden rounded-xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(0,0,0,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing, like the MysteryCoder reference layout.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
