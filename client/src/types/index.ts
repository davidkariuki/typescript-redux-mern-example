import { Action } from "redux"
import { ThunkAction } from "redux-thunk"

export const SIGN_IN = "SIGN_IN"
export const SIGN_OUT = "SIGN_OUT"
export const CREATE_STREAM = "CREATE_STREAM"

export interface SignInAction {
  type: typeof SIGN_IN
  payload: string
}

export interface SignOutAction {
  type: typeof SIGN_OUT
}

export interface AuthState {
  isSignedIn: boolean | null
  userId: string | null
}

export interface Stream {
  title: string
  description: string
}

export interface StreamsSTate {
  streams: Stream
}

export type AuthActions = SignInAction | SignOutAction

type RootState = AuthState & StreamsSTate

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
