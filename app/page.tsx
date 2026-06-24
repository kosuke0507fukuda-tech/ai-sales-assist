export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">AI セールスアシスト</h1>
        <p className="text-xl text-blue-200 mb-8">
          あなたのビジネスを学習したAIが<br />
          LINEの問い合わせに24時間自動返信。<br />
          寝ている間も売上を作り続けます。
        </p>
        <div className="bg-white/10 rounded-2xl p-6 mb-8 text-left space-y-3">
          <p className="flex items-center gap-3"><span className="text-2xl">🤖</span> 顧客の悩みに100%アジャストした個別返信</p>
          <p className="flex items-center gap-3"><span className="text-2xl">⚡</span> フルオート or 承認制、2つのモードを選択</p>
          <p className="flex items-center gap-3"><span className="text-2xl">💰</span> 月額9,800円〜、初月無料</p>
        </div>
        <a
          href="/dashboard"
          className="inline-block bg-white text-blue-900 font-bold py-4 px-10 rounded-full text-lg hover:bg-blue-50 transition"
        >
          管理画面へ →
        </a>
      </div>
    </main>
  )
}
