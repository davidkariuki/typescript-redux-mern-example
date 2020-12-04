import React, { FC, useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { Link, RouteComponentProps } from "react-router-dom"

import { deleteStream, fetchStream } from "../../actions"
import Modal from "../Modal"
import history from "../../history"
import { RootState } from "../../reducers"

type TParams = {
  id: string
}

const StreamDelete: FC<StreamDeleteProps & RouteComponentProps<TParams>> = ({
  fetchStream,
  deleteStream,
  stream,
  match: {
    params: { id },
  },
}) => {
  useEffect(() => {
    fetchStream(id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const renderContent = () => {
    if (!stream) {
      return "Are you sure you want to delete this stream?"
    }

    return `Are you sure you want to delete the stream titled ${stream.title}?`
  }
  const renderActions = () => {
    return (
      <>
        <button onClick={() => deleteStream(id)} className="ui button negative">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    )
  }

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push("/")}
    />
  )
}

const mapState = (state: RootState, ownProps: RouteComponentProps<TParams>) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

const connector = connect(mapState, { fetchStream, deleteStream })
type StreamDeleteProps = ConnectedProps<typeof connector>

export default connector(StreamDelete)
