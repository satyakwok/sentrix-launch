'use client'
import { useState, useMemo } from 'react'
import { TokenCard } from '@/components/token/TokenCard'
import { Badge } from '@/components/ui/Badge'
import { MOCK_TOKENS } from '@/lib/mock-data'
import type { Token } from '@/types'
import { Search } from 'lucide-react'

type Filter = 'all' | 'new' | 'trending' | 'graduating' | 'graduated'
type SortKey = 'marketCap' | 'volume' | 'new' | 'progress'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'new', label: '🆕 New' },
  { key: 'trending', label: '🔥 Trending' },
  { key: 'graduating', label: '🎓 Graduating' },
  { key: 'graduated', label: '✅ Graduated' },
]

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'marketCap', label: 'Market Cap' },
  { key: 'volume', label: '24h Volume' },
  { key: 'new', label: 'Newest' },
  { key: 'progress', label: 'Near Graduation' },
]

export default function ExplorePage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [sort, setSort] = useState<SortKey>('marketCap')
  const [search, setSearch] = useState('')

  const tokens = useMemo(() => {
    let list: Token[] = [...MOCK_TOKENS]

    if (filter === 'new') list = list.filter((t) => Date.now() / 1000 - t.createdAt < 86400)
    if (filter === 'trending') list = list.sort((a, b) => b.volume24h - a.volume24h).slice(0, 10)
    if (filter === 'graduating') list = list.filter((t) => !t.isGraduated && t.progress >= 50)
    if (filter === 'graduated') list = list.filter((t) => t.isGraduated)

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.symbol.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      )
    }

    if (sort === 'marketCap') list = [...list].sort((a, b) => b.marketCap - a.marketCap)
    if (sort === 'volume') list = [...list].sort((a, b) => b.volume24h - a.volume24h)
    if (sort === 'new') list = [...list].sort((a, b) => b.createdAt - a.createdAt)
    if (sort === 'progress') list = [...list].sort((a, b) => b.progress - a.progress)

    return list
  }, [filter, sort, search])

  return (
    <div className="max-w-7xl mx-auto px-4 pt-[80px] pb-10">
      {/* Header */}
      <div className="mb-8">
        <Badge variant="gold" className="mb-3">Explore</Badge>
        <h1 className="text-3xl font-black text-[var(--tx)]">All Tokens</h1>
        <p className="text-[var(--tx-m)] mt-1">Discover tokens launched on Sentrix Launch</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--tx-d)]" />
          <input
            type="text"
            placeholder="Search tokens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[var(--sf)] border border-[var(--brd)] rounded-xl pl-9 pr-4 py-2.5 text-sm text-[var(--tx)] placeholder:text-[var(--tx-d)] focus:outline-none focus:border-[var(--gold)]"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="bg-[var(--sf)] border border-[var(--brd)] rounded-xl px-3 py-2.5 text-sm text-[var(--tx)] focus:outline-none focus:border-[var(--gold)] cursor-pointer"
        >
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === f.key
                ? 'bg-[var(--gold)] text-[var(--bk)]'
                : 'bg-[var(--sf)] border border-[var(--brd)] text-[var(--tx-d)] hover:text-[var(--tx)] hover:border-[var(--brd2)]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-[var(--tx-d)] mb-4">{tokens.length} token{tokens.length !== 1 ? 's' : ''} found</p>

      {/* Grid */}
      {tokens.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens.map((token) => (
            <TokenCard key={token.address} token={token} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-[var(--tx)] font-semibold">No tokens found</p>
          <p className="text-[var(--tx-m)] text-sm mt-1">Try a different search or filter</p>
        </div>
      )}
    </div>
  )
}
