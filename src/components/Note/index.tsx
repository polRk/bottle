import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'

const noteCN = cn('Note')

export const Note: React.FC = () => {
  return <section className={noteCN()} />
}
Note.displayName = 'Note'
