'use client'
import css from './NotePreview.client.module.css'
import { useRouter } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '../../../../lib/api'
import Modal from '../../../../components/Modal/Modal'

type NotePreviewProps = {
  id: number
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter()

  const { data, isLoading, error } = useQuery({
    queryKey: ['noteId', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  })
  if (isLoading) return <p>Loading, please wait...</p>
  if (error) return <p>Something went wrong.</p>
  return (
    <Modal
      toClose={() => {
        router.back()
      }}
    >
      <div className={css.container}>
        {data && (
          <div className={css.item}>
            <button className={css.backBtn} onClick={() => router.back()}>
              Назад
            </button>
            <div className={css.header}>
              <h2>{data.title}</h2>
              {data.tag && <span className={css.tag}>{data.tag}</span>}
            </div>
            <div className={css.content}>{data.content}</div>
            <div className={css.date}>{new Date(data.createdAt).toLocaleDateString('uk-UA')}</div>
          </div>
        )}
      </div>
    </Modal>
  )
}
