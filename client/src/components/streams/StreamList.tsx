import React, { FC, useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { Stream } from "../../types"

import { fetchStreams } from "../../actions"
import { RootState } from "../../reducers"
import { Link } from "react-router-dom"

const StreamList: FC<StreamListProps> = ({
  isSignedIn,
  userId,
  streams,
  fetchStreams,
}) => {
  useEffect(() => {
    fetchStreams()
  }, [fetchStreams])

  const renderAdmin = (stream: Stream) => {
    if (stream.userId === userId) {
      return (
        <div className="right floated content">
          <button className="ui button primary">Edit</button>
          <button className="ui button negative">Delete</button>
        </div>
      )
    }
  }

  const renderList = () => {
    return streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {renderAdmin(stream)}
          <i className="large middle aligned icon camera"></i>
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      )
    })
  }

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      )
    }
  }

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  )
}

const mapState = (state: RootState) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    streams: Object.values(state.streams),
  }
}

const connector = connect(mapState, { fetchStreams })
type StreamListProps = ConnectedProps<typeof connector>

export default connector(StreamList)
