import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl text-blue-600">AI Sales Assist</div>
        <div className="flex gap-4 items-center">
          <Link href="/auth" className="text-sm text-gray-600 hover:text-gray-900">ログイン</Link>
          <Link href="/auth" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            無料で始める
          </Link>
        </div>
      </header>

      {/* ヒーロー */}
      <section className="text-center px-6 py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
          LINE公式アカウントの返信を自動化
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          LINEの問い合わせ対応、<br />
          <span className="text-blue-600">AIに任せませんか？</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
          あなたのビジネス情報を登録するだけ。お客様からのメッセージにClaudeが自動で返信します。
        </p>
        <Link href="/auth" className="inline-block bg-blue-600 text-white text-lg px-8 py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200">
          無料で試す →
        </Link>
        <p className="text-sm text-gray-400 mt-4">いつでも解約可能</p>
      </section>

      {/* 課題 */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">こんなお悩みありませんか？</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { emoji: '😩', text: 'LINEの返信に毎日時間を取られている' },
            { emoji: '😰', text: '返信が遅れてお客様を逃してしまう' },
            { emoji: '🤯', text: '同じ質問に何度も答えるのが面倒' },
          ].map((item, i) => (
            <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">{item.emoji}</div>
              <p className="text-gray-700 font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 解決策 */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">AI Sales Assistが解決します</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'ビジネス情報を登録', desc: 'あなたのサービス内容・よくある質問を入力するだけ' },
              { step: '2', title: 'LINEと連携', desc: 'LINE DevelopersのトークンをコピペするだけでOK' },
              { step: '3', title: 'AIが自動返信', desc: 'お客様のメッセージにClaudeが24時間自動で返信' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 機能 */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">主な機能</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: '🤖', title: 'フルオート返信', desc: 'メッセージ受信後、数秒以内にClaudeが自動返信。24時間365日対応。' },
            { icon: '✅', title: 'セミオート（承認制）', desc: 'AIが下書きを作成。確認してから送信できるので安心。' },
            { icon: '🎯', title: 'ビジネスに合わせた返信', desc: 'あなたのサービス内容を学習。的確な返信文を生成します。' },
            { icon: '📊', title: '管理画面', desc: 'すべての会話履歴を一覧で確認。対応状況を把握できます。' },
          ].map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-6">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 料金 */}
      <section className="bg-blue-50 px-6 py-16">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">シンプルな料金体系</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl font-bold text-blue-600 mb-2">¥3,980</div>
            <div className="text-gray-500 mb-6">/ 月（税込）</div>
            <ul className="text-left space-y-3 mb-8">
              {[
                'LINE自動返信 無制限',
                'フルオート・セミオート切替',
                'メッセージ管理画面',
                'いつでも解約可能',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500 font-bold">✓</span>{item}
                </li>
              ))}
            </ul>
            <Link href="/auth" className="block w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
              今すぐ始める
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">LINEの返信業務から解放されよう</h2>
        <p className="text-gray-500 mb-8">設定5分。あとはAIにおまかせ。</p>
        <Link href="/auth" className="inline-block bg-blue-600 text-white text-lg px-8 py-4 rounded-xl hover:bg-blue-700 transition">
          無料で始める →
        </Link>
      </section>

      {/* フッター */}
      <footer className="border-t border-gray-100 px-6 py-8 text-center text-sm text-gray-400">
        <p>© 2026 AI Sales Assist</p>
      </footer>
    </div>
  )
}
