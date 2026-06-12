import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const stats = [
  { value: 'One place', label: 'to discover trusted local businesses' },
  { value: 'Minutes', label: 'to publish a complete listing' },
  { value: 'Direct', label: 'call, email & website actions' },
]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--editable-page-bg,#f7f7fb)] px-4 py-14 text-[var(--editable-page-text,#1b1530)] sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2.5rem] border border-[var(--editable-border)] bg-white/80 p-8 shadow-sm lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#6d28d9]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.06em] sm:text-5xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 opacity-70">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 text-base leading-8 opacity-75">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[1.5rem] border border-[var(--editable-border)] bg-[#ede9fe] p-5">
                  <p className="text-2xl font-black tracking-[-0.04em] text-[#6d28d9]">{stat.value}</p>
                  <p className="mt-2 text-sm font-bold leading-6 opacity-70">{stat.label}</p>
                </div>
              ))}
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="rounded-[2rem] border border-[var(--editable-border)] bg-white/70 p-6 shadow-sm">
                <h2 className="text-xl font-black tracking-[-0.04em]">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 opacity-70">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>

        <section className="mx-auto mt-10 max-w-[var(--editable-container)]">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2.5rem] bg-[#1b1530] p-8 text-white shadow-[0_24px_70px_rgba(0,0,0,0.16)] sm:flex-row sm:items-center lg:p-12">
            <div>
              <h2 className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">Ready to get your business discovered?</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">Join {SITE_CONFIG.name} and let nearby customers find, compare, and contact you.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-[#6d28d9] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#5b21b6]">List your business <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/listing" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/10">Browse the directory</Link>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
