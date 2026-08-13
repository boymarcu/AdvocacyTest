import { supabase } from '../../../lib/supabase/client'
import type { Fase, Lead, LeadInput } from '../types'

export async function fetchLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('fase', { ascending: true })
    .order('posicao', { ascending: true })
  if (error) throw error
  return data as Lead[]
}

export async function createLead(input: LeadInput, fase: Fase, posicao: number): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .insert({ ...input, fase, posicao })
    .select()
    .single()
  if (error) throw error
  return data as Lead
}

export async function updateLead(id: string, input: LeadInput): Promise<Lead> {
  const { data, error } = await supabase.from('leads').update(input).eq('id', id).select().single()
  if (error) throw error
  return data as Lead
}

export async function updateLeadFaseEPosicao(id: string, fase: Fase, posicao: number): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .update({ fase, posicao })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Lead
}

export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase.from('leads').delete().eq('id', id)
  if (error) throw error
}
