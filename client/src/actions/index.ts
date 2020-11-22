import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  AuthActions,
  AppThunk,
  Stream,
} from "../types"
import streams from "../apis/streams"

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

export const createStream = (formValues: Stream): AppThunk => async (
  dispatch
) => {
  const response = await streams.post("/streams", formValues)

  dispatch({ type: CREATE_STREAM, payload: response.data })
}
