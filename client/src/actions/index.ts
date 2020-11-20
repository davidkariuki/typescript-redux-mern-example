import { SIGN_IN, SIGN_OUT, AuthActions } from "../types"

export const signIn = (userId: string): AuthActions => {
  return {
    type: SIGN_IN,
    payload: userId,
  }
}

export const signOut = (): AuthActions => {
  return {
    type: SIGN_OUT,
  }
}
