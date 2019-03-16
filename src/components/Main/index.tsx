import * as React from 'react'
import { cn } from '@bem-react/classname'
import { dispatch, useGlobalState } from '../../store'
import './index.scss'
import { useEffect } from 'react'
import {
  FAILURE_NOTES,
  FETCH_NOTES,
  SUCCESS_NOTES,
} from '../../store/constants'

interface IResponse {
  notes: []
  colors: []
  tags: []
}

const mainCN = cn('Main')

export const Main: React.FC = () => {
  const [notes] = useGlobalState('notes')

  useEffect(() => {
    dispatch({ type: FETCH_NOTES })
    fetch(
      'https://gist.githubusercontent.com/shri-minsk-2019-reviewer/52e831aa051046aca6a493367ee83d2c/raw/c95129963a895d11f791a7830eead8d4dcb9182f/shri.json'
    )
      .then(resp => resp.json())
      .then((data: IResponse) =>
        dispatch({ type: SUCCESS_NOTES, payload: data })
      )
      .catch(error => dispatch({ type: FAILURE_NOTES, message: error }))
  }, [])

  return (
    <main className={mainCN()}>
      <ul>
        {notes.map(note => (
          <li key={note.created}>{note.title}</li>
        ))}
      </ul>
    </main>
  )
}
