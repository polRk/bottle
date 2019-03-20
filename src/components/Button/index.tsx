import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'

const buttonCN = cn('Button')

interface IButtonProps {
  appearance?: 'primary' | 'link' | 'filter'
  isSelected?: boolean
  bgColor?: string
  onClick?: () => void
}

export const Button: React.FC<IButtonProps> = ({
  appearance,
  children,
  bgColor,
  isSelected,
  onClick,
}) => {
  return (
    <button
      className={buttonCN(
        Object.assign(
          {},
          appearance ? { [appearance]: true } : {},
          isSelected ? { selected: true } : {}
        )
      )}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
Button.displayName = 'Button'

export const ButtonGroup: React.FC<{ children: React.ReactNode[] }> = ({
  children,
}) => {
  return <div className={buttonCN('Group')}>{children}</div>
}
