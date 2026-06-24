import * as line from '@line/bot-sdk'

export function getLineClient() {
  return new line.messagingApi.MessagingApiClient({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
  })
}

export function validateSignature(body: string, signature: string): boolean {
  return line.validateSignature(body, process.env.LINE_CHANNEL_SECRET!, signature)
}

export async function sendReply(replyToken: string, text: string) {
  const client = getLineClient()
  await client.replyMessage({
    replyToken,
    messages: [{ type: 'text', text }],
  })
}

export async function sendPushMessage(lineUserId: string, text: string) {
  const client = getLineClient()
  await client.pushMessage({
    to: lineUserId,
    messages: [{ type: 'text', text }],
  })
}
