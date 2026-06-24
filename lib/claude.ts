import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function generateReply(
  userMessage: string,
  senderName: string,
  businessDescription: string,
  productUrl: string
): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `あなたは以下のビジネスオーナーに代わって、LINEで顧客に返信するAIアシスタントです。

【ビジネス概要】
${businessDescription}

【商品・サービスのURL】
${productUrl}

【顧客情報】
名前: ${senderName}

【顧客からのメッセージ】
${userMessage}

上記の顧客に対して、以下のルールで返信文を作成してください：
- 温かみがあり、親しみやすいトーン
- 顧客の悩みや質問に具体的に寄り添う
- 自然な流れで商品・サービスに誘導する
- 押し売り感がなく、あくまで「お役に立てる」というスタンス
- 200文字以内で簡潔に
- 返信文のみを出力し、前置きや説明は不要`,
      },
    ],
  })

  return message.content[0].type === 'text' ? message.content[0].text : ''
}
