'use client'

import css from './Notes.client.module.css'
import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Toaster } from 'react-hot-toast'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getNotes, NotesResponse } from '../../../../lib/api'
import SearchBox from '../../../../components/SearchBox/SearchBox'
import Pagination from '../../../../components/Pagination/Pagination'
import NoteList from '../../../../components/NoteList/NoteList'
import Modal from '../../../../components/Modal/Modal'
import NoteForm from '../../../../components/NoteForm/NoteForm'

type NotesClientProps = {
  tag?: string
  initialNotes: NotesResponse
}

export default function NotesClient({ tag, initialNotes }: NotesClientProps) {
  const [page, setPage] = useState(1)
  const [searchedValue, setSearchedValue] = useState('')
  const [debouncedText] = useDebounce(searchedValue, 300)
  const [openModal, setOpenModal] = useState(false)

  const { data, isFetching } = useQuery({
    queryKey: ['notes', debouncedText, page, tag],
    queryFn: () => getNotes(debouncedText, page, tag),
    placeholderData: keepPreviousData,
    initialData: initialNotes,
    refetchOnMount: false,
  })

  const getHandleSearch = (value: string) => {
    setSearchedValue(value)
    setPage(1)
  }

  const closeModal = () => setOpenModal(false)

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox getValue={getHandleSearch} />

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={newPage => {
              if (newPage !== page) {
                setPage(newPage)
              }
            }}
          />
        )}

        <button onClick={() => setOpenModal(true)} className={css.button}>
          Create note +
        </button>
      </header>

      {isFetching && <p>Loading...</p>}

      {data?.notes?.length === 0 && !isFetching && <p>There are no notes found for your request</p>}

      {data && data?.notes?.length > 0 && <NoteList notes={data.notes} />}

      {openModal && (
        <Modal toClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  )
}
