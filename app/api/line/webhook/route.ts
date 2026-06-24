import { NextRequest, NextResponse } from 'next/server'
import { validateSignature, sendReply, sendPushMessage } from '@/lib/line'
import { generateReply } from '@/lib/claude'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-line-signature') || ''

  if (!validateSignature(body, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const events = JSON.parse(body).events

  for (const event of events) {
    if (event.type !== 'message' || event.message.type !== 'text') continue

    const lineUserId = event.source.userId
    const userMessage = event.message.text
    const replyToken = event.replyToken

    // このWebhookを受け取るオーナーのプロフィールを取得
    // （MVP: 最初の登録ユーザー1名を対象）
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('subscribed', true)
      .single()

    if (!profile) continue

    // LINE表示名を取得（任意）
    let displayName = 'お客様'
    try {
      const res = await fetch(`https://api.line.me/v2/bot/profile/${lineUserId}`, {
        headers: { Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}` },
      })
      const data = await res.json()
      displayName = data.displayName || 'お客様'
    } catch {}

    // Claude APIで返信文を生成
    const replyText = await generateReply(
      userMessage,
      displayName,
      profile.business_description || '',
      profile.product_url || ''
    )

    if (profile.mode === 'auto') {
      // フルオートモード：即座に返信
      await sendReply(replyToken, replyText)

      await supabaseAdmin.from('messages').insert({
        user_id: profile.id,
        line_user_id: lineUserId,
        line_display_name: displayName,
        original_message: userMessage,
        reply_draft: replyText,
        status: 'sent',
      })
    } else {
      // セミオートモード：下書きとして保存
      await supabaseAdmin.from('messages').insert({
        user_id: profile.id,
        line_user_id: lineUserId,
        line_display_name: displayName,
        original_message: userMessage,
        reply_draft: replyText,
        status: 'pending',
      })

      // オーナーに通知（オーナー自身のLINEに通知する場合はここに追加）
    }
  }

  return NextResponse.json({ ok: true })
}
