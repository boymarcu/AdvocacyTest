# AdvocacyTest

Dashboard interno com pipeline de leads estilo Kanban (Vite + React + TypeScript + Supabase + dnd-kit).

## Rodando localmente

1. Copie `.env.example` para `.env.local` e preencha com a URL e a anon key do seu projeto Supabase.
2. Rode o script `supabase/schema.sql` no SQL Editor do Supabase (cria a tabela `leads`, RLS e Realtime).
3. Crie os usuários da equipe manualmente em Authentication > Users no painel do Supabase (não há tela de cadastro público).
4. `npm install`
5. `npm run dev`

## Build de produção

```
npm run build
```

Gera a pasta `dist/`, pronta para o GitHub Pages (o `base` em `vite.config.ts` já está configurado para `/AdvocacyTest/`).

## Deploy

O workflow `.github/workflows/deploy.yml` builda e publica no GitHub Pages a cada push em `main`.
Configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` em Settings > Secrets and variables > Actions do repositório, e habilite Pages com source = "GitHub Actions".

**Importante:** a anon key fica visível no bundle publicado (é pública por design). Quem protege os dados de verdade são as RLS policies do Supabase — sem sessão autenticada, a tabela `leads` fica inacessível.
