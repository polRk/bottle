import { createStore } from 'react-hooks-global-state'
import {
  FAILURE_NOTES,
  FETCH_NOTES,
  SELECT_NOTE,
  SUCCESS_NOTES,
} from './constants'
import { IColor, Note, ITag } from '../shared'
import { unionBy } from 'lodash'

export interface IState {
  notes: Note[]
  colors: IColor[]
  tags: ITag[]
  loading: boolean
  failure: boolean
  activeNote?: Note
}

type Action =
  | { type: typeof SELECT_NOTE; payload: { note: Note } }
  | { type: typeof FETCH_NOTES }
  | {
      type: typeof SUCCESS_NOTES
      payload: { notes: Note[]; colors: IColor[]; tags: ITag[] }
    }
  | { type: typeof FAILURE_NOTES; message: string }

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(
  (state: IState, action: Action) => {
    switch (action.type) {
      case SELECT_NOTE:
        return { ...state, activeNote: action.payload.note }
      case FETCH_NOTES:
        return { ...state, loading: true, failure: false }

      case SUCCESS_NOTES:
        return {
          ...state,
          ...action.payload,
          loading: false,
          failure: false,
        }

      case FAILURE_NOTES:
        return { ...state, loading: false, failure: true }

      default:
        return state
    }
  },
  {
    notes: [],
    colors: [],
    tags: [],
    loading: false,
    failure: false,
    activeNote: undefined,
  }
)
