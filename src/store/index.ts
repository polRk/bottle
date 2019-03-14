import { createStore } from 'redux'
import { rootReducer } from './reducers'

export interface INote {}

export interface IFilter {
  id: number
  color: number
}

export interface IState {
  notes: INote[]
  filters: IFilter[]
}

export const state: IState = {
  notes: [],
  filters: [],
}

const store = createStore(rootReducer, {
  notes: [],
  filters: [],
})
