'use client'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useWalletStore } from '@/store/wallet'
import { GRADUATION_THRESHOLD } from '@/lib/bonding-curve'
import { formatNumber } from '@/lib/utils'
import { Rocket, AlertTriangle, Globe, Send, MessageSquare, ChevronDown, Upload } from 'lucide-react'

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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [showSocials, setShowSocials] = useState(false)
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setForm((p) => ({ ...p, imageUrl: url }))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setForm((p) => ({ ...p, imageUrl: url }))
  }

  const validate = (): boolean => {
    const errs: Partial<FormData> = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.symbol.trim()) errs.symbol = 'Required'
    else if (form.symbol.length < 2 || form.symbol.length > 8) errs.symbol = '2–8 characters'
    else if (!/^[A-Z0-9]+$/.test(form.symbol.toUpperCase())) errs.symbol = 'Letters and numbers only'
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
  const displayImage = previewUrl || (form.imageUrl && form.imageUrl.startsWith('http') ? form.imageUrl : '')
    || `https://api.dicebear.com/7.x/shapes/svg?seed=${form.symbol || 'coin'}`

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 pt-[100px] pb-20 text-center">
        <div className="w-20 h-20 bg-[var(--gold)]/15 border border-[var(--brd2)] rounded-full flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
          <Rocket className="w-10 h-10 text-[var(--gold)]" />
        </div>
        <h2 className="text-3xl font-black text-[var(--tx)] mb-3">Almost there!</h2>
        <p className="text-[var(--tx-m)] mb-6 leading-relaxed">
          Contracts deploy in Phase 2. Your coin{' '}
          <span className="text-[var(--tx)] font-semibold">{form.name} ({form.symbol.toUpperCase()})</span>{' '}
          is queued and will launch as soon as the launchpad goes live.
        </p>
        <div className="bg-[var(--sf)] border border-[var(--brd)] rounded-xl p-5 text-left mb-6 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-[var(--tx-d)]">Name</span><span className="text-[var(--tx)]">{form.name}</span></div>
          <div className="flex justify-between"><span className="text-[var(--tx-d)]">Symbol</span><span className="text-[var(--tx)] font-mono">{form.symbol.toUpperCase()}</span></div>
          <div className="flex justify-between"><span className="text-[var(--tx-d)]">Supply</span><span className="text-[var(--tx)]">{formatNumber(supply, 0)}</span></div>
          <div className="flex justify-between"><span className="text-[var(--tx-d)]">Launch fee</span><span className="text-[var(--gold)]">100 SNTX (burned)</span></div>
        </div>
        <Button variant="secondary" onClick={() => setSubmitted(false)}>← Back to form</Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pt-[80px] pb-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-[var(--tx)]">Launch a Coin</h1>
        <p className="text-[var(--tx-m)] mt-1 text-sm">
          Fill the form · pay 100 SNTX · coin goes live instantly
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_240px] gap-8 items-start">
        {/* Form */}
        <div className="space-y-4">

          {/* Image upload */}
          <div>
            <p className="text-sm font-medium text-[var(--tx-m)] mb-2">Coin Image</p>
            <div
              className="relative w-full aspect-[3/1] rounded-xl border-2 border-dashed border-[var(--brd2)] bg-[var(--sf)] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--gold)] hover:bg-[var(--sf2)] transition-all group overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              ) : null}
              <div className="relative z-10 flex flex-col items-center gap-1.5 text-center px-4">
                <Upload className="w-6 h-6 text-[var(--tx-d)] group-hover:text-[var(--gold)] transition-colors" />
                <p className="text-sm text-[var(--tx-d)] group-hover:text-[var(--tx)] transition-colors">
                  {previewUrl ? 'Click to change image' : 'Drag & drop or click to upload'}
                </p>
                <p className="text-xs text-[var(--tx-d)]">PNG, JPG, GIF, SVG</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <Input
            label="Coin name *"
            placeholder="Name your coin"
            value={form.name}
            onChange={set('name')}
            error={errors.name}
          />

          <Input
            label="Token Symbol *"
            placeholder="e.g. DOGE"
            value={form.symbol}
            onChange={(e) => setForm((p) => ({ ...p, symbol: e.target.value.toUpperCase() }))}
            error={errors.symbol}
            hint="2–8 characters, uppercase only"
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--tx-m)]">
              Description <span className="text-[var(--tx-d)] font-normal">(Optional)</span>
            </label>
            <textarea
              placeholder="What's this coin about?"
              value={form.description}
              onChange={set('description')}
              rows={3}
              className="w-full bg-[var(--sf)] border border-[var(--brd)] rounded-xl px-3 py-2.5 text-sm text-[var(--tx)] placeholder:text-[var(--tx-d)] focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/20 resize-none transition-colors"
            />
            {!form.description && (
              <p className="flex items-center gap-1 text-xs text-orange-400">
                <AlertTriangle className="w-3 h-3" /> No description = warning label on your coin
              </p>
            )}
          </div>

          {/* Social links — collapsed */}
          <div className="border border-[var(--brd)] rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowSocials((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm text-[var(--tx-m)] hover:text-[var(--tx)] hover:bg-[var(--sf2)] transition-colors"
            >
              <span>Social Links <span className="text-[var(--tx-d)]">(Optional)</span></span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showSocials ? 'rotate-180' : ''}`} />
            </button>
            {showSocials && (
              <div className="px-4 pb-4 space-y-3 border-t border-[var(--brd)] pt-3">
                <Input placeholder="https://yourproject.com" value={form.website} onChange={set('website')} prefix={<Globe className="w-3.5 h-3.5" />} hint="Website" />
                <Input placeholder="https://twitter.com/yourproject" value={form.twitter} onChange={set('twitter')} prefix={<span className="text-xs font-bold">𝕏</span>} hint="Twitter / X" />
                <Input placeholder="https://t.me/yourproject" value={form.telegram} onChange={set('telegram')} prefix={<Send className="w-3.5 h-3.5" />} hint="Telegram" />
                <Input placeholder="https://discord.gg/yourproject" value={form.discord} onChange={set('discord')} prefix={<MessageSquare className="w-3.5 h-3.5" />} hint="Discord" />
              </div>
            )}
          </div>

          {/* Launch button */}
          <Button variant="gold" size="lg" className="w-full mt-2" onClick={handleSubmit}>
            <Rocket className="w-4 h-4" />
            {!isConnected ? 'Connect Wallet to Launch' : `Launch ${form.symbol || 'Coin'} — Pay 100 SNTX`}
          </Button>

          {!isConnected && (
            <p className="text-xs text-center text-[var(--tx-d)]">MetaMask · Sentrix Chain ID 7119</p>
          )}
        </div>

        {/* Preview sidebar */}
        <div className="space-y-4 md:sticky md:top-[80px]">
          {/* Coin preview card */}
          <div className="bg-[var(--sf)] border border-[var(--brd)] rounded-xl overflow-hidden">
            <div className="aspect-square w-full bg-[var(--sf2)]">
              <img
                src={displayImage}
                alt="preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${form.symbol || 'coin'}`
                }}
              />
            </div>
            <div className="p-3">
              <p className="font-bold text-[var(--tx)] truncate">{form.name || 'Coin Name'}</p>
              <p className="text-[var(--tx-d)] font-mono text-xs">{form.symbol || 'SYM'}</p>
              <div className="mt-2 pt-2 border-t border-[var(--brd)] space-y-1 text-xs">
                <div className="flex justify-between text-[var(--tx-d)]">
                  <span>Launch fee</span>
                  <span className="text-[var(--gold)] font-bold">{REQUIRED_SNTX} SNTX</span>
                </div>
                <div className="flex justify-between text-[var(--tx-d)]">
                  <span>Graduates at</span>
                  <span className="text-[var(--tx)]">{formatNumber(GRADUATION_THRESHOLD)} SRX</span>
                </div>
                <div className="flex justify-between text-[var(--tx-d)]">
                  <span>Supply</span>
                  <span className="text-[var(--tx)]">{formatNumber(supply, 0)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Warning if no description */}
          {!form.description && (
            <div className="flex items-start gap-2 p-3 bg-orange-500/8 border border-orange-500/20 rounded-xl text-xs text-orange-400">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              Add a description to avoid the ⚠️ warning label
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
