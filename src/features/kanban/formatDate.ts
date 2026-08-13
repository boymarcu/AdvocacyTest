// data_contato vem como "YYYY-MM-DD" (sem hora). Formatar via split evita o Date
// interpretar como UTC meia-noite e "voltar" um dia dependendo do fuso do navegador.
export function formatDataContato(dataContato: string): string {
  const [year, month, day] = dataContato.split('-')
  return `${day}/${month}/${year.slice(2)}`
}
