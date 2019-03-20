import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'
import { Button, ButtonGroup } from '../Button'

const navigationCN = cn('Navigation')

export const Navigation: React.FC = () => {
  return (
    <nav className={navigationCN()}>
      <div className={navigationCN('Links')}>
        <ButtonGroup>
          <Button>Активные</Button>
          <Button appearance={'link'}>Архив</Button>
          <Button appearance={'primary'}>Добавить</Button>
        </ButtonGroup>
      </div>
      <div className={navigationCN('Expand')}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 6H23V4H1V6ZM1 13H23V11H1V13ZM23 20H1V18H23V20Z"
            fill="black"
          />
        </svg>
      </div>
    </nav>
  )
}
Navigation.displayName = 'Navigation'
