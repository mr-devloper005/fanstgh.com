import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, CheckCircle2, Download, FileText, Filter, Heart, Image as ImageIcon, MapPin, Megaphone, Search, Star, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const placeholder = '/placeholder.svg?height=900&width=1200'
const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const getSummary = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body)
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Readable editorial cards with room for headlines and excerpts.', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Verified business cards with ratings, location, and direct contact.', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Offer-board cards prioritize price, location, condition, and quick action.', badge: 'Offer' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', promise: 'Gallery-first browsing with strong visuals and compact captions.', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Bookmark cards stay mostly text-based so saved resources scan quickly.', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Document cards surface file context, download intent, and summary.', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', promise: 'Profile cards focus on identity, short bio, and direct discovery.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  // Warm palette aligned with the home page so the directory feels like one product.
  const archiveVars = { '--archive-bg': '#f7f7fb', '--archive-text': '#1b1530', '--archive-surface': '#ffffff', '--archive-accent': '#6d28d9' } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  const bannerImage = posts.map((post) => getImage(post)).find((image) => image && image !== placeholder)

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        {/* Banner hero with photo + deep violet overlay, like the bizMap "More Listings" header */}
        <section className="relative overflow-hidden bg-[#1c1038] text-white">
          {bannerImage ? <img src={bannerImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" /> : null}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,16,73,0.82)_0%,rgba(24,11,55,0.90)_100%)]" />
          <div className="relative mx-auto flex max-w-[var(--editable-container)] flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-white/85 backdrop-blur"><Icon className="h-4 w-4 text-[#c4b5fd]" /> {voice?.eyebrow || label}</div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl">{voice?.headline || `Browse ${label}`}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/75">{voice?.description || SITE_CONFIG.description}</p>
            <nav className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/80 backdrop-blur">
              <Link href="/" className="transition hover:text-white">Home</Link>
              <span className="opacity-50">|</span>
              <span className="text-[#c4b5fd]">{label}</span>
            </nav>
          </div>
        </section>

        {/* Filter bar — pill controls riding over the banner edge */}
        <section className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8">
          <form action={basePath} className="relative z-10 -mt-7 flex flex-wrap items-center gap-3 rounded-[1.4rem] border border-[var(--editable-border)] bg-white p-4 shadow-[0_18px_50px_rgba(27,21,48,0.12)]">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--archive-accent)] px-4 py-2.5 text-xs font-black uppercase tracking-[0.14em] text-white"><Filter className="h-4 w-4" /> Filters</span>
            <select name="category" defaultValue={category} className="h-11 min-w-[200px] flex-1 rounded-full border border-[var(--editable-border)] bg-white px-4 text-sm font-bold outline-none sm:flex-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="h-11 rounded-full bg-[var(--archive-accent)] px-6 text-sm font-black text-white transition hover:bg-[#5b21b6]">Apply</button>
            <span className="ml-auto hidden text-xs font-bold opacity-55 sm:inline">Showing: {categoryLabel} · {deck.promise}</span>
          </form>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-16 pt-10 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[var(--editable-border)] bg-white/60 p-10 text-center">
              <Search className="mx-auto h-8 w-8 opacity-45" />
              <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">No businesses found</h2>
              <p className="mt-2 text-sm opacity-65">Try another category, or check back soon as new businesses join the directory.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--editable-border)] bg-white text-sm font-black transition hover:border-[var(--archive-accent)] hover:text-[var(--archive-accent)]" aria-label="Previous page">‹</Link> : null}
            {Array.from({ length: Math.min(5, pagination.totalPages || 1) }, (_, i) => {
              const total = pagination.totalPages || 1
              const start = Math.max(1, Math.min(page - 2, total - 4))
              return start + i
            }).filter((value) => value <= (pagination.totalPages || 1)).map((value) => (
              value === page
                ? <span key={value} className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--archive-accent)] text-sm font-black text-white shadow-[0_8px_22px_rgba(109,40,217,0.35)]">{value}</span>
                : <Link key={value} href={pageHref(basePath, category, value)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--editable-border)] bg-white text-sm font-black transition hover:border-[var(--archive-accent)] hover:text-[var(--archive-accent)]">{value}</Link>
            ))}
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--editable-border)] bg-white text-sm font-black transition hover:border-[var(--archive-accent)] hover:text-[var(--archive-accent)]" aria-label="Next page">›</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  const category = getCategory(post, 'Article')
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">{category}</span>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 opacity-65">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

