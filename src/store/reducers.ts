import {
  ADD_FILTERS,
  IAction,
  LOAD_FILTERS,
  LOAD_NOTES,
  REMOVE_FILTERS,
} from './actions'
import { IFilter, IState } from './index'
import { unionBy, pullAllBy } from 'lodash'
import { combineReducers, Reducer } from 'redux'

export interface IReducer<T = any> extends Reducer<T, IAction<T>> {}

const notes: IReducer<IFilter[]> = (state = [], action) => {
  switch (action.type) {
    case LOAD_NOTES:
      return unionBy(state, action.payload, 'id')
    default:
      return state
  }
}

const filters: IReducer<IFilter[]> = (state = [], action) => {
  switch (action.type) {
    case LOAD_FILTERS:
      return unionBy(state, action.payload, 'id')
    case ADD_FILTERS:
      return unionBy(state, action.payload, 'id')
    case REMOVE_FILTERS:
      return pullAllBy(state, action.payload, 'id')
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  notes,
  filters,
})
