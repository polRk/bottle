import * as React from 'react'
import { cn } from '@bem-react/classname'

const searchCN = cn('Search')

export const Search: React.FC = () => {
  return <div className={searchCN()} />
}
