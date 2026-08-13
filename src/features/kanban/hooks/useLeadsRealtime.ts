import { useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { supabase } from '../../../lib/supabase/client'
import type { Lead } from '../types'

export function useLeadsRealtime(setLeads: Dispatch<SetStateAction<Lead[]>>) {
  useEffect(() => {
    const channel = supabase
      .channel('leads-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        (payload) => {
          setLeads((current) => {
            if (payload.eventType === 'DELETE') {
              const oldId = (payload.old as Partial<Lead>).id
              return current.filter((l) => l.id !== oldId)
            }

            const incoming = payload.new as Lead
            const existing = current.find((l) => l.id === incoming.id)

            // Já aplicamos a própria mudança de forma otimista — ignora eco mais antigo/igual.
            if (existing && existing.updated_at >= incoming.updated_at) {
              return current
            }

            if (existing) {
              return current.map((l) => (l.id === incoming.id ? incoming : l))
            }

            return [...current, incoming]
          })
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [setLeads])
}
