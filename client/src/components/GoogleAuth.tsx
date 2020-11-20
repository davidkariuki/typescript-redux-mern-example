import React, { FC, useEffect, useState } from "react"
import { connect, ConnectedProps } from "react-redux"

import { signIn, signOut } from "../actions"
import { RootState } from "../reducers"

const mapState = (state: RootState) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  }
}

const connector = connect(mapState, { signIn, signOut })
type GoogleAuthProps = ConnectedProps<typeof connector>

const GoogleAuth: FC<GoogleAuthProps> = ({ isSignedIn, signIn, signOut }) => {
  const [auth, setAuth] = useState<any>()

  useEffect(() => {
    const onAuthChange = (isSignedIn: boolean) => {
      const _auth = window.gapi.auth2.getAuthInstance()

      if (isSignedIn) {
        signIn(_auth.currentUser.get().getId())
      } else {
        signOut()
      }
    }

    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id:
            "548552507346-9a8b4f66jlkigm9aa6ebk4v3thcnojq9.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          const _auth = window.gapi.auth2.getAuthInstance()
          onAuthChange(_auth.isSignedIn.get())
          _auth.isSignedIn.listen(onAuthChange)
          setAuth(_auth)
        })
    })
  }, [signIn, signOut])

  const onSignInClick = () => {
    auth.signIn()
  }

  const onSignOutClick = () => {
    auth.signOut()
  }

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null
    } else if (isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="ui google plus button">
          <i className="google icon" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={onSignInClick} className="ui google plus button">
          <i className="google icon" />
          Sign in with Google
        </button>
      )
    }
  }
  return <div className="item">{renderAuthButton()}</div>
}

export default connector(GoogleAuth)
