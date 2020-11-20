//import { Action } from "redux"

export const SIGN_IN = "SIGN_IN"
export const SIGN_OUT = "SIGN_OUT"

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

export type AuthActions = SignInAction | SignOutAction
