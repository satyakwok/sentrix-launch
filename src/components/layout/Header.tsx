'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { WalletConnect } from '@/components/wallet/WalletConnect'
import { useEffect, useState } from 'react'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/create', label: 'Launch' },
  { href: '/portfolio', label: 'Portfolio' },
]

export function Header() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY && y > 80)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-transform duration-300',
        hidden && '-translate-y-full'
      )}
    >
      <div
        className="border-b border-[var(--brd)]"
        style={{ background: 'rgba(12,12,16,0.85)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-7 h-7 rounded-lg bg-[var(--gold)]/15 border border-[var(--brd2)] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L12 4v6l-5 3L2 10V4l5-3z" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
                <path d="M7 4v6M4 5.5l3 1.5 3-1.5" stroke="var(--gold)" strokeWidth="1" />
              </svg>
            </div>
            <span className="font-serif text-sm tracking-[.25em] uppercase text-[var(--tx)] group-hover:text-[var(--gold)] transition-colors hidden sm:block">
              Sentrix <span className="text-[var(--gold)]">Launch</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === item.href
              const isLaunch = item.href === '/create'
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-1.5 text-[11px] font-medium tracking-[.1em] uppercase rounded-full transition-all duration-200',
                    active
                      ? 'text-[var(--gold)] bg-[var(--gold)]/10 border border-[var(--brd2)]'
                      : isLaunch
                        ? 'text-[var(--gold)] hover:bg-[var(--gold)]/10'
                        : 'text-[var(--tx-d)] hover:text-[var(--tx)] hover:bg-[var(--sf)]'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Wallet */}
          <WalletConnect />
        </div>
      </div>

      {/* Mobile bottom tabs */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 flex border-t border-[var(--brd)] z-50"
        style={{ background: 'rgba(12,12,16,0.95)', backdropFilter: 'blur(20px)' }}
      >
        {NAV.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex-1 py-3 text-center text-[10px] font-medium tracking-[.1em] uppercase transition-colors',
                active
                  ? 'text-[var(--gold)]'
                  : item.href === '/create'
                    ? 'text-[var(--gold)]/70 hover:text-[var(--gold)]'
                    : 'text-[var(--tx-d)] hover:text-[var(--tx)]'
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </header>
  )
}
