import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'

const footerCN = cn('Footer')

export const Footer: React.FC = () => {
  return <footer className={footerCN()} />
}
