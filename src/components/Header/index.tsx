import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'
import { Logo } from '../Logo'
import { Search } from '../Search'

const headerCN = cn('Header')

export const Header: React.FC = () => {
  return (
    <header className={headerCN()}>
      <Logo />
      <Search />
    </header>
  )
}
