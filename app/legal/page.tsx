export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">特定商取引法に基づく表記</h1>
      <table className="w-full text-sm border-collapse">
        <tbody>
          {[
            ['販売業者', '福田煌介'],
            ['運営責任者', '福田煌介'],
            ['所在地', '東京都新宿区高田馬場'],
            ['メールアドレス', 'kosuke.0507.fukuda@gmail.com'],
            ['販売価格', '月額3,980円（税込）'],
            ['お支払い方法', 'クレジットカード（Visa / Mastercard / American Express / JCB）'],
            ['支払い時期', 'ご登録時および毎月の更新日に自動決済'],
            ['サービス提供時期', 'お支払い完了後、即時ご利用いただけます'],
            ['解約について', 'マイページよりいつでも解約可能。解約後は次回更新日まで利用できます。'],
            ['返金について', 'サービスの性質上、原則として返金はお受けしておりません。ただし、サービス障害等の場合はご相談ください。'],
            ['動作環境', 'LINE公式アカウント（Messaging API対応）が必要です'],
          ].map(([label, value], i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="border border-gray-200 px-4 py-3 font-medium text-gray-700 w-1/3 align-top">{label}</td>
              <td className="border border-gray-200 px-4 py-3 text-gray-600">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
