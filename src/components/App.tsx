import * as React from 'react'
import { Main } from './Main'
import { Header } from './Header'
import { cn } from '@bem-react/classname'
import { Footer } from './Footer'
import './index.scss'
import { Filters } from './Filters'
import { dispatch } from '../store'
import { FAILURE_NOTES, FETCH_NOTES, SUCCESS_NOTES } from '../store/constants'
import { useEffect } from 'react'
import { Notes } from '../shared'

const appCN = cn('App')

interface IResponse {
  notes: []
  colors: []
  tags: []
}

export const App: React.FC = () => {
  useEffect(() => {
    dispatch({ type: FETCH_NOTES })
    fetch(
      'https://gist.githubusercontent.com/shri-minsk-2019-reviewer/52e831aa051046aca6a493367ee83d2c/raw/c95129963a895d11f791a7830eead8d4dcb9182f/shri.json'
    )
      .then(resp => resp.json())
      .then((data: IResponse) =>
        dispatch({
          type: SUCCESS_NOTES,
          payload: { ...data, notes: new Notes(Notes.factory(data.notes)) },
        })
      )
      .catch(error => dispatch({ type: FAILURE_NOTES, message: error }))
  }, [])

  return (
    <div className={appCN()}>
      <div className={appCN('Header')}>
        <Header />
      </div>
      <div className={appCN('Main')}>
        <Filters />
        <Main />
      </div>
      <div className={appCN('Footer')}>
        <Footer />
      </div>
    </div>
  )
}
App.displayName = 'App'
