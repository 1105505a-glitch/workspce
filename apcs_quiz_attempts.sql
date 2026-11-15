-- APCS 每次作答紀錄：在 Supabase Dashboard > SQL Editor 執行
create table if not exists public.apcs_quiz_attempts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    question_id integer not null,
    question_text text not null,
    selected_index integer not null,
    correct_index integer not null,
    is_correct boolean not null,
    created_at timestamptz not null default now()
);

alter table public.apcs_quiz_attempts enable row level security;

drop policy if exists "Users can read their own APCS attempts" on public.apcs_quiz_attempts;
create policy "Users can read their own APCS attempts"
on public.apcs_quiz_attempts
for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own APCS attempts" on public.apcs_quiz_attempts;
create policy "Users can insert their own APCS attempts"
on public.apcs_quiz_attempts
for insert to authenticated
with check ((select auth.uid()) = user_id);
