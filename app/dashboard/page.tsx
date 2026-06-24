'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Message = {
  id: string
  line_display_name: string
  original_message: string
  reply_draft: string
  status: string
  created_at: string
}

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
    // リアルタイム更新
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, () => {
        fetchMessages()
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  async function fetchMessages() {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
    setMessages(data || [])
    setLoading(false)
  }

  async function approve(messageId: string) {
    await fetch('/api/messages/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageId }),
    })
  }

  async function reject(messageId: string) {
    await fetch('/api/messages/approve', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageId }),
    })
  }

  const pending = messages.filter(m => m.status === 'pending')
  const done = messages.filter(m => m.status !== 'pending')

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">AI セールスアシスト 管理画面</h1>

      {/* 承認待ち */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3 text-orange-600">
          承認待ち {pending.length > 0 && <span className="bg-orange-500 text-white rounded-full px-2 py-0.5 text-sm ml-2">{pending.length}</span>}
        </h2>
        {loading ? (
          <p className="text-gray-500">読み込み中...</p>
        ) : pending.length === 0 ? (
          <p className="text-gray-400 bg-white rounded-lg p-4">承認待ちのメッセージはありません</p>
        ) : (
          <div className="space-y-4">
            {pending.map(m => (
              <div key={m.id} className="bg-white rounded-xl shadow-sm border border-orange-100 p-5">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-medium text-gray-700">{m.line_display_name}</span>
                  <span className="text-xs text-gray-400">{new Date(m.created_at).toLocaleString('ja-JP')}</span>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">受信メッセージ</p>
                  <p className="text-gray-700 bg-gray-50 rounded p-3 text-sm">{m.original_message}</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">AI生成返信（下書き）</p>
                  <p className="text-gray-800 bg-blue-50 rounded p-3 text-sm border border-blue-100">{m.reply_draft}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => approve(m.id)}
                    className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition"
                  >
                    ✅ 承認して送信
                  </button>
                  <button
                    onClick={() => reject(m.id)}
                    className="flex-1 bg-gray-100 text-gray-600 rounded-lg py-2 text-sm font-medium hover:bg-gray-200 transition"
                  >
                    ✗ 却下
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 送信済み */}
      <section>
        <h2 className="text-lg font-semibold mb-3 text-gray-500">送信済み・却下</h2>
        <div className="space-y-3">
          {done.map(m => (
            <div key={m.id} className="bg-white rounded-lg border border-gray-100 p-4 opacity-70">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">{m.line_display_name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${m.status === 'sent' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {m.status === 'sent' ? '送信済み' : '却下'}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 truncate">{m.original_message}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
