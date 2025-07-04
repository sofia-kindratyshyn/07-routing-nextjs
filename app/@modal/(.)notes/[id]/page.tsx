import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import NotePreview from './NotePreview.client'
import { fetchNoteById } from '../../../../lib/api'

type NotePreviewProps = {
  params: Promise<{ id: string }>
}

export default async function NotePrewievPage({ params }: NotePreviewProps) {
  const { id } = await params
  const numericId = Number(id)

  if (isNaN(numericId)) {
    throw new Error('Invalid ID: not a number')
  }

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note-preview', numericId],
    queryFn: () => fetchNoteById(numericId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={numericId} />
    </HydrationBoundary>
  )
}
