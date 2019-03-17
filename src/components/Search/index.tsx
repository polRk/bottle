import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'
import { useRef, useEffect } from 'react'

const searchCN = cn('Search')

export const Search: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }, [searchRef.current])

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
          ref={searchRef}
        />
        <label htmlFor="search" className={searchCN('Label')} />
        <input type="submit" value="Найти" className={searchCN('Submit')} />
      </form>
    </div>
  )
}
