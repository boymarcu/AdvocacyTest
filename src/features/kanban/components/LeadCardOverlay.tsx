import { Badge } from '../../../components/ui/Badge'
import { formatDataContato } from '../formatDate'
import type { Lead } from '../types'

export function LeadCardOverlay({ lead }: { lead: Lead }) {
  return (
    <div className="lead-card" style={{ cursor: 'grabbing' }}>
      <div className="lead-card-header">
        <span className="lead-card-name">{lead.nome}</span>
        <span className="lead-card-date" title="Data do contato">
          {formatDataContato(lead.data_contato)}
        </span>
      </div>
      <div className="lead-card-meta">{lead.telefone}</div>
      <div className="lead-card-badges">
        <Badge tone={lead.modalidade}>{lead.modalidade === 'compra' ? 'Compra' : 'Locação'}</Badge>
        <Badge tone={lead.unidade}>{lead.unidade}</Badge>
      </div>
    </div>
  )
}
