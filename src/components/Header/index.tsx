import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'

const headerCN = cn('Header')

export const Header: React.FC = () => {
  return <header className={headerCN()}>Hello World</header>
}
