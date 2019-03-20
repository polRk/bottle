import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'
import { Button } from '../Button'
import { useGlobalState, dispatch } from '../../store'
import { ADD_COLOR_FILTER, DELETE_COLOR_FILTER } from '../../store/constants'

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
  const [colorFilter] = useGlobalState('colorFilter')

  return (
    <div className={filtersCN()}>
      <h1 className={filtersCN('Title')}>Заметки</h1>
      <div className={filtersCN('Options')}>
        {colors.map(color => {
          const isActive = colorFilter.includes(color.id)
          return (
            <Button
              bgColor={color.color}
              appearance={'filter'}
              key={color.id}
              isSelected={isActive}
              onClick={() =>
                isActive
                  ? dispatch({ type: DELETE_COLOR_FILTER, color: color.id })
                  : dispatch({ type: ADD_COLOR_FILTER, color: color.id })
              }
            >
              {/* TODO: Написать логику */}
              {isActive && <ActiveFilter />}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
Filters.displayName = 'Filters'
