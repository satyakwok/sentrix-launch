import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { TokenCard } from '@/components/token/TokenCard'
import { Badge } from '@/components/ui/Badge'
import { DotGrid, GradientBlur } from '@/components/ui/GridBg'
import { MOCK_TOKENS, PLATFORM_STATS } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { Rocket, TrendingUp, Shield, ChevronRight, Flame, Zap } from 'lucide-react'

const FEATURED = MOCK_TOKENS.filter((t) => !t.isWarned).slice(0, 3)

export default function HomePage() {
  return (
    <div className="pt-[60px] pb-20">

      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 text-center">
        <DotGrid />
        <GradientBlur />
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--gold)]/10 border border-[var(--brd2)] rounded-full text-sm text-[var(--gold)] mb-4">
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full animate-pulse" />
            Live on Sentrix Chain — Chain ID 7119
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[var(--tx)] tracking-tight leading-none animate-fade-up">
            Launch your token
            <br />
            <span className="shimmer-text">in 2 minutes.</span>
          </h1>

          <p className="text-lg text-[var(--tx-m)] max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
            No coding. No pre-sale. No VC allocation.{' '}
            <span className="text-[var(--tx)]">Fair for everyone</span> via bonding curve.
            Pay 100 SNTX → token goes live instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/create">
              <Button variant="gold" size="lg">
                <Rocket className="w-4 h-4" />
                Launch a Token
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="secondary" size="lg">
                <TrendingUp className="w-4 h-4" />
                Explore Tokens
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {[
              { label: 'Tokens Launched', value: PLATFORM_STATS.totalTokens.toString(), icon: '🪙' },
              { label: 'Total Volume', value: `${formatNumber(PLATFORM_STATS.totalVolumeSRX)} SRX`, icon: '📊' },
              { label: 'SNTX Burned', value: `${formatNumber(PLATFORM_STATS.totalSNTXBurned)}`, icon: '🔥' },
              { label: 'Active Traders', value: PLATFORM_STATS.activeTraders.toString(), icon: '👥' },
            ].map((s) => (
              <div key={s.label} className="bg-[var(--sf)] border border-[var(--brd)] rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-black text-[var(--tx)]">{s.value}</div>
                <div className="text-xs text-[var(--tx-d)] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-24">

        {/* How it works */}
        <section>
          <div className="text-center mb-12">
            <Badge variant="gold" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl font-black text-[var(--tx)]">Simple. Fair. Transparent.</h2>
            <p className="text-[var(--tx-m)] mt-3 max-w-xl mx-auto">
              Every token starts equal. Early buyers get lower prices, but anyone can join anytime.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: '01', icon: <Zap className="w-6 h-6 text-[var(--gold)]" />,
                title: 'Fill the form',
                desc: 'Name, symbol, description, and total supply. No code needed. Takes 60 seconds.',
              },
              {
                step: '02', icon: <Flame className="w-6 h-6 text-[var(--gold)]" />,
                title: 'Pay 100 SNTX',
                desc: '100 SNTX is permanently burned. No pre-sale, no VCs, no unfair allocation.',
              },
              {
                step: '03', icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
                title: 'Go live instantly',
                desc: 'Your token is tradeable immediately. Hit 69K SRX market cap → auto-listed on DEX.',
              },
            ].map((item) => (
              <div key={item.step} className="relative bg-[var(--sf)] border border-[var(--brd)] hover:border-[var(--brd2)] rounded-2xl p-6 transition-colors duration-200">
                <div className="text-5xl font-black text-[var(--brd2)] absolute top-4 right-5 select-none">{item.step}</div>
                <div className="w-12 h-12 bg-[var(--sf2)] rounded-xl flex items-center justify-center mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-[var(--tx)] mb-2">{item.title}</h3>
                <p className="text-[var(--tx-m)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bonding curve explainer */}
        <section className="bg-[var(--sf)] border border-[var(--brd)] rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge variant="gold" className="mb-4">Bonding Curve</Badge>
              <h2 className="text-3xl font-black text-[var(--tx)] mb-4">
                Price rises as tokens sell.
                <br />
                <span className="text-[var(--gold)]">Automatically.</span>
              </h2>
              <p className="text-[var(--tx-m)] mb-6 leading-relaxed">
                Fully on-chain, fully transparent. Early buyers get lower prices.
                No sudden dumps — the curve makes rug pulls economically costly.
              </p>
              <div className="bg-[var(--bk)] rounded-xl p-4 font-mono text-sm border border-[var(--brd)]">
                <p className="text-[var(--tx-d)] text-xs mb-2">{'// On-chain price formula'}</p>
                <p className="text-[var(--tx-m)]">Price = <span className="text-[var(--gold)]">0.0001</span> × (1 + <span className="text-emerald-400">0.5</span> × sold/supply)</p>
              </div>
            </div>
            <div className="space-y-1">
              {[
                { label: 'Launch fee', value: '100 SNTX', detail: '→ 100% burned', color: 'text-[var(--gold)]' },
                { label: 'Trading fee', value: '1%', detail: '50% burn + 50% Ecosystem Fund', color: 'text-[var(--gold-l)]' },
                { label: 'Graduation threshold', value: '69,000 SRX', detail: 'market cap → auto DEX listing', color: 'text-emerald-400' },
                { label: 'Anti-rug', value: 'Lock period', detail: "creator can't sell for X days", color: 'text-red-400' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-3 border-b border-[var(--brd)]">
                  <span className="text-[var(--tx-m)] text-sm">{row.label}</span>
                  <div className="text-right">
                    <span className={`font-bold text-sm ${row.color}`}>{row.value}</span>
                    <span className="text-[var(--tx-d)] text-xs block">{row.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured tokens */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge variant="green" className="mb-2">Trending Now</Badge>
              <h2 className="text-2xl font-black text-[var(--tx)]">Hot Tokens</h2>
            </div>
            <Link href="/explore" className="flex items-center gap-1 text-sm text-[var(--gold)] hover:text-[var(--gold-l)] transition-colors">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED.map((token) => (
              <TokenCard key={token.address} token={token} />
            ))}
          </div>
        </section>

        {/* Features grid */}
        <section>
          <div className="text-center mb-12">
            <Badge variant="gold" className="mb-4">Why Sentrix Launch</Badge>
            <h2 className="text-3xl font-black text-[var(--tx)]">Built different.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Shield className="w-5 h-5 text-[var(--gold)]" />, title: 'Anti-Rug', desc: 'Creator lock period prevents instant dumps after launch.' },
              { icon: <Flame className="w-5 h-5 text-[var(--gold)]" />, title: 'Deflationary', desc: '100 SNTX burned per launch + 0.5% of every trade burned.' },
              { icon: <Zap className="w-5 h-5 text-emerald-400" />, title: 'Instant', desc: 'Pay fee → token live. No approval. No waiting.' },
              { icon: <TrendingUp className="w-5 h-5 text-[var(--gold-l)]" />, title: 'Auto-DEX', desc: 'Hit 69K SRX market cap → automatically listed on DEX.' },
            ].map((f) => (
              <div key={f.title} className="bg-[var(--sf)] border border-[var(--brd)] hover:border-[var(--brd2)] rounded-xl p-5 transition-colors duration-200">
                <div className="w-10 h-10 bg-[var(--sf2)] rounded-lg flex items-center justify-center mb-3">{f.icon}</div>
                <h3 className="font-bold text-[var(--tx)] mb-1">{f.title}</h3>
                <p className="text-sm text-[var(--tx-m)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="text-center py-16 border border-[var(--brd)] rounded-2xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(200,168,74,0.05), rgba(168,85,247,0.05))' }}
        >
          <DotGrid />
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-[var(--tx)] mb-4">Ready to launch?</h2>
            <p className="text-[var(--tx-m)] mb-8 max-w-md mx-auto">
              All you need is 100 SNTX and an idea. Your token lives on Sentrix Chain forever.
            </p>
            <Link href="/create">
              <Button variant="gold" size="lg">
                <Rocket className="w-4 h-4" />
                Launch Your Token Now
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
