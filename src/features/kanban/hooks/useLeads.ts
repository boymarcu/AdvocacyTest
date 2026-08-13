import { useEffect, useState } from 'react'
import { fetchLeads } from '../api/leadsApi'
import type { Lead } from '../types'

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLeads()
      .then(setLeads)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { leads, setLeads, loading, error }
}
