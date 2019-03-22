import * as React from 'react'
import { cn } from '@bem-react/classname'
import { useGlobalState } from '../../store'
import './index.scss'
import { NoteWrapper } from '../Note/NoteWrapper'

const mainCN = cn('Main')

export const Main: React.FC = () => {
  const [notes] = useGlobalState('notes')
  const [colorFilter] = useGlobalState('colorFilter')

  return (
    <main className={mainCN()}>
      {notes
        .filter(note =>
          colorFilter.length
            ? colorFilter.includes(note.color !== undefined ? note.color : NaN)
            : true
        )
        .map(note => (
          <NoteWrapper note={note} key={note.created} />
        ))}
    </main>
  )
}
Main.displayName = 'Main'
