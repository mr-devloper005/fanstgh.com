'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight, Globe2, Mail, MapPin, Send } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  // Dark bizMap-style footer: deep indigo panel, violet accents, light text.
  const footerVars = { '--editable-footer-bg': '#14101f', '--editable-footer-text': '#f5f3fa' } as CSSProperties
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer style={footerVars} className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.25fr_0.85fr_0.9fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
            </span>
            <span className="text-xl font-black tracking-[-0.04em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/60">{globalContent.footer?.description || SITE_CONFIG.description}</p>
          <form action="/contact" className="mt-6 flex max-w-md overflow-hidden rounded-full border border-white/12 bg-white/[0.06] p-1.5">
            <input name="subject" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-white outline-none placeholder:text-white/40" />
            <button className="inline-flex items-center gap-2 rounded-full bg-[#6d28d9] px-5 py-2.5 text-sm font-black text-white transition hover:bg-[#5b21b6]">
              <Send className="h-3.5 w-3.5" /> Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] text-white/45">Directory</h3>
            <div className="mt-5 grid gap-3">
              {taskLinks.map((task) => (
                <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-bold text-white/70 transition hover:text-white">
                  {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
              <Link href="/search" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 transition hover:text-white">Search <ArrowUpRight className="h-3.5 w-3.5" /></Link>
              <Link href="/create" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 transition hover:text-white">Add Listing <ArrowUpRight className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
          <div>
           
          </div>
        </div>

        <div>
          
          <div className="mt-0 ">
             <h3 className="text-xs font-black uppercase tracking-[0.22em] text-white/45">Site</h3>
            <div className="mt-5 grid gap-3">
              {[
                ['About', '/about'],
                ['Contact', '/contact'],
                ...(session ? [] : [['Login', '/login'], ['Sign up', '/signup']]),
              ].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm font-bold text-white/70 transition hover:text-white">{label}</Link>
              ))}
              {session ? <button type="button" onClick={logout} className="text-left text-sm font-bold text-white/70 transition hover:text-white">Logout</button> : null}
            </div>
          </div>
          
        </div>
      </div>
      <div className="border-t border-white/[0.08] px-4 py-5 text-center text-xs font-bold text-white/45">
        © {year} {SITE_CONFIG.name}. All rights reserved. · {globalContent.footer?.bottomNote}
      </div>
    </footer>
  )
}
