import type { Fase, Modalidade, Unidade } from './types'

export const FASES: { value: Fase; label: string }[] = [
  { value: 'lead', label: 'Lead' },
  { value: 'qualificacao', label: 'Qualificação' },
  { value: 'reaquecer', label: 'Reaquecer' },
  { value: 'followup_12h', label: 'Follow-up 12h' },
  { value: 'followup_23h', label: 'Follow-up 23h' },
  { value: 'negociando', label: 'Negociando' },
  { value: 'perdido', label: 'Perdido' },
]

export const MODALIDADES: { value: Modalidade; label: string }[] = [
  { value: 'compra', label: 'Compra' },
  { value: 'locacao', label: 'Locação' },
]

export const UNIDADES: { value: Unidade; label: string }[] = [
  { value: 'basic', label: 'Basic' },
  { value: 'plus', label: 'Plus' },
  { value: 'premium', label: 'Premium' },
]
