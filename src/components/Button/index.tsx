import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'

const buttonCN = cn('Button')

interface IButtonProps {
  variant?: 'primary' | 'link'
}

export const Button: React.FC<IButtonProps> = ({ children, variant }) => {
  return (
    <button
      className={buttonCN({
        primary: variant === 'primary',
        link: variant === 'link',
      })}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  variant: undefined,
}
