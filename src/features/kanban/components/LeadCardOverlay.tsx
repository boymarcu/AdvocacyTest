import { Badge } from '../../../components/ui/Badge'
import type { Lead } from '../types'

export function LeadCardOverlay({ lead }: { lead: Lead }) {
  return (
    <div className="lead-card" style={{ cursor: 'grabbing' }}>
      <div className="lead-card-name">{lead.nome}</div>
      <div className="lead-card-meta">{lead.telefone}</div>
      <div className="lead-card-badges">
        <Badge tone={lead.modalidade}>{lead.modalidade === 'compra' ? 'Compra' : 'Locação'}</Badge>
        <Badge tone={lead.unidade}>{lead.unidade}</Badge>
      </div>
    </div>
  )
}
