import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* ナビ */}
      <nav style={{ borderBottom: '1px solid #f0f0f0', padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', zIndex: 50 }}>
        <div style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.5px' }}>Te-AI</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/legal" style={{ fontSize: '14px', color: '#666', textDecoration: 'none' }}>特商法</Link>
          <Link href="/auth" style={{ fontSize: '14px', color: '#666', textDecoration: 'none' }}>ログイン</Link>
          <Link href="/auth" style={{ fontSize: '14px', color: '#fff', background: '#111', padding: '8px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 500 }}>
            はじめる
          </Link>
        </div>
      </nav>

      {/* ヒーロー */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* 背景画像 */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1400&q=80&auto=format&fit=crop"
            alt="ネイルサロンの施術"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.7) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto', padding: '140px 32px 120px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', fontSize: '13px', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '100px', padding: '4px 14px', marginBottom: '32px', letterSpacing: '0.02em' }}>
            ネイル・まつ毛・ハンドメイド作家さんへ
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.1, color: '#fff', marginBottom: '24px' }}>
            LINEの問い合わせ、<br />もう手で返さなくていい。
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            施術中・深夜・休日。いつ来た問い合わせにも、AIが数秒で返信します。
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth" style={{ fontSize: '15px', color: '#111', background: '#fff', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, letterSpacing: '-0.3px' }}>
              今すぐ始める →
            </Link>
            <Link href="#how" style={{ fontSize: '15px', color: '#fff', background: 'rgba(255,255,255,0.15)', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(255,255,255,0.3)' }}>
              仕組みを見る
            </Link>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '16px' }}>月額¥3,980 · いつでも解約可能</p>
        </div>
      </section>

      {/* こんな方に */}
      <section style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 32px 0' }}>
        <p style={{ fontSize: '13px', color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '24px', textAlign: 'center' }}>こんな方に使われています</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80&auto=format&fit=crop', label: 'ネイリスト' },
            { img: 'https://images.unsplash.com/photo-1595867818082-083862f3d630?w=400&q=80&auto=format&fit=crop', label: 'まつ毛・エステ' },
            { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop', label: 'ハンドメイド作家' },
          ].map((item, i) => (
            <div key={i} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', aspectRatio: '3/4' }}>
              <img src={item.img} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '14px', left: '14px', fontSize: '14px', fontWeight: 600, color: '#fff' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 数字で信頼 */}
      <section style={{ borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', padding: '40px 32px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', textAlign: 'center' }}>
          {[
            { num: '数秒', label: '返信にかかる時間' },
            { num: '24時間', label: '365日対応' },
            { num: '¥3,980', label: '月額（税込）' },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-1px', color: '#111' }}>{item.num}</div>
              <div style={{ fontSize: '13px', color: '#999', marginTop: '4px' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 課題 */}
      <section style={{ maxWidth: '720px', margin: '0 auto', padding: '100px 32px' }}>
        <p style={{ fontSize: '13px', color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>Problem</p>
        <h2 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-1px', color: '#111', marginBottom: '48px', lineHeight: 1.2 }}>
          1人で全部やるのは、<br />もう限界じゃないですか。
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { title: '施術中に返信できない', desc: '手が離せない間にメッセージが来て、気づいたら他の人に予約を取られていた。' },
            { title: '深夜の問い合わせに対応できない', desc: 'お客様は夜に調べる。翌朝返信したら「もう他で決めました」。' },
            { title: '同じ質問を毎回手打ちする', desc: '料金は？空きは？場所は？毎回同じことを一から書くのは時間の無駄。' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '24px', border: '1px solid #f0f0f0', borderRadius: '12px', background: '#fafafa' }}>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>{item.title}</div>
              <div style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 解決 */}
      <section id="how" style={{ background: '#111', color: 'white', padding: '100px 32px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p style={{ fontSize: '13px', color: '#666', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>Solution</p>
          <h2 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-1px', marginBottom: '16px', lineHeight: 1.2 }}>
            設定5分。あとはAIが全部やります。
          </h2>
          <p style={{ fontSize: '16px', color: '#aaa', marginBottom: '64px', lineHeight: 1.7 }}>
            サロン情報を登録して、LINEと繋ぐだけ。<br />
            お客様の質問にClaudeが自動で答えます。
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { step: '01', title: 'サロン情報を入力する', desc: 'メニュー・料金・営業時間・予約方法を登録。AIがこれを元に返信文を作ります。' },
              { step: '02', title: 'LINEと連携する', desc: 'LINE DevelopersのトークンをコピペするだけでOK。難しい設定は一切ありません。' },
              { step: '03', title: 'あとは何もしなくていい', desc: '問い合わせが来るたびに、AIが数秒以内に返信します。施術に集中してください。' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '13px', color: '#444', fontWeight: 600, minWidth: '32px', paddingTop: '2px', letterSpacing: '0.05em' }}>{item.step}</div>
                <div style={{ flex: 1, paddingBottom: '32px', borderBottom: i < 2 ? '1px solid #222' : 'none' }}>
                  <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{item.title}</div>
                  <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 機能 */}
      <section style={{ maxWidth: '720px', margin: '0 auto', padding: '100px 32px' }}>
        <p style={{ fontSize: '13px', color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>Features</p>
        <h2 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-1px', color: '#111', marginBottom: '48px', lineHeight: 1.2 }}>
          使いやすさにこだわりました。
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2px', border: '1px solid #f0f0f0', borderRadius: '16px', overflow: 'hidden' }}>
          {[
            { title: 'フルオート返信', desc: '問い合わせが来た瞬間、AIが自動で返信。あなたは何もしなくてOK。' },
            { title: '送信前に確認できる', desc: 'AIの下書きを確認してから送る「セミオート」モードも選べます。' },
            { title: '自然な返信文', desc: 'Anthropic社のClaude搭載。テンプレートっぽさがない、自然な文章を生成。' },
            { title: '管理画面で全確認', desc: 'お客様とのやりとりを一覧で確認。対応漏れを防ぎます。' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '32px', background: '#fafafa', borderRight: i % 2 === 0 ? '1px solid #f0f0f0' : 'none', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>{item.title}</div>
              <div style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 料金 */}
      <section style={{ background: '#fafafa', padding: '100px 32px' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>Pricing</p>
          <h2 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-1px', color: '#111', marginBottom: '48px' }}>シンプルな1プラン</h2>
          <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: '20px', padding: '48px', textAlign: 'left' }}>
            <div style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-2px', color: '#111', marginBottom: '4px' }}>¥3,980</div>
            <div style={{ fontSize: '14px', color: '#999', marginBottom: '32px' }}>/ 月（税込）</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {['LINE自動返信 無制限', 'フルオート・セミオート切替', 'メッセージ管理画面', 'いつでも解約可能'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#444' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#111"/><path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {item}
                </div>
              ))}
            </div>
            <Link href="/auth" style={{ display: 'block', textAlign: 'center', background: '#111', color: '#fff', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}>
              今すぐ始める
            </Link>
            <p style={{ fontSize: '13px', color: '#999', textAlign: 'center', marginTop: '12px' }}>Stripeによる安全な決済</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '640px', margin: '0 auto', padding: '100px 32px' }}>
        <p style={{ fontSize: '13px', color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>FAQ</p>
        <h2 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-1px', color: '#111', marginBottom: '48px' }}>よくある質問</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { q: 'LINEの設定は難しいですか？', a: 'LINE Developersでチャンネルを作成し、トークンをコピペするだけです。IT知識がなくても設定できる手順でご案内しています。' },
            { q: 'おかしな返信をしませんか？', a: 'セミオートモードなら、AIの下書きを確認してから送信できます。まずはこちらから試してみてください。' },
            { q: '個人情報は安全ですか？', a: 'データは暗号化して保管し、第三者への販売は一切行いません。決済はStripeを通じており、カード情報は当サービスでは保持しません。' },
            { q: 'いつでも解約できますか？', a: 'はい。マイページからいつでも解約できます。解約後は次回更新日まで利用可能です。' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '24px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>{item.q}</div>
              <div style={{ fontSize: '14px', color: '#666', lineHeight: 1.7 }}>{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#111', padding: '100px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-1.5px', color: '#fff', marginBottom: '16px' }}>
          施術に集中できる時間を取り戻す。
        </h2>
        <p style={{ fontSize: '16px', color: '#888', marginBottom: '40px' }}>設定5分。月¥3,980。いつでも解約可能。</p>
        <Link href="/auth" style={{ display: 'inline-block', background: '#fff', color: '#111', padding: '16px 40px', borderRadius: '12px', textDecoration: 'none', fontSize: '16px', fontWeight: 700, letterSpacing: '-0.3px' }}>
          今すぐ始める →
        </Link>
      </section>

      {/* 運営者 */}
      <section style={{ background: '#0a0a0a', padding: '32px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', color: '#555' }}>
          運営者：福田煌介（東京都新宿区）·&nbsp;
          <a href="mailto:kosuke.0507.fukuda@gmail.com" style={{ color: '#666', textDecoration: 'none' }}>kosuke.0507.fukuda@gmail.com</a>
        </p>
      </section>

      {/* フッター */}
      <footer style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontSize: '13px', color: '#444' }}>© 2026 Te-AI</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/legal" style={{ fontSize: '13px', color: '#444', textDecoration: 'none' }}>特定商取引法に基づく表記</Link>
          <Link href="/privacy" style={{ fontSize: '13px', color: '#444', textDecoration: 'none' }}>プライバシーポリシー</Link>
        </div>
      </footer>
    </div>
  )
}
