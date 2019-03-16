import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'
const mainCN = cn('Main')

export const Main: React.FC = () => {
  return <main className={mainCN()} />
}
