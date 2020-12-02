import _ from "lodash"

import {
  StreamsState,
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  StreamActions,
} from "../types"

const streamReducer = (
  state: StreamsState = {},
  action: StreamActions
): StreamsState => {
  switch (action.type) {
    case FETCH_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_STREAM:
      return _.omit(state, action.payload)
    case FETCH_STREAMS:
      return { ...state, ...(_.mapKeys(action.payload, "id") as any) }
    default:
      return state
  }
}

export default streamReducer
