import { createStore } from 'react-hooks-global-state'
import {
  FAILURE_NOTES,
  FETCH_NOTES,
  SELECT_NOTE,
  ADD_COLOR_FILTER,
  DELETE_COLOR_FILTER,
  SUCCESS_NOTES,
} from './constants'
import { IColor, ITag, Note, Notes } from '../shared'
import { unionBy } from 'lodash'

export interface IState {
  notes: Notes
  colors: IColor[]
  tags: ITag[]
  loading: boolean
  failure: boolean
  colorFilter: number[]
}

type Action =
  | { type: typeof SELECT_NOTE; payload: { note: Note } }
  | { type: typeof FETCH_NOTES }
  | {
      type: typeof SUCCESS_NOTES
      payload: { notes: Notes; colors: IColor[]; tags: ITag[] }
    }
  | { type: typeof FAILURE_NOTES; message: string }
  | { type: typeof ADD_COLOR_FILTER; color: number }
  | { type: typeof DELETE_COLOR_FILTER; color: number }

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
      case ADD_COLOR_FILTER:
        return { ...state, colorFilter: [...state.colorFilter, action.color] }
      case DELETE_COLOR_FILTER:
        return {
          ...state,
          colorFilter: state.colorFilter.filter(
            color => color !== action.color
          ),
        }
      default:
        return state
    }
  },
  {
    notes: new Notes([]),
    colors: [],
    tags: [],
    loading: false,
    failure: false,
    colorFilter: [],
  }
)
