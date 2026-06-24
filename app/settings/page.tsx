'use client'

import { useEffect, useState, Suspense } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter, useSearchParams } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function SettingsContent() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [businessDescription, setBusinessDescription] = useState('')
  const [productUrl, setProductUrl] = useState('')
  const [lineToken, setLineToken] = useState('')
  const [lineSecret, setLineSecret] = useState('')
  const [mode, setMode] = useState('semi')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/auth'); return }
      setUser(data.user)
      loadProfile(data.user.id)
    })
  }, [])

  async function loadProfile(userId: string) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    if (data) {
      setProfile(data)
      setBusinessDescription(data.business_description || '')
      setProductUrl(data.product_url || '')
      setLineToken(data.line_channel_access_token || '')
      setLineSecret(data.line_channel_secret || '')
      setMode(data.mode || 'semi')
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await supabase.from('profiles').upsert({
      id: user.id,
      business_description: businessDescription,
      product_url: productUrl,
      line_channel_access_token: lineToken,
      line_channel_secret: lineSecret,
      mode,
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  async function handleSubscribe() {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, email: user.email }),
    })
    const { url } = await res.json()
    window.location.href = url
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  if (!user) return <div className="min-h-screen flex items-center justify-center">読み込み中...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">設定</h1>
        <div className="flex gap-3">
          <button onClick={() => router.push('/dashboard')} className="text-sm text-blue-600 hover:underline">管理画面</button>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:underline">ログアウト</button>
        </div>
      </div>

      {searchParams.get('success') && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-6">
          サブスクリプションが有効になりました！
        </div>
      )}

      {!profile?.subscribed && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-blue-800 mb-2">プランに加入する</h2>
          <p className="text-blue-600 text-sm mb-4">月額 ¥3,980 で LINE の自動返信が使い放題</p>
          <button onClick={handleSubscribe} className="bg-blue-600 text-white rounded-lg px-6 py-2 font-medium hover:bg-blue-700 transition">
            今すぐ始める（¥3,980/月）
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 bg-white rounded-xl shadow-sm p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ビジネスの説明</label>
          <textarea
            value={businessDescription}
            onChange={e => setBusinessDescription(e.target.value)}
            rows={4}
            placeholder="例：整体院を経営しています。肩こり・腰痛の施術を行っています。料金は60分5,000円です。"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">商品・サービスURL（任意）</label>
          <input
            type="url"
            value={productUrl}
            onChange={e => setProductUrl(e.target.value)}
            placeholder="https://your-website.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LINE Channel Access Token</label>
          <input
            type="text"
            value={lineToken}
            onChange={e => setLineToken(e.target.value)}
            placeholder="LINE Developersから取得"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LINE Channel Secret</label>
          <input
            type="text"
            value={lineSecret}
            onChange={e => setLineSecret(e.target.value)}
            placeholder="LINE Developersから取得"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">返信モード</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="auto" checked={mode === 'auto'} onChange={() => setMode('auto')} />
              <span className="text-sm">フルオート（即座に返信）</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="semi" checked={mode === 'semi'} onChange={() => setMode('semi')} />
              <span className="text-sm">セミオート（承認してから返信）</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {saving ? '保存中...' : saved ? '保存しました！' : '設定を保存'}
        </button>
      </form>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <h3 className="font-medium text-yellow-800 mb-2">Webhook URLをLINEに設定してください</h3>
        <p className="text-yellow-700 text-sm mb-2">LINE Developers → Messaging API → Webhook URL に以下を設定：</p>
        <code className="bg-yellow-100 text-yellow-900 text-xs px-3 py-2 rounded block">
          https://te-ai.vercel.app/api/line/webhook
        </code>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">読み込み中...</div>}>
      <SettingsContent />
    </Suspense>
  )
}
