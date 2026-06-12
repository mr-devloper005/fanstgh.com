import Link from 'next/link'
import { ArrowRight, BadgeCheck, CheckCircle2, Heart, MapPin, MousePointerClick, PhoneCall, Search, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function getCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function getLocation(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw = (typeof content.city === 'string' && content.city) || (typeof content.location === 'string' && content.location) || ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > 36 ? '' : clean
}

// Deterministic 4.0–5.0 pseudo-rating so cards look alive without fake backend data.
function ratingFor(post: SitePost) {
  const seed = (post.slug || post.title || '').split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return 4 + (seed % 11) / 10
}

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((step) => (
        <Star key={step} className={`h-3.5 w-3.5 ${step <= Math.round(value) ? 'fill-[var(--slot4-star)] text-[var(--slot4-star)]' : 'fill-[#e3e0ee] text-[#e3e0ee]'}`} />
      ))}
      <span className="ml-1.5 text-xs font-black text-[var(--slot4-muted-text)]">{value.toFixed(1)}</span>
    </span>
  )
}

function TrendingCard({ post, href }: { post: SitePost; href: string; index?: number }) {
  const category = getCategory(post)
  const location = getLocation(post)
  return (
    <Link href={href} className="group block w-[270px] shrink-0 snap-start">
      <article className="overflow-hidden rounded-[1.4rem] border border-black/[0.06] bg-white shadow-[0_14px_40px_rgba(27,21,48,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(27,21,48,0.14)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[var(--slot4-accent)] shadow-sm transition group-hover:bg-[var(--slot4-accent)] group-hover:text-white">
            <Heart className="h-4 w-4" />
          </span>
          {category ? <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-accent)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-sm">{category}</span> : null}
        </div>
        <div className="p-5">
          <Stars value={ratingFor(post)} />
          <h3 className="mt-2.5 line-clamp-2 text-lg font-black leading-snug tracking-[-0.03em] text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-soft-muted-text)]">{getExcerpt(post, 90)}</p>
          <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-4 text-xs font-bold">
            <span className="inline-flex min-w-0 items-center gap-1.5 text-[var(--slot4-muted-text)]"><MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--slot4-accent)]" /> <span className="truncate">{location || 'View profile'}</span></span>
            <span className="inline-flex shrink-0 items-center gap-1 text-[var(--slot4-green)]"><CheckCircle2 className="h-3.5 w-3.5" /> Open Now</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

function FeatureTile({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const style = index % 3
  if (style === 0) {
    return (
      <Link href={href} className="group relative min-h-[340px] overflow-hidden rounded-[1.6rem] bg-[#241b3f] text-white shadow-[0_20px_60px_rgba(27,21,48,0.18)] transition duration-300 hover:-translate-y-1">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,15,80,0.10),rgba(24,10,56,0.88))]" />
        <div className="relative z-10 flex min-h-[340px] flex-col justify-end p-6">
          <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#c4b5fd]">Featured listing</p>
          <h3 className="mt-3 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.04em]">{post.title}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/75">{getExcerpt(post, 100)}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/85">View listing <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
        </div>
      </Link>
    )
  }
  if (style === 1) {
    return (
      <Link href={href} className={`group flex flex-col overflow-hidden rounded-[1.6rem] border ${pal.border} bg-white shadow-[0_14px_44px_rgba(27,21,48,0.08)] transition duration-300 hover:-translate-y-1`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <Stars value={ratingFor(post)} />
          <h3 className="mt-3 line-clamp-2 text-xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getExcerpt(post, 120)}</p>
          <span className={`mt-auto inline-flex items-center gap-2 pt-4 text-xs font-black uppercase tracking-[0.16em] ${pal.accentText}`}>View listing <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
        </div>
      </Link>
    )
  }
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-[1.6rem] border ${pal.border} bg-[var(--slot4-accent-soft)] p-6 shadow-[0_14px_44px_rgba(27,21,48,0.06)] transition duration-300 hover:-translate-y-1`}>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/60" />
      <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-sm">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      </div>
      <p className={`mt-6 text-[11px] font-black uppercase tracking-[0.26em] ${pal.accentText}`}>Top rated</p>
      <h3 className="mt-3 line-clamp-3 text-xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
      <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getExcerpt(post, 110)}</p>
      <span className="relative mt-4 inline-flex"><Stars value={ratingFor(post)} /></span>
    </Link>
  )
}

function WideStoryCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const location = getLocation(post)
  return (
    <Link href={href} className={`group grid gap-4 overflow-hidden rounded-[1.4rem] border ${pal.border} bg-white p-3 shadow-[0_10px_34px_rgba(27,21,48,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(27,21,48,0.12)] sm:grid-cols-[140px_minmax(0,1fr)]`}>
      <div className="relative aspect-[5/4] overflow-hidden rounded-[1.05rem] bg-[var(--slot4-media-bg)] sm:aspect-square">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-[var(--slot4-accent)] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">#{index + 1}</span>
      </div>
      <div className="min-w-0 py-2 pr-2">
        <Stars value={ratingFor(post)} />
        <h3 className="mt-2 line-clamp-2 text-lg font-black leading-tight tracking-[-0.03em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className={`mt-2 line-clamp-2 text-sm leading-6 ${pal.mutedText}`}>{getExcerpt(post, 110)}</p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--slot4-muted-text)]"><MapPin className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {location || 'See full details'}</p>
      </div>
    </Link>
  )
}

function IndexPill({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-[1.3rem] border ${pal.border} bg-white p-5 shadow-[0_8px_28px_rgba(27,21,48,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(27,21,48,0.12)]`}>
      <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[var(--slot4-accent-soft)] opacity-80 transition group-hover:scale-125" />
      <p className={`relative text-[11px] font-black uppercase tracking-[0.24em] ${pal.accentText}`}>No. {String(index + 1).padStart(2, '0')}</p>
      <h3 className="relative mt-3 line-clamp-3 text-lg font-black leading-tight tracking-[-0.03em] text-[var(--slot4-page-text)]">{post.title}</h3>
      <p className={`relative mt-3 line-clamp-3 text-sm leading-6 ${pal.mutedText}`}>{getExcerpt(post, 100)}</p>
      <span className="relative mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent)]">
        View <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
      </span>
    </Link>
  )
}

