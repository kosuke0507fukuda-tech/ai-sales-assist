import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendPushMessage } from '@/lib/line'

export async function POST(req: NextRequest) {
  const { messageId } = await req.json()

  const { data: message, error } = await supabaseAdmin
    .from('messages')
    .select('*')
    .eq('id', messageId)
    .single()

  if (error || !message) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 })
  }

  await sendPushMessage(message.line_user_id, message.reply_draft)

  await supabaseAdmin
    .from('messages')
    .update({ status: 'sent' })
    .eq('id', messageId)

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const { messageId } = await req.json()

  await supabaseAdmin
    .from('messages')
    .update({ status: 'rejected' })
    .eq('id', messageId)

  return NextResponse.json({ ok: true })
}
