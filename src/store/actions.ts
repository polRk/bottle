import { Action } from 'redux'

export interface IAction<T = any> extends Action<string> {
  payload: T
}

export const LOAD_NOTES = 'LOAD_NOTES'
export const LOAD_FILTERS = 'LOAD_FILTERS'
export const ADD_FILTERS = 'ADD_FILTERS'
export const REMOVE_FILTERS = 'REMOVE_FILTERS'

export const addNotes = (notes: any[]): IAction => {
  return {
    type: LOAD_NOTES,
    payload: notes,
  }
}
