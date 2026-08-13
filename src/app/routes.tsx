import { lazy, type LazyExoticComponent, type ComponentType } from 'react'

export interface AppRoute {
  path: string
  label: string
  Component: LazyExoticComponent<ComponentType>
}

// Adicionar uma aba nova ao dashboard = 1 entrada aqui + 1 pasta em src/features/<nome>.
export const appRoutes: AppRoute[] = [
  {
    path: 'kanban',
    label: 'Pipeline',
    Component: lazy(() =>
      import('../features/kanban/KanbanPage').then((m) => ({ default: m.KanbanPage })),
    ),
  },
]