function Rail({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`${dc.layout.rail} ${className}`}>{children}</div>
}

export function EditableHomeHero({ posts }: HomeSectionProps) {
  const heroTitle = pagesContent.home.hero.title
  const collage = posts.slice(0, 8)
  const chipCategories = Array.from(new Set(posts.map((post) => getCategory(post)).filter(Boolean))).slice(0, 6)
  return (
    <section className="relative overflow-hidden bg-[#1c1038] text-white">
      {/* Photo-collage backdrop with a deep violet overlay, like the bizMap hero */}
      <div className="absolute inset-0 grid grid-cols-2 gap-1 opacity-100 sm:grid-cols-4">
        {(collage.length ? collage : Array.from({ length: 8 }).map(() => null)).map((post, index) => (
          <div key={post ? `${post.slug}-${index}` : index} className="relative min-h-[120px] overflow-hidden bg-[#2c1d52]">
            {post ? <img src={getEditablePostImage(post)} alt="" className="absolute inset-0 h-full w-full object-cover" /> : null}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,16,73,0.82)_0%,rgba(28,13,62,0.86)_55%,rgba(22,10,50,0.94)_100%)]" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:py-28">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-white/85 backdrop-blur">
          <BadgeCheck className="h-4 w-4 text-[#c4b5fd]" /> {pagesContent.home.hero.badge}
        </p>
        <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          <span className="block">{heroTitle[0]}</span>
          <span className="block text-[#c4b5fd]">{heroTitle[1]}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{pagesContent.home.hero.description}</p>

        <form action="/search" className="mt-9 flex w-full max-w-2xl flex-col gap-2 rounded-[1.4rem] bg-white p-2 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:flex-row sm:rounded-full">
          <label className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3">
            <Search className="h-5 w-5 shrink-0 text-[#6d28d9]" />
            <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#1b1530] outline-none placeholder:text-[#1b1530]/40" />
          </label>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#6d28d9] px-7 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#5b21b6]">
            <Search className="h-4 w-4" /> Search
          </button>
        </form>

        {chipCategories.length ? (
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            {chipCategories.map((category) => (
              <Link key={category} href={`/listings?category=${encodeURIComponent(category)}`} className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white/85 backdrop-blur transition hover:bg-white hover:text-[#1b1530]">
                {category}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-bold text-white/70">
          <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#22c55e]" /> Verified listings</span>
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#c4b5fd]" /> Local discovery</span>
          <span className="inline-flex items-center gap-2"><PhoneCall className="h-4 w-4 text-[#c4b5fd]" /> Direct contact</span>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 12)
  if (!railPosts.length) return null
  return (
    <section className="relative bg-white">
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={dc.type.sectionTitle}>Top trending businesses</h2>
          <p className={`mt-3 text-base leading-7 ${pal.mutedText}`}>Discover the businesses people are viewing, saving, and contacting right now across the directory.</p>
        </div>
        <Rail className="mt-10">
          {railPosts.map((post, index) => <TrendingCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </Rail>
        <div className="mt-6 text-center">
          <Link href={primaryRoute} className={dc.button.primary}>See all listings <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = posts.slice(0, 6)
  if (!featured.length) return null
  return (
    <section className="relative overflow-hidden bg-[var(--slot4-gray)]">
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={dc.type.sectionTitle}>Featured businesses</h2>
          <p className={`mt-3 text-base leading-7 ${pal.mutedText}`}>Hand-picked listings worth a closer look, refreshed as new businesses join the directory.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((post, index) => (
            <FeatureTile key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

const howItWorks = [
  { icon: Search, title: 'Search & discover', body: 'Look up businesses by name, category, or location and browse complete, verified profiles.' },
  { icon: MousePointerClick, title: 'Compare & choose', body: 'Check details, services, and ratings side by side to find the option that fits you best.' },
  { icon: PhoneCall, title: 'Connect directly', body: 'Call, email, or visit the website straight from the listing — no middlemen, no friction.' },
]

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const categoryPosts = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts.slice(6)
  const picks = categoryPosts.slice(0, 4)
  const indexPosts = categoryPosts.slice(4, 10)
  return (
    <>
      {/* How it works — violet band with white circular icon cards, like the reference */}
      <section className="relative overflow-hidden bg-[#5b21b6]">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#2e1065]/80 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center text-white sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">How it works?</h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-white/75">Three simple steps between you and the right local business.</p>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {howItWorks.map((step) => (
              <div key={step.title} className="flex flex-col items-center">
                <span className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-[#6d28d9] shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
                  <step.icon className="h-10 w-10" />
                </span>
                <h3 className="mt-6 text-lg font-black tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 max-w-[280px] text-sm leading-7 text-white/75">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {(picks.length || indexPosts.length) ? (
        <section className="bg-[var(--slot4-page-bg)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
            <div className="lg:sticky lg:top-28">
              <h2 className={dc.type.sectionTitle}>Every category. Every neighborhood.</h2>
              <p className={`mt-4 max-w-md text-base leading-relaxed ${pal.mutedText}`}>Find the right business faster. Browse clean categories, rich listing cards, and complete profiles with the details that help you decide.</p>
              <form action="/search" className="mt-8 flex max-w-md rounded-full border border-black/[0.08] bg-white p-1.5 shadow-sm">
                <input name="q" placeholder="Search businesses or services" className="min-w-0 flex-1 bg-transparent px-4 text-sm font-bold text-[#1b1530] outline-none placeholder:text-[#1b1530]/40" />
                <button className="inline-flex items-center gap-2 rounded-full bg-[#6d28d9] px-5 py-3 text-sm font-black text-white transition hover:bg-[#5b21b6]"><Search className="h-4 w-4" /> Search</button>
              </form>
              <div className="mt-8 grid max-w-md gap-3">
                {['Complete profiles with contact, map, and services', 'Compare options before you reach out', 'New businesses added all the time'].map((point) => (
                  <p key={point} className={`flex items-start gap-3 text-sm font-bold ${pal.mutedText}`}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#22c55e]" /> {point}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {picks.map((post, index) => <WideStoryCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
          </div>
          {indexPosts.length ? (
            <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {indexPosts.map((post, index) => <IndexPill key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="relative scroll-mt-24 overflow-hidden bg-[#17112b] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-[8%] top-[15%] h-64 w-64 rounded-full bg-[#6d28d9]/40 blur-3xl" />
        <div className="absolute bottom-[5%] right-[6%] h-72 w-72 rounded-full bg-[#a78bfa]/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#c4b5fd]">{pagesContent.home.cta.badge}</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">{pagesContent.home.cta.title}</h2>
          <p className="mt-4 text-lg leading-8 text-white/70">{pagesContent.home.cta.description}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href={pagesContent.home.cta.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[#6d28d9] px-8 py-3.5 text-sm font-black text-white shadow-[0_14px_40px_rgba(109,40,217,0.45)] transition hover:bg-[#5b21b6]">{pagesContent.home.cta.primaryCta.label} <ArrowRight className="h-4 w-4" /></Link>
            <Link href={pagesContent.home.cta.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-3.5 text-sm font-black text-white transition hover:bg-white/10">{pagesContent.home.cta.secondaryCta.label}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