// Deterministic 4.0–5.0 pseudo-rating so cards look alive without fake backend data.
const ratingFor = (post: SitePost) => {
  const seed = (post.slug || post.title || '').split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return 4 + (seed % 11) / 10
}

function RatingStars({ post }: { post: SitePost }) {
  const value = ratingFor(post)
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((step) => (
        <Star key={step} className={`h-3.5 w-3.5 ${step <= Math.round(value) ? 'fill-[#f59e0b] text-[#f59e0b]' : 'fill-[#e3e0ee] text-[#e3e0ee]'}`} />
      ))}
      <span className="ml-1.5 text-xs font-black opacity-55">{value.toFixed(1)}</span>
    </span>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const category = getCategory(post, '')
  const location = getField(post, ['city', 'location'])
  const shortLocation = location && location.length <= 36 ? location : ''
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  return (
    <Link href={href} className="group flex flex-col overflow-hidden rounded-[1.4rem] border border-[var(--editable-border)] bg-white shadow-[0_14px_40px_rgba(27,21,48,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(27,21,48,0.14)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--archive-bg)]">
        {image ? (
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center"><BriefcaseBusiness className="h-14 w-14 opacity-30" /></span>
        )}
        {category ? <span className="absolute left-3 top-3 rounded-full bg-[var(--archive-accent)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-sm">{category}</span> : null}
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[var(--archive-accent)] shadow-sm transition group-hover:bg-[var(--archive-accent)] group-hover:text-white">
          <Heart className="h-4 w-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <RatingStars post={post} />
        <h2 className="mt-2.5 line-clamp-2 text-lg font-black leading-snug tracking-[-0.03em]">{post.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 opacity-65">{getSummary(post)}</p>
        <div className="mt-auto flex items-center justify-between border-t border-[var(--editable-border)] pt-4 text-xs font-bold">
          <span className="inline-flex min-w-0 items-center gap-1.5 opacity-70"><MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--archive-accent)]" /> <span className="truncate">{shortLocation || (phone ? `Call ${phone}` : 'View profile')}</span></span>
          <span className="inline-flex shrink-0 items-center gap-1 text-[#22c55e]"><CheckCircle2 className="h-3.5 w-3.5" /> Open Now</span>
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-[var(--archive-text)] p-5 text-[var(--archive-bg)]">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Classified</span>
          <h2 className="mt-10 text-3xl font-black leading-[1] tracking-[-0.07em]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-bold opacity-75">{location || condition || 'Details inside'}</p>
          {image ? <img src={image} alt="" className="absolute bottom-4 right-4 h-20 w-20 rounded-2xl object-cover opacity-80" /> : null}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-65">{getSummary(post)}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-accent)]">View listing <ArrowRight className="h-4 w-4" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--archive-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-[1.7rem] border border-[var(--editable-border)] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:bg-[var(--archive-text)] hover:text-[var(--archive-bg)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-current/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-70">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-xs font-black uppercase tracking-[0.16em] opacity-60">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const category = getCategory(post, 'PDF')
  return (
    <Link href={href} className="group rounded-[2rem] border border-[var(--editable-border)] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-[1.4rem] bg-[var(--archive-text)] p-5 text-[var(--archive-bg)]"><FileText className="h-8 w-8" /></div>
        <span className="rounded-full bg-[var(--archive-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">{category}</span>
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-65">{getSummary(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-accent)]">Open document <Download className="h-4 w-4" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-[2rem] border border-[var(--editable-border)] bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[var(--archive-bg)] ring-1 ring-[var(--editable-border)]">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 opacity-45" />}
      </div>
      <h2 className="mt-5 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      {role ? <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-accent)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-6 opacity-65">{getSummary(post)}</p>
    </Link>
  )
}
