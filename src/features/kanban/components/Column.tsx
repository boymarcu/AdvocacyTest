import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { LeadCard } from './LeadCard'
import type { Fase, Lead } from '../types'

interface ColumnProps {
  fase: Fase
  label: string
  leads: Lead[]
  onCardClick: (lead: Lead) => void
  onAddClick: () => void
}

export function Column({ fase, label, leads, onCardClick, onAddClick }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: fase })

  return (
    <div className="board-column">
      <div className="board-column-header">
        <span>{label}</span>
        <span className="board-column-count">{leads.length}</span>
      </div>
      <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="board-column-body">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onClick={() => onCardClick(lead)} />
          ))}
        </div>
      </SortableContext>
      <button type="button" className="board-column-add" onClick={onAddClick}>
        + Novo lead
      </button>
    </div>
  )
}
