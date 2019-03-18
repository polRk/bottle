import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'
import { Button } from '../Button'
import { useGlobalState } from '../../store'

const filtersCN = cn('Filters')

const ActiveFilter: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
  >
    <path
      d="M13.9487 0L16 2.05197L6.30649 11.7424L0 6.05696L1.9428 3.90195L6.20331 7.74293L13.9487 0Z"
      fill="black"
    />
  </svg>
)

export const Filters: React.FC = () => {
  const [colors] = useGlobalState('colors')

  return (
    <div className={filtersCN()}>
      <h1 className={filtersCN('Title')}>Заметки</h1>
      <div className={filtersCN('Options')}>
        {colors.map(color => (
          <Button
            bgColor={color.color}
            appearance={'filter'}
            key={color.id}
            isSelected={color.id === 2}
          >
            {/* TODO: Написать логику */}
            {color.id === 2 && <ActiveFilter />}
          </Button>
        ))}
      </div>
    </div>
  )
}
Filters.displayName = 'Filters'
