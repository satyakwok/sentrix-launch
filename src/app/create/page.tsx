'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useWalletStore } from '@/store/wallet'
import { BASE_PRICE, K, GRADUATION_THRESHOLD } from '@/lib/bonding-curve'
import { formatNumber } from '@/lib/utils'
import { Rocket, Info, CheckCircle, AlertTriangle, Flame, Globe, Send, MessageSquare } from 'lucide-react'

const REQUIRED_SNTX = 100

interface FormData {
  name: string
  symbol: string
  description: string
  imageUrl: string
  totalSupply: string
  website: string
  twitter: string
  telegram: string
  discord: string
}

export default function CreatePage() {
  const { isConnected, connect } = useWalletStore()
  const [form, setForm] = useState<FormData>({
    name: '',
    symbol: '',
    description: '',
    imageUrl: '',
    totalSupply: '1000000000',
    website: '',
    twitter: '',
    telegram: '',
    discord: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }))

  const validate = (): boolean => {
    const errs: Partial<FormData> = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.symbol.trim()) errs.symbol = 'Required'
    else if (form.symbol.length < 2 || form.symbol.length > 8) errs.symbol = '2–8 characters'
    else if (!/^[A-Z0-9]+$/.test(form.symbol.toUpperCase())) errs.symbol = 'Letters and numbers only'
    if (!form.description.trim()) errs.description = 'Required (helps prevent warning label)'
    const supply = parseInt(form.totalSupply)
    if (!supply || supply < 1_000 || supply > 1_000_000_000_000)
      errs.totalSupply = 'Between 1,000 and 1,000,000,000,000'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (!isConnected) { connect(); return }
    if (!validate()) return
    setSubmitted(true)
  }

  const supply = parseInt(form.totalSupply) || 1_000_000_000

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-[100px] pb-20 text-center">
        <div className="w-20 h-20 bg-[var(--gold)]/15 border border-[var(--brd2)] rounded-full flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
          <Rocket className="w-10 h-10 text-[var(--gold)]" />
        </div>
        <h2 className="text-3xl font-black text-[var(--tx)] mb-3">Almost there!</h2>
        <p className="text-[var(--tx-m)] mb-6 leading-relaxed">
          Sentrix Launch contracts are deploying in Phase 2 of Sentrix Chain.
          Your token <span className="text-[var(--tx)] font-semibold">{form.name} ({form.symbol.toUpperCase()})</span> is queued
          and will launch as soon as the launchpad goes live.
        </p>
        <div className="bg-[var(--sf)] border border-[var(--brd)] rounded-xl p-5 text-left mb-6">
          <p className="text-xs text-[var(--tx-d)] mb-3">Your token details (saved)</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-[var(--tx-d)]">Name</span><span className="text-[var(--tx)]">{form.name}</span></div>
            <div className="flex justify-between"><span className="text-[var(--tx-d)]">Symbol</span><span className="text-[var(--tx)] font-mono">{form.symbol.toUpperCase()}</span></div>
            <div className="flex justify-between"><span className="text-[var(--tx-d)]">Supply</span><span className="text-[var(--tx)]">{formatNumber(supply, 0)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--tx-d)]">Launch fee</span><span className="text-[var(--gold)]">100 SNTX (burned)</span></div>
          </div>
        </div>
        <Button variant="secondary" onClick={() => setSubmitted(false)}>← Back to form</Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pt-[80px] pb-10">
      <div className="mb-8">
        <Badge variant="gold" className="mb-3">Create Token</Badge>
        <h1 className="text-3xl font-black text-[var(--tx)]">Launch Your Token</h1>
        <p className="text-[var(--tx-m)] mt-1">
          Fill the form below. Pay 100 SNTX. Your token goes live instantly on the bonding curve.
        </p>
      </div>

      {/* Fee notice */}
      <div className="flex items-start gap-3 bg-[var(--gold)]/8 border border-[var(--brd2)] rounded-xl p-4 mb-8">
        <Flame className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
        <div>
          <p className="text-[var(--gold)] font-semibold text-sm">Launch Fee: 100 SNTX</p>
          <p className="text-[var(--tx-m)] text-xs mt-0.5">
            100 SNTX is burned permanently on every launch. No refunds. This ensures only serious projects launch.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_280px] gap-8">
        {/* Form */}
        <div className="space-y-5">
          <Input
            label="Coin name *"
            placeholder="Name your coin"
            value={form.name}
            onChange={set('name')}
            error={errors.name}
            hint="Full name of your token"
          />

          <Input
            label="Token Symbol *"
            placeholder="e.g. DOGE"
            value={form.symbol}
            onChange={(e) => setForm((p) => ({ ...p, symbol: e.target.value.toUpperCase() }))}
            error={errors.symbol}
            hint="2–8 characters, uppercase letters and numbers only"
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--tx-m)]">
              Description <span className="text-[var(--tx-d)] font-normal">(Optional)</span>
            </label>
            <textarea
              placeholder="What is your token about? What problem does it solve? (Recommended: at least 100 characters)"
              value={form.description}
              onChange={set('description')}
              rows={4}
              className="w-full bg-[var(--sf)] border border-[var(--brd)] rounded-xl px-3 py-2.5 text-sm text-[var(--tx)] placeholder:text-[var(--tx-d)] focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/20 resize-none transition-colors"
            />
            {errors.description
              ? <p className="text-xs text-red-400">{errors.description}</p>
              : <p className="text-xs text-[var(--tx-d)]">Tokens without descriptions get an automatic ⚠️ warning label</p>
            }
          </div>

          {/* Social links */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[var(--tx-m)]">
              Social Links <span className="text-[var(--tx-d)] font-normal">(Optional)</span>
            </p>
            <Input
              placeholder="https://yourproject.com"
              value={form.website}
              onChange={set('website')}
              prefix={<Globe className="w-3.5 h-3.5" />}
              hint="Website"
            />
            <Input
              placeholder="https://twitter.com/yourproject"
              value={form.twitter}
              onChange={set('twitter')}
              prefix={<span className="text-xs font-bold">𝕏</span>}
              hint="Twitter / X"
            />
            <Input
              placeholder="https://t.me/yourproject"
              value={form.telegram}
              onChange={set('telegram')}
              prefix={<Send className="w-3.5 h-3.5" />}
              hint="Telegram"
            />
            <Input
              placeholder="https://discord.gg/yourproject"
              value={form.discord}
              onChange={set('discord')}
              prefix={<MessageSquare className="w-3.5 h-3.5" />}
              hint="Discord"
            />
          </div>

          <Input
            label="Image URL"
            placeholder="https://your-server.com/logo.png"
            value={form.imageUrl}
            onChange={set('imageUrl')}
            hint="PNG or SVG recommended. Ratio 1:1 (square). Leave blank to use auto-generated avatar."
          />

          <Input
            label="Total Supply *"
            type="number"
            placeholder="1000000000"
            value={form.totalSupply}
            onChange={set('totalSupply')}
            error={errors.totalSupply}
            hint="Max 1 trillion tokens. Cannot be changed after launch."
            suffix="tokens"
          />

          {/* Anti-rug info */}
          <div className="flex items-start gap-3 bg-[var(--gold)]/5 border border-[var(--brd)] rounded-xl p-4">
            <Info className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" />
            <div className="text-xs text-[var(--tx-m)] space-y-1">
              <p className="text-[var(--gold)] font-semibold text-sm">Anti-Rug Lock Period</p>
              <p>As the creator, you cannot sell your initial allocation for 30 days after launch.</p>
              <p>This protects buyers and builds trust in your project.</p>
            </div>
          </div>

          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={handleSubmit}
          >
            <Rocket className="w-4 h-4" />
            {!isConnected ? 'Connect Wallet to Launch' : `Launch ${form.symbol || 'Token'} — Pay 100 SNTX`}
          </Button>

          {!isConnected && (
            <p className="text-xs text-center text-[var(--tx-d)]">
              Connect your wallet (MetaMask with Sentrix Chain ID 7119) to launch
            </p>
          )}
        </div>

        {/* Preview sidebar */}
        <div className="space-y-4">
          <div className="bg-[var(--sf)] border border-[var(--brd)] rounded-xl p-4">
            <p className="text-xs text-[var(--tx-d)] mb-3 font-medium uppercase tracking-wide">Token Preview</p>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={form.imageUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${form.symbol || 'token'}`}
                alt=""
                className="w-12 h-12 rounded-lg bg-[var(--sf2)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${form.symbol || 'token'}`
                }}
              />
              <div>
                <p className="font-bold text-[var(--tx)]">{form.name || 'Token Name'}</p>
                <p className="text-[var(--tx-d)] font-mono text-xs">{form.symbol || 'SYM'}</p>
              </div>
            </div>
            {form.description ? (
              <p className="text-xs text-[var(--tx-m)] line-clamp-3 leading-relaxed">{form.description}</p>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-orange-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                No description — warning label will show
              </div>
            )}
          </div>

          {/* Economics */}
          <div className="bg-[var(--sf)] border border-[var(--brd)] rounded-xl p-4 space-y-3 text-xs">
            <p className="font-semibold text-[var(--tx)] text-sm">Token Economics</p>
            <div className="flex justify-between text-[var(--tx-d)]">
              <span>Starting price</span>
              <span className="text-[var(--tx)]">{BASE_PRICE} SRX</span>
            </div>
            <div className="flex justify-between text-[var(--tx-d)]">
              <span>Max price (sold out)</span>
              <span className="text-[var(--tx)]">{(BASE_PRICE * (1 + K)).toFixed(4)} SRX</span>
            </div>
            <div className="flex justify-between text-[var(--tx-d)]">
              <span>Total supply</span>
              <span className="text-[var(--tx)]">{formatNumber(supply, 0)}</span>
            </div>
            <div className="flex justify-between text-[var(--tx-d)]">
              <span>Graduation at</span>
              <span className="text-[var(--gold)]">{formatNumber(GRADUATION_THRESHOLD)} SRX mcap</span>
            </div>
            <div className="border-t border-[var(--brd)] pt-2 flex justify-between">
              <span className="text-[var(--tx-d)]">You pay</span>
              <span className="text-[var(--gold)] font-bold">{REQUIRED_SNTX} SNTX</span>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-[var(--sf)] border border-[var(--brd)] rounded-xl p-4 space-y-2 text-xs">
            <p className="font-semibold text-[var(--tx)] text-sm mb-3">Launch Checklist</p>
            {[
              { done: !!form.name, label: 'Token name' },
              { done: form.symbol.length >= 2 && form.symbol.length <= 8, label: 'Valid symbol (2–8 chars)' },
              { done: form.description.length >= 50, label: 'Description (50+ chars)' },
              { done: !!form.imageUrl, label: 'Logo image (optional)' },
              { done: parseInt(form.totalSupply) >= 1000, label: 'Valid supply' },
              { done: isConnected, label: 'Wallet connected' },
            ].map((item) => (
              <div key={item.label} className={`flex items-center gap-2 ${item.done ? 'text-emerald-400' : 'text-[var(--tx-d)]'}`}>
                <CheckCircle className={`w-3.5 h-3.5 ${item.done ? 'text-emerald-400' : 'text-[var(--sf2)]'}`} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
