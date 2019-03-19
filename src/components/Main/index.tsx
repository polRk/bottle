import * as React from 'react'
import { cn } from '@bem-react/classname'
import { useGlobalState } from '../../store'
import './index.scss'
import { NoteWrapper } from '../Note/NoteWrapper'

const mainCN = cn('Main')

export const Main: React.FC = () => {
  const [notes] = useGlobalState('notes')
  return (
    <main className={mainCN()}>
      {notes.map(note => (
        <NoteWrapper note={note} key={note.created} />
      ))}
    </main>
  )
}
Main.displayName = 'Main'
