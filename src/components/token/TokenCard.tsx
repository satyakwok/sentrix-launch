import Link from 'next/link'
import type { Token } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { GlowCard } from '@/components/ui/GlowCard'
import { formatNumber, formatPrice, formatTimestamp, formatAddress } from '@/lib/utils'
import { ShieldCheck, AlertTriangle, TrendingUp } from 'lucide-react'
import { GRADUATION_THRESHOLD } from '@/lib/bonding-curve'

interface TokenCardProps {
  token: Token
}

export function TokenCard({ token }: TokenCardProps) {
  return (
    <GlowCard className="rounded-xl">
      <Link
        href={`/token/${token.address}`}
        className="block group bg-[var(--sf)] hover:bg-[var(--sf2)] border border-[var(--brd)] hover:border-[var(--brd2)] rounded-xl p-4 transition-all duration-200"
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <img
            src={token.imageUrl}
            alt={token.name}
            className="w-10 h-10 rounded-lg shrink-0 bg-[var(--sf2)]"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-[var(--tx)] text-sm group-hover:text-[var(--gold)] transition-colors truncate">
                {token.name}
              </span>
              <span className="text-xs text-[var(--tx-d)] font-mono">{token.symbol}</span>
            </div>
            <p className="text-xs text-[var(--tx-d)] mt-0.5 truncate">
              by {formatAddress(token.creator)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            {token.isVerified && (
              <Badge variant="blue"><ShieldCheck className="w-3 h-3" /> Verified</Badge>
            )}
            {token.isWarned && (
              <Badge variant="warn"><AlertTriangle className="w-3 h-3" /> Warning</Badge>
            )}
            {token.isGraduated && (
              <Badge variant="green"><TrendingUp className="w-3 h-3" /> Graduated</Badge>
            )}
          </div>
        </div>

        {/* Description */}
        {token.description && (
          <p className="text-xs text-[var(--tx-d)] line-clamp-2 mb-3 leading-relaxed">{token.description}</p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div>
            <p className="text-[var(--tx-d)]">Market Cap</p>
            <p className="text-[var(--tx)] font-semibold">{formatNumber(token.marketCap)} SRX</p>
          </div>
          <div>
            <p className="text-[var(--tx-d)]">Price</p>
            <p className="text-[var(--tx)] font-semibold">{formatPrice(token.price)}</p>
          </div>
          <div>
            <p className="text-[var(--tx-d)]">24h Vol</p>
            <p className="text-emerald-400 font-semibold">{formatNumber(token.volume24h)} SRX</p>
          </div>
          <div>
            <p className="text-[var(--tx-d)]">Created</p>
            <p className="text-[var(--tx-m)]">{formatTimestamp(token.createdAt)}</p>
          </div>
        </div>

        {/* Graduation progress */}
        {!token.isGraduated && (
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[var(--tx-d)]">Graduation progress</span>
              <span className="text-[var(--gold)] font-medium">{token.progress.toFixed(1)}%</span>
            </div>
            <Progress value={token.progress} color="gold" />
            <p className="text-xs text-[var(--tx-d)] mt-1">
              {formatNumber(GRADUATION_THRESHOLD - token.marketCap)} SRX to graduation
            </p>
          </div>
        )}

        {token.isGraduated && (
          <div className="flex items-center gap-2 pt-2 border-t border-[var(--brd)]">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-emerald-400">Listed on Sentrix DEX</span>
          </div>
        )}
      </Link>
    </GlowCard>
  )
}
