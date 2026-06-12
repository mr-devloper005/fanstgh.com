'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, LogOut, Menu, PlusCircle, Search, UserPlus, UserRound, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  // bizMap-style chrome: white bar, dark ink, violet pill CTA.
  const navVars = { '--editable-nav-bg': '#ffffff', '--editable-nav-text': '#1b1530', '--editable-nav-active': '#6d28d9', '--editable-nav-active-text': '#ffffff', '--editable-cta-bg': '#6d28d9', '--editable-cta-text': '#ffffff', '--editable-search-bg': '#f4f4f8', '--editable-border': 'rgba(27,21,48,0.10)', '--editable-container': '1200px' } as CSSProperties
  const firstName = session?.name?.trim().split(/\s+/)[0] || session?.email?.split('@')[0] || 'Member'
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/92 text-[var(--editable-nav-text)] backdrop-blur-2xl">
      <nav className="mx-auto flex min-h-[88px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[1.4rem] border border-[var(--editable-border)] bg-white shadow-sm transition-transform group-hover:-rotate-2">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-11 w-11 object-contain" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block max-w-[180px] truncate text-sm font-black tracking-[-0.03em]">{SITE_CONFIG.name}</span>
            <span className="block max-w-[180px] truncate text-[11px] font-bold uppercase tracking-[0.18em] opacity-55">{globalContent.nav?.tagline || SITE_CONFIG.tagline}</span>
          </span>
        </Link>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center md:flex">
          <label className="relative flex w-full max-w-xl items-center rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-3 shadow-sm">
            <Search className="h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder={'Search businesses, services, categories…'} className="min-w-0 flex-1 bg-transparent px-3 text-sm font-semibold outline-none placeholder:text-current/45" />
          </label>
        </form>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.slice(0, 4).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`rounded-full px-4 py-2 text-sm font-black transition ${active ? 'bg-[var(--editable-nav-active)] text-[var(--editable-nav-active-text)]' : 'hover:bg-black/5'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <Link href="/create" className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-[0_8px_22px_rgba(109,40,217,0.35)] transition hover:bg-[#5b21b6] sm:inline-flex"><PlusCircle className="h-4 w-4" /> Add Listing</Link>
              <span className="hidden items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-3 py-2 text-sm font-black sm:inline-flex" title={session.email}>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--editable-cta-bg)] text-[11px] font-black uppercase text-[var(--editable-cta-text)]">{firstName.charAt(0)}</span>
                <span className="max-w-[120px] truncate">Hi, {firstName}</span>
              </span>
              <button type="button" onClick={logout} className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-black hover:bg-black/5 sm:inline-flex"><LogOut className="h-4 w-4" /> Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-black hover:bg-black/5 sm:inline-flex"><LogIn className="h-4 w-4" /> Login</Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-[0_8px_22px_rgba(109,40,217,0.35)] transition hover:bg-[#5b21b6] sm:inline-flex"><UserPlus className="h-4 w-4" /> Sign up</Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-[var(--editable-border)] bg-white p-2 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-2xl border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3 py-2">
            <Search className="mt-1 h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder="Search businesses, services…" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
          </form>
          {session ? (
            <div className="mb-3 flex items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-white px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--editable-cta-bg)] text-sm font-black uppercase text-[var(--editable-cta-text)]"><UserRound className="h-4 w-4" /></span>
              <span className="min-w-0">
                <span className="block text-sm font-black">Hi, {firstName}</span>
                <span className="block truncate text-xs font-bold opacity-55">{session.email}</span>
              </span>
            </div>
          ) : null}
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Add Listing', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-black">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="flex items-center gap-2 rounded-2xl border border-[var(--editable-border)] bg-white px-4 py-3 text-left text-sm font-black"><LogOut className="h-4 w-4" /> Logout</button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
