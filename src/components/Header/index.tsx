import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'
import { Logo } from '../Logo'
import { Search } from '../Search'
import { Navigation } from '../Navigation'

const headerCN = cn('Header')

export const Header: React.FC = () => {
  return (
    <header className={headerCN()}>
      <div className={headerCN('Logo')}>
        <Logo />
      </div>
      <div className={headerCN('Navigation')}>
        <Search />
        <Navigation />
      </div>
    </header>
  )
}
Header.displayName = 'Header'
