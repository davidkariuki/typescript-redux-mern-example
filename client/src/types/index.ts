import { Action } from "redux"
import { ThunkAction } from "redux-thunk"

import { RootState } from "../reducers"

export const SIGN_IN = "SIGN_IN"
export const SIGN_OUT = "SIGN_OUT"
export const CREATE_STREAM = "CREATE_STREAM"
export const FETCH_STREAMS = "FETCH_STREAMS"
export const FETCH_STREAM = "FETCH_STREAM"
export const EDIT_STREAM = "EDIT_STREAM"
export const DELETE_STREAM = "DELETE_STREAM"

export interface AuthState {
  isSignedIn: boolean
  userId: string
}

export interface AuthActions {
  type: typeof SIGN_OUT | typeof SIGN_IN
  payload: string
}

interface DefaultStreamActions {
  type:
    | typeof CREATE_STREAM
    | typeof FETCH_STREAM
    | typeof FETCH_STREAMS
    | typeof EDIT_STREAM
  payload: Stream
}

interface DeleteStreamAction {
  type: typeof DELETE_STREAM
  payload: string
}

export type StreamActions = DefaultStreamActions | DeleteStreamAction

export interface Stream {
  id: string
  userId: string
  title: string
  description: string
}

export interface StreamsState {
  [index: string]: Stream
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
