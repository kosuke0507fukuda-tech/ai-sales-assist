export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">プライバシーポリシー</h1>
      <p className="text-sm text-gray-400 mb-8">最終更新日：2026年6月24日</p>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="font-bold text-gray-800 mb-2">1. 取得する情報</h2>
          <p>当サービスでは、以下の情報を取得します。</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>メールアドレス（アカウント登録時）</li>
            <li>LINE公式アカウントのChannel Access TokenおよびChannel Secret</li>
            <li>お客様のLINEユーザーから受信したメッセージ内容</li>
            <li>決済情報（Stripeを通じて処理、カード情報は当サービスでは保持しません）</li>
            <li>サービス利用に関するログ情報</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 mb-2">2. 情報の利用目的</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>AIによる返信文の生成</li>
            <li>サービスの提供・運営・改善</li>
            <li>お問い合わせへの対応</li>
            <li>利用料金の請求</li>
            <li>不正利用の防止</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 mb-2">3. 第三者への提供</h2>
          <p>当サービスは、以下のサービスを利用しています。各サービスのプライバシーポリシーに従いデータが処理されます。</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Anthropic（Claude API）- メッセージ生成</li>
            <li>Supabase - データベース</li>
            <li>Stripe - 決済処理</li>
            <li>Vercel - サーバー基盤</li>
          </ul>
          <p className="mt-2">法令に基づく場合を除き、第三者にお客様の情報を販売・提供することはありません。</p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 mb-2">4. データの保管</h2>
          <p>取得したデータはSupabase（米国）のサーバーに暗号化して保管されます。アカウント削除のご要望をいただいた場合、速やかにデータを消去します。</p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 mb-2">5. Cookieの利用</h2>
          <p>当サービスでは、ログイン状態の維持のためにCookie（セッション情報）を利用しています。ブラウザの設定でCookieを無効にすることもできますが、その場合、一部機能が正常に動作しない場合があります。</p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 mb-2">6. 個人情報の開示・訂正・削除</h2>
          <p>ご本人から個人情報の開示・訂正・削除・利用停止のご請求があった場合、本人確認のうえ、合理的な期間内に対応いたします。下記お問い合わせ先までご連絡ください。</p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 mb-2">7. プライバシーポリシーの変更</h2>
          <p>本ポリシーの内容は、法令の改正やサービス変更に応じて予告なく変更することがあります。変更後のポリシーは本ページに掲載します。</p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 mb-2">8. お問い合わせ</h2>
          <p>個人情報の取り扱いに関するお問い合わせ・開示請求は以下までご連絡ください。</p>
          <p className="mt-1">運営者：福田煌介</p>
          <p className="mt-1">メール：kosuke.0507.fukuda@gmail.com</p>
        </section>
      </div>
    </div>
  )
}
