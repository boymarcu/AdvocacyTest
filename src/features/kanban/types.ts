export type Modalidade = 'compra' | 'locacao'
export type Unidade = 'basic' | 'plus' | 'premium'
export type Fase =
  | 'lead'
  | 'qualificacao'
  | 'reaquecer'
  | 'followup_12h'
  | 'followup_23h'
  | 'negociando'
  | 'perdido'

export interface Lead {
  id: string
  nome: string
  instagram: string | null
  telefone: string
  modalidade: Modalidade
  unidade: Unidade
  data_contato: string
  fase: Fase
  posicao: number
  created_by: string | null
  created_at: string
  updated_at: string
}

export type LeadInput = {
  nome: string
  instagram?: string | null
  telefone: string
  modalidade: Modalidade
  unidade: Unidade
  data_contato: string
}
