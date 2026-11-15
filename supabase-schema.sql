
-- =========================================
-- 程式學院資料庫設定
-- =========================================

-- 1. 課程學習紀錄
create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

-- 開啟 RLS 安全保護
alter table public.lesson_progress enable row level security;

-- 避免重複建立政策
drop policy if exists "Users can read their own lesson progress"
on public.lesson_progress;

drop policy if exists "Users can insert their own lesson progress"
on public.lesson_progress;

drop policy if exists "Users can update their own lesson progress"
on public.lesson_progress;

-- 只能讀取自己的學習紀錄
create policy "Users can read their own lesson progress"
on public.lesson_progress
for select
to authenticated
using ((select auth.uid()) = user_id);

-- 只能新增自己的學習紀錄
create policy "Users can insert their own lesson progress"
on public.lesson_progress
for insert
to authenticated
with check ((select auth.uid()) = user_id);

-- 只能更新自己的學習紀錄
create policy "Users can update their own lesson progress"
on public.lesson_progress
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);


-- =========================================
-- 2. APCS 測驗紀錄
-- =========================================

create table if not exists public.apcs_quiz_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  is_correct boolean not null default false,
  answered_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

-- 開啟 RLS 安全保護
alter table public.apcs_quiz_progress enable row level security;

-- 避免重複建立政策
drop policy if exists "Users can read their own APCS progress"
on public.apcs_quiz_progress;

drop policy if exists "Users can insert their own APCS progress"
on public.apcs_quiz_progress;

-- 只能讀取自己的 APCS 紀錄
create policy "Users can read their own APCS progress"
on public.apcs_quiz_progress
for select
to authenticated
using ((select auth.uid()) = user_id);

-- 只能新增自己的 APCS 紀錄
create policy "Users can insert their own APCS progress"
on public.apcs_quiz_progress
for insert
to authenticated
with check ((select auth.uid()) = user_id);


-- =========================================
-- 3. 安全提醒
-- =========================================

-- 不建立公開讀取政策。
-- 未登入的訪客無法讀寫這兩張資料表。
-- 不要將 service_role key 放進前端程式碼。
