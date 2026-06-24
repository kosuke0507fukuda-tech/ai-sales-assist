import { NextRequest, NextResponse } from 'next/server'
import { generateReply } from '@/lib/claude'
import { supabaseAdmin } from '@/lib/supabase'
import * as crypto from 'crypto'
import { messagingApi } from '@line/bot-sdk'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-line-signature') || ''

  const events = JSON.parse(body).events

  for (const event of events) {
    if (event.type !== 'message' || event.message.type !== 'text') continue

    const lineUserId = event.source.userId
    const userMessage = event.message.text
    const replyToken = event.replyToken

    // subscribed=trueのプロフィールを全取得
    const { data: profiles } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('subscribed', true)

    // シグネチャ検証でどのユーザーのwebhookか特定
    let profile = null
    if (profiles) {
      for (const p of profiles) {
        const secret = p.line_channel_secret || process.env.LINE_CHANNEL_SECRET
        const hash = crypto.createHmac('sha256', secret).update(body).digest('base64')
        if (hash === signature) {
          profile = p
          break
        }
      }
    }

    // フォールバック：環境変数のシークレットで検証
    if (!profile) {
      const hash = crypto.createHmac('sha256', process.env.LINE_CHANNEL_SECRET!).update(body).digest('base64')
      if (hash !== signature) continue
      if (profiles && profiles.length > 0) profile = profiles[0]
    }

    if (!profile) continue

    const accessToken = profile.line_channel_access_token || process.env.LINE_CHANNEL_ACCESS_TOKEN
    const lineClient = new messagingApi.MessagingApiClient({ channelAccessToken: accessToken })

    // LINE表示名を取得
    let displayName = 'お客様'
    try {
      const userProfile = await lineClient.getProfile(lineUserId)
      displayName = userProfile.displayName || 'お客様'
    } catch {}

    // Claude APIで返信文を生成
    const replyText = await generateReply(
      userMessage,
      displayName,
      profile.business_description || '',
      profile.product_url || ''
    )

    if (profile.mode === 'auto') {
      await lineClient.replyMessage({
        replyToken,
        messages: [{ type: 'text', text: replyText }],
      })
      await supabaseAdmin.from('messages').insert({
        user_id: profile.id,
        line_user_id: lineUserId,
        line_display_name: displayName,
        original_message: userMessage,
        reply_draft: replyText,
        status: 'sent',
      })
    } else {
      await supabaseAdmin.from('messages').insert({
        user_id: profile.id,
        line_user_id: lineUserId,
        line_display_name: displayName,
        original_message: userMessage,
        reply_draft: replyText,
        status: 'pending',
      })
    }
  }

  return NextResponse.json({ ok: true })
}
