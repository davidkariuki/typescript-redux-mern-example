import history from "../history"
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
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
    payload: "",
  }
}

export const createStream = (formValues: Stream): AppThunk => async (
  dispatch,
  getState
) => {
  const { userId } = getState().auth
  const response = await streams.post("/streams", { ...formValues, userId })

  dispatch({ type: CREATE_STREAM, payload: response.data })
  history.push("/")
}

export const fetchStreams = (): AppThunk => async (dispatch) => {
  const response = await streams.get("/streams")

  dispatch({ type: FETCH_STREAMS, payload: response.data })
}

export const fetchStream = (id: string): AppThunk => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`)

  dispatch({ type: FETCH_STREAM, payload: response.data })
}

export const editStream = (id: string, formValues: Stream): AppThunk => async (
  dispatch
) => {
  const response = await streams.patch(`/streams/${id}`, formValues)

  dispatch({ type: EDIT_STREAM, payload: response.data })
  history.push("/")
}

export const deleteStream = (id: string): AppThunk => async (dispatch) => {
  await streams.delete(`/streams/${id}`)

  dispatch({ type: DELETE_STREAM, payload: id })
  history.push("/")
}
