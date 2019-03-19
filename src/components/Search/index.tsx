import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'
import { useRef, useEffect, useState } from 'react'

const searchCN = cn('Search')

export const Search: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState({ value: '' })

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
          value={state.value}
          onChange={event => setState({ value: event.target.value })}
        />
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={searchCN('Clear')}
          onClick={() => setState({ value: '' })}
        >
          {state.value && (
            <path
              d="M6 12C2.7 12 0 9.3 0 6C0 2.7 2.7 0 6 0C9.3 0 12 2.7 12 6C12 9.3 9.3 12 6 12ZM9 3.84L8.16 3L6 5.16L3.84 3L3 3.84L5.16 6L3 8.16L3.84 9L6 6.84L8.16 9L9 8.16L6.84 6L9 3.84Z"
              fill="#DBDBDB"
            />
          )}
        </svg>
        <input type="submit" value="Найти" className={searchCN('Submit')} />
      </form>
    </div>
  )
}
Search.displayName = 'Search'
