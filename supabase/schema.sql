-- Rode este script no SQL Editor do seu projeto Supabase.
-- Tabela de leads do pipeline Kanban + RLS (só usuários autenticados acessam).

create table public.leads (
  id           uuid primary key default gen_random_uuid(),
  nome         text not null,
  instagram    text,
  telefone     text not null,
  modalidade   text not null check (modalidade in ('compra', 'locacao')),
  unidade      text not null check (unidade in ('basic', 'plus', 'premium')),
  data_contato date not null default current_date,
  fase         text not null default 'lead' check (fase in (
                 'lead', 'qualificacao', 'reaquecer',
                 'followup_12h', 'followup_23h', 'negociando', 'perdido'
               )),
  posicao      double precision not null default 0,
  created_by   uuid references auth.users (id),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index leads_fase_posicao_idx on public.leads (fase, posicao);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

-- RLS: sem sessão autenticada, a tabela fica totalmente inacessível.
alter table public.leads enable row level security;

create policy "leads_select_authenticated"
on public.leads for select
to authenticated
using (true);

create policy "leads_insert_authenticated"
on public.leads for insert
to authenticated
with check (true);

create policy "leads_update_authenticated"
on public.leads for update
to authenticated
using (true)
with check (true);

create policy "leads_delete_authenticated"
on public.leads for delete
to authenticated
using (true);

-- Habilita Realtime nesta tabela (necessário para refletir mudanças ao vivo entre usuários).
alter publication supabase_realtime add table public.leads;
