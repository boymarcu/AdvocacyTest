import { useState, type FormEvent } from 'react'
import { Modal } from '../../../components/ui/Modal'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { MODALIDADES, UNIDADES } from '../constants'
import type { Lead, LeadInput, Modalidade, Unidade } from '../types'

interface LeadFormModalProps {
  lead?: Lead | null
  onClose: () => void
  onSubmit: (input: LeadInput) => Promise<void>
  onDelete?: () => Promise<void>
}

export function LeadFormModal({ lead, onClose, onSubmit, onDelete }: LeadFormModalProps) {
  const [nome, setNome] = useState(lead?.nome ?? '')
  const [instagram, setInstagram] = useState(lead?.instagram ?? '')
  const [telefone, setTelefone] = useState(lead?.telefone ?? '')
  const [modalidade, setModalidade] = useState<Modalidade>(lead?.modalidade ?? MODALIDADES[0].value)
  const [unidade, setUnidade] = useState<Unidade>(lead?.unidade ?? UNIDADES[0].value)
  const [dataContato, setDataContato] = useState(
    lead?.data_contato ?? new Date().toISOString().slice(0, 10),
  )
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await onSubmit({
        nome: nome.trim(),
        instagram: instagram.trim() || null,
        telefone: telefone.trim(),
        modalidade,
        unidade,
        data_contato: dataContato,
      })
      onClose()
    } catch {
      setError('Não deu pra salvar agora. Tenta de novo?')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!onDelete) return
    setSubmitting(true)
    try {
      await onDelete()
      onClose()
    } catch {
      setError('Não deu pra excluir agora. Tenta de novo?')
      setSubmitting(false)
    }
  }

  return (
    <Modal title={lead ? 'Editar lead' : 'Novo lead'} onClose={onClose}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Input label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required autoFocus />
        <Input
          label="Instagram"
          value={instagram ?? ''}
          onChange={(e) => setInstagram(e.target.value)}
          placeholder="@usuario"
        />
        <Input
          label="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
          placeholder="(11) 99999-9999"
        />
        <Select
          label="Modalidade"
          value={modalidade}
          onChange={(e) => setModalidade(e.target.value as Modalidade)}
          options={MODALIDADES}
        />
        <Select
          label="Unidade"
          value={unidade}
          onChange={(e) => setUnidade(e.target.value as Unidade)}
          options={UNIDADES}
        />
        <Input
          label="Data do contato"
          type="date"
          value={dataContato}
          onChange={(e) => setDataContato(e.target.value)}
          required
        />
        {error && <p className="form-error">{error}</p>}
        <div className="modal-footer">
          {onDelete && (
            <button type="button" className="btn-secondary" onClick={handleDelete} disabled={submitting}>
              Excluir
            </button>
          )}
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
