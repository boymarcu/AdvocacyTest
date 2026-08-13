import type { Dispatch, SetStateAction } from 'react'
import { createLead, deleteLead, updateLead, updateLeadFaseEPosicao } from '../api/leadsApi'
import type { Fase, Lead, LeadInput } from '../types'

export function useLeadMutations(leads: Lead[], setLeads: Dispatch<SetStateAction<Lead[]>>) {
  async function addLead(input: LeadInput, fase: Fase) {
    const doColuna = leads.filter((l) => l.fase === fase)
    const posicao = doColuna.length ? Math.max(...doColuna.map((l) => l.posicao)) + 1 : 0
    const created = await createLead(input, fase, posicao)
    setLeads((current) => [...current, created])
  }

  async function editLead(id: string, input: LeadInput) {
    const updated = await updateLead(id, input)
    setLeads((current) => current.map((l) => (l.id === id ? updated : l)))
  }

  async function removeLead(id: string) {
    const previous = leads
    setLeads((current) => current.filter((l) => l.id !== id))
    try {
      await deleteLead(id)
    } catch (e) {
      setLeads(previous)
      throw e
    }
  }

  async function moveLead(id: string, novaFase: Fase, novaPosicao: number) {
    const previous = leads
    setLeads((current) =>
      current.map((l) => (l.id === id ? { ...l, fase: novaFase, posicao: novaPosicao } : l)),
    )
    try {
      await updateLeadFaseEPosicao(id, novaFase, novaPosicao)
    } catch (e) {
      setLeads(previous)
      throw e
    }
  }

  return { addLead, editLead, removeLead, moveLead }
}
