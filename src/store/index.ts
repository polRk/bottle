import { createStore } from 'react-hooks-global-state'
import { FAILURE_NOTES, FETCH_NOTES, SUCCESS_NOTES } from './constants'
import { Color, Note, Tag } from '../shared'
import { unionBy } from 'lodash'

export interface IState {
  notes: Note[]
  colors: Color[]
  tags: Tag[]
  loading: boolean
  failure: boolean
}

type Action =
  | { type: typeof FETCH_NOTES }
  | {
      type: typeof SUCCESS_NOTES
      payload: { notes: Note[]; colors: Color[]; tags: Tag[] }
    }
  | { type: typeof FAILURE_NOTES; message: string }

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(
  (state: IState, action: Action) => {
    switch (action.type) {
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
  }
)
