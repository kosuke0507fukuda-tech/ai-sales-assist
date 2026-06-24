-- ユーザープロフィール（サービス設定）
create table profiles (
  id uuid primary key default gen_random_uuid(),
  business_description text,
  product_url text,
  mode text default 'semi' check (mode in ('auto', 'semi')),
  stripe_customer_id text,
  stripe_subscription_id text,
  subscribed boolean default false,
  created_at timestamptz default now()
);

-- 受信メッセージ＆AI生成下書き
create table messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  line_user_id text not null,
  line_display_name text,
  original_message text not null,
  reply_draft text,
  status text default 'pending' check (status in ('pending', 'approved', 'sent', 'rejected')),
  created_at timestamptz default now()
);

-- RLS（行レベルセキュリティ）
alter table profiles enable row level security;
alter table messages enable row level security;

create policy "自分のプロフィールのみ参照" on profiles
  for all using (auth.uid() = id);

create policy "自分のメッセージのみ参照" on messages
  for all using (auth.uid() = user_id);
