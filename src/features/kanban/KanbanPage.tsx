import { useState } from 'react'
import { Board } from './components/Board'
import { LeadFormModal } from './components/LeadFormModal'
import { useLeads } from './hooks/useLeads'
import { useLeadsRealtime } from './hooks/useLeadsRealtime'
import { useLeadMutations } from './hooks/useLeadMutations'
import type { Fase, Lead } from './types'

type ModalState = { mode: 'create'; fase: Fase } | { mode: 'edit'; lead: Lead } | null

export function KanbanPage() {
  const { leads, setLeads, loading, error } = useLeads()
  useLeadsRealtime(setLeads)
  const { addLead, editLead, removeLead, moveLead } = useLeadMutations(leads, setLeads)
  const [modalState, setModalState] = useState<ModalState>(null)

  if (loading) return <div className="page-loading">Carregando pipeline...</div>
  if (error) return <p className="form-error">Erro ao carregar leads: {error}</p>

  return (
    <>
      <Board
        leads={leads}
        onMoveLead={(id, fase, posicao) => {
          moveLead(id, fase, posicao).catch((e) => console.error('Falha ao mover lead', e))
        }}
        onCardClick={(lead) => setModalState({ mode: 'edit', lead })}
        onAddClick={(fase) => setModalState({ mode: 'create', fase })}
      />

      {modalState?.mode === 'create' && (
        <LeadFormModal
          onClose={() => setModalState(null)}
          onSubmit={(input) => addLead(input, modalState.fase)}
        />
      )}

      {modalState?.mode === 'edit' && (
        <LeadFormModal
          lead={modalState.lead}
          onClose={() => setModalState(null)}
          onSubmit={(input) => editLead(modalState.lead.id, input)}
          onDelete={() => removeLead(modalState.lead.id)}
        />
      )}
    </>
  )
}
