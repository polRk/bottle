import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'

const searchCN = cn('Search')

export const Search: React.FC = () => {
  return (
    <div className={searchCN()}>
      <form action={'/search'} className={searchCN('Form')}>
        <input
          id="search"
          type="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-autocomplete="list"
          className={searchCN('Input')}
          placeholder="Поиск"
        />
        <label htmlFor="search" className={searchCN('Label')} />
        <input type="submit" value="Найти" className={searchCN('Submit')} />
      </form>
    </div>
  )
}
