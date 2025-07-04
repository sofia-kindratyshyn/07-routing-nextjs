'use client'
import Link from 'next/link'
import css from './TagsMenu.module.css'
import { useState } from 'react'

export default function TagsMenu() {
  const uniqueTags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']
  const [menuListIsOpen, setMenuListIsOpen] = useState(false)
  return (
    <>
      <div className={css.menuContainer}>
        <button className={css.menuButton} onClick={() => setMenuListIsOpen(!menuListIsOpen)}>
          Notes ▾
        </button>
        {menuListIsOpen && (
          <ul className={css.menuList}>
            <li key='All' className={css.menuItem} onClick={() => setMenuListIsOpen(false)}>
              <Link href={`/notes/filter/All`} className={css.menuLink}>
                All
              </Link>
            </li>
            {uniqueTags.map(tag => {
              return (
                <li key={tag} className={css.menuItem} onClick={() => setMenuListIsOpen(false)}>
                  <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                    {tag}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}
