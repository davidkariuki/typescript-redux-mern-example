import { AuthState, AuthActions, SIGN_IN, SIGN_OUT } from "../types"

const initialState: AuthState = {
  isSignedIn: false,
  userId: "",
}

const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload }
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: "" }
    default:
      return state
  }
}

export default authReducer
