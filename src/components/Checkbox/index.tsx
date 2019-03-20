import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'

const checkboxCN = cn('Checkbox')

interface ICheckboxProps {
  text: string
  isChecked: boolean
  onChange: () => void
}

const check = () => (
  <svg
    width="12"
    height="9"
    viewBox="0 0 12 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.94548 0.292786L11.3595 1.70722L4.67767 8.38693L0.330566 4.46789L1.66975 2.98243L4.60655 5.63004L9.94548 0.292786Z"
      fill="black"
    />
  </svg>
)

export const Checkbox: React.FC<ICheckboxProps> = ({
  text,
  isChecked,
  onChange,
}) => {
  const id = `Checkbox_${Math.random()
    .toString()
    .replace(/0\./, '')}`

  return (
    <span className={checkboxCN({ checked: isChecked })}>
      <input
        id={id}
        type="checkbox"
        className={checkboxCN('Control')}
        onChange={onChange}
        checked={isChecked}
      />
      <label htmlFor={id} className={checkboxCN('Input')}>
        {isChecked && check()}
      </label>
      <span className={checkboxCN('Label')}>{text}</span>
    </span>
  )
}
Checkbox.displayName = 'Checkbox'
