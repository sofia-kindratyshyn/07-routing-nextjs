import NoteDetailsClient from './NoteDetails.client'

type NoteDetailsProps = { params: Promise<{ id: string }> }

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params
  const numericId = Number(id)
  return <NoteDetailsClient id={numericId} />
}

export default NoteDetails
