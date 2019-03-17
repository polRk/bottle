import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'
import { Button, ButtonGroup } from '../Button'

const navigationCN = cn('Navigation')

export const Navigation: React.FC = () => {
  return (
    <nav className={navigationCN()}>
      <ButtonGroup>
        <Button>Активные</Button>
        <Button appearance={'link'}>Архив</Button>
        <Button appearance={'primary'}>Добавить</Button>
      </ButtonGroup>
    </nav>
  )
}
