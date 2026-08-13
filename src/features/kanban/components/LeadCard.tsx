import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Badge } from '../../../components/ui/Badge'
import { formatDataContato } from '../formatDate'
import type { Lead } from '../types'

interface LeadCardProps {
  lead: Lead
  onClick: () => void
}

export function LeadCard({ lead, onClick }: LeadCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: lead.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="lead-card"
      onClick={onClick}
      {...attributes}
      {...listeners}
    >
      <div className="lead-card-header">
        <span className="lead-card-name">{lead.nome}</span>
        <span className="lead-card-date" title="Data do contato">
          {formatDataContato(lead.data_contato)}
        </span>
      </div>
      <div className="lead-card-meta">
        {lead.instagram && <>@{lead.instagram.replace(/^@/, '')} · </>}
        {lead.telefone}
      </div>
      <div className="lead-card-badges">
        <Badge tone={lead.modalidade}>{lead.modalidade === 'compra' ? 'Compra' : 'Locação'}</Badge>
        <Badge tone={lead.unidade}>{lead.unidade}</Badge>
      </div>
    </div>
  )
}
