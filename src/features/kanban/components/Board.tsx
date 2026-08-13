import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { Column } from './Column'
import { LeadCardOverlay } from './LeadCardOverlay'
import { FASES } from '../constants'
import type { Fase, Lead } from '../types'

interface BoardProps {
  leads: Lead[]
  onMoveLead: (id: string, fase: Fase, posicao: number) => void
  onCardClick: (lead: Lead) => void
  onAddClick: (fase: Fase) => void
}

export function Board({ leads, onMoveLead, onCardClick, onAddClick }: BoardProps) {
  const [activeLead, setActiveLead] = useState<Lead | null>(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))
  const fasesValues = FASES.map((f) => f.value)

  function leadsDaFase(fase: Fase) {
    return leads.filter((l) => l.fase === fase).sort((a, b) => a.posicao - b.posicao)
  }

  function handleDragStart(event: DragStartEvent) {
    const lead = leads.find((l) => l.id === event.active.id)
    setActiveLead(lead ?? null)
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveLead(null)
    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)
    const draggedLead = leads.find((l) => l.id === activeId)
    if (!draggedLead) return

    const overIsColumn = fasesValues.includes(overId as Fase)
    const targetFase = overIsColumn ? (overId as Fase) : leads.find((l) => l.id === overId)?.fase
    if (!targetFase) return

    const destino = leadsDaFase(targetFase).filter((l) => l.id !== activeId)

    let novaPosicao: number
    if (overIsColumn || destino.length === 0) {
      const maior = destino.length ? destino[destino.length - 1].posicao : -1
      novaPosicao = maior + 1
    } else {
      const overIndex = destino.findIndex((l) => l.id === overId)
      if (overIndex === -1) {
        novaPosicao = (destino[destino.length - 1]?.posicao ?? -1) + 1
      } else {
        const anterior = destino[overIndex - 1]
        const atual = destino[overIndex]
        novaPosicao = anterior ? (anterior.posicao + atual.posicao) / 2 : atual.posicao - 1
      }
    }

    if (targetFase === draggedLead.fase && novaPosicao === draggedLead.posicao) return

    onMoveLead(activeId, targetFase, novaPosicao)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="board">
        {FASES.map((fase) => (
          <Column
            key={fase.value}
            fase={fase.value}
            label={fase.label}
            leads={leadsDaFase(fase.value)}
            onCardClick={onCardClick}
            onAddClick={() => onAddClick(fase.value)}
          />
        ))}
      </div>
      <DragOverlay>{activeLead ? <LeadCardOverlay lead={activeLead} /> : null}</DragOverlay>
    </DndContext>
  )
}
