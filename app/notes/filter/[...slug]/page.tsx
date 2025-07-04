import { getNotes } from '../../../../lib/api'
import NotesClient from './Notes.client'

type FilteredNotesProps = {
  params: Promise<{ slug: string[] }>
}

export default async function FilteredNotes({ params }: FilteredNotesProps) {
  const { slug } = await params
  const notes = slug[0] === 'All' ? await getNotes('', 1) : await getNotes('', 1, slug[0])
  return (
    <>
      {slug[0] === 'All' ? (
        <NotesClient initialNotes={notes} />
      ) : (
        <NotesClient initialNotes={notes} tag={slug[0]} />
      )}
    </>
  )
}
