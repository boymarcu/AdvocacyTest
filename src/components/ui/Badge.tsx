import type { ReactNode } from 'react'
import clsx from 'clsx'

interface BadgeProps {
  children: ReactNode
  tone?: 'default' | 'compra' | 'locacao' | 'basic' | 'plus' | 'premium'
}

export function Badge({ children, tone = 'default' }: BadgeProps) {
  return <span className={clsx('badge', `badge-${tone}`)}>{children}</span>
}
