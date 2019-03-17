import * as React from 'react'
import { cn } from '@bem-react/classname'
import { useGlobalState } from '../../store'
import './index.scss'

const mainCN = cn('Main')

export const Main: React.FC = () => {
  const [notes] = useGlobalState('notes')

  return (
    <main className={mainCN()}>
      <ul>
        {notes.map(note => (
          <li key={note.created}>{note.title}</li>
        ))}
      </ul>
    </main>
  )
}
