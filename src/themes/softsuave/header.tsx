'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { NAV, navHref, type NavItem } from './nav-data';
import { SiteLink } from './site-link';

const SITE = 'https://www.softsuave.com';
const LOGO = 'https://www.softsuave.com/new-assets/common/images/softsuave_logo.webp';

function DesktopPanel({ item }: { item: NavItem }) {
  if (item.kind === 'grid') {
    return (
      <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
        {item.items.map((l) => (
          <a key={l.label} href={navHref(l.href)} className="rounded-lg p-3 transition-colors hover:bg-[#ff0042]/5">
            <span className="ss-heading block text-sm font-bold text-neutral-900">{l.label}</span>
            {l.desc && <span className="mt-0.5 block text-xs text-neutral-500">{l.desc}</span>}
          </a>
        ))}
      </div>
    );
  }
  if (item.kind === 'groups') {
    return (
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-3 lg:grid-cols-5">
        {item.groups.map((g) => (
          <div key={g.title}>
            <p className="ss-heading mb-2 text-xs font-bold uppercase tracking-wide text-[#ff0042]">
              {g.href ? <a href={navHref(g.href)} className="hover:underline">{g.title}</a> : g.title}
            </p>
            <ul className="space-y-1.5">
              {g.links.map((l) => (
                <li key={l.label}>
                  <a href={navHref(l.href)} className="text-sm text-neutral-700 transition-colors hover:text-[#ff0042]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function SoftSuaveHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Mobile drawer: close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="relative">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-3">
          <SiteLink href="/" aria-label="Soft Suave" className="shrink-0">
            <Image src={LOGO} alt="Soft Suave" width={150} height={40} unoptimized className="h-9 w-auto" preload />
          </SiteLink>

          {/* Desktop nav */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.label} className="group">
                  {item.kind === 'link' ? (
                    <Link href={navHref(item.href)} className="ss-heading px-3 py-2 text-sm font-semibold text-neutral-800 hover:text-[#ff0042]">
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <a
                        href={navHref(item.href)}
                        className="ss-heading flex items-center gap-1 px-3 py-2 text-sm font-semibold text-neutral-800 group-hover:text-[#ff0042]"
                      >
                        {item.label}
                        <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                      </a>
                      <div className="invisible absolute left-0 top-full w-full opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                        <div className="mx-auto mt-1 max-h-[70vh] max-w-[1200px] overflow-y-auto rounded-xl border bg-white p-6 shadow-xl">
                          <DesktopPanel item={item} />
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <form onSubmit={submitSearch} role="search" className="hidden items-center gap-1 lg:flex">
              {searchOpen && (
                <input
                  autoFocus
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setSearchOpen(false);
                  }}
                  placeholder="Search blogs…"
                  aria-label="Search blogs"
                  className="w-44 rounded-full border border-neutral-300 px-3 py-1.5 text-sm outline-none focus:border-[#ff0042]"
                />
              )}
              <button
                type={searchOpen ? 'submit' : 'button'}
                aria-label="Search"
                onClick={searchOpen ? undefined : () => setSearchOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 hover:text-[#ff0042]"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
            <a href="mailto:contact@softsuave.com" className="hidden text-sm text-neutral-600 hover:text-[#ff0042] xl:inline">
              contact@softsuave.com
            </a>
            <a href={`${SITE}/contact`} className="ss-heading hidden rounded-full bg-[#ff0042] px-5 py-2 text-sm font-bold text-white hover:bg-[#d6003a] sm:inline">
              Let&apos;s Connect
            </a>
            <button className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden" aria-label="Menu" onClick={() => setOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col overflow-y-auto bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="ss-heading font-bold">Menu</span>
              <button aria-label="Close" autoFocus onClick={() => setOpen(false)} className="-mr-2 flex h-11 w-11 items-center justify-center"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={submitSearch} role="search" className="mb-4 flex gap-2">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blogs…"
                aria-label="Search blogs"
                className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[#ff0042]"
              />
              <button type="submit" aria-label="Search" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ff0042] text-white">
                <Search className="h-4 w-4" />
              </button>
            </form>
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.label} className="border-b">
                  {item.kind === 'link' ? (
                    <Link href={navHref(item.href)} className="ss-heading block py-3 font-semibold" onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        className="ss-heading flex w-full items-center justify-between py-3 font-semibold"
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${expanded === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      {expanded === item.label && (
                        <div className="pb-3 pl-3">
                          {item.kind === 'grid'
                            ? item.items.map((l) => (
                                <a key={l.label} href={navHref(l.href)} className="block py-1.5 text-sm text-neutral-700">{l.label}</a>
                              ))
                            : item.groups.map((g) => (
                                <div key={g.title} className="mb-2">
                                  <p className="ss-heading mt-2 text-xs font-bold uppercase text-[#ff0042]">{g.title}</p>
                                  {g.links.map((l) => (
                                    <a key={l.label} href={navHref(l.href)} className="block py-1 text-sm text-neutral-700">{l.label}</a>
                                  ))}
                                </div>
                              ))}
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
            <a href={`${SITE}/contact`} className="ss-heading mt-4 rounded-full bg-[#ff0042] px-5 py-3 text-center font-bold text-white">
              Let&apos;s Connect
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
