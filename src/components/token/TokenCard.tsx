import Link from 'next/link'
import type { Token } from '@/types'
import { Progress } from '@/components/ui/Progress'
import { formatNumber } from '@/lib/utils'
import { ShieldCheck, AlertTriangle, TrendingUp } from 'lucide-react'

interface TokenCardProps {
  token: Token
}

export function TokenCard({ token }: TokenCardProps) {
  return (
    <Link
      href={`/token/${token.address}`}
      className="block group bg-[var(--sf)] border border-[var(--brd)] hover:border-[var(--brd2)] rounded-xl overflow-hidden transition-all duration-200 hover:shadow-[0_0_20px_rgba(200,168,74,0.08)]"
    >
      {/* Square image */}
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--sf2)]">
        <img
          src={token.imageUrl}
          alt={token.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badges top-right */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {token.isVerified && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] text-[var(--gold)] border border-[var(--brd2)]">
              <ShieldCheck className="w-2.5 h-2.5" /> Verified
            </span>
          )}
          {token.isWarned && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] text-orange-400 border border-orange-500/30">
              <AlertTriangle className="w-2.5 h-2.5" /> Warning
            </span>
          )}
          {token.isGraduated && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] text-emerald-400 border border-emerald-500/30">
              <TrendingUp className="w-2.5 h-2.5" /> DEX
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <div className="flex items-baseline justify-between gap-2 min-w-0">
          <span className="font-semibold text-[var(--tx)] text-sm truncate group-hover:text-[var(--gold)] transition-colors">
            {token.name}
          </span>
          <span className="text-[var(--tx-d)] font-mono text-xs shrink-0">{token.symbol}</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--tx-d)]">Market cap</span>
          <span className="text-[var(--tx)] font-semibold">{formatNumber(token.marketCap)} SRX</span>
        </div>

        {!token.isGraduated ? (
          <div className="space-y-1">
            <Progress value={token.progress} color="gold" />
            <p className="text-[10px] text-[var(--tx-d)] text-right">{token.progress.toFixed(1)}%</p>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[10px] text-emerald-400">Listed on DEX</span>
          </div>
        )}
      </div>
    </Link>
  )
}
