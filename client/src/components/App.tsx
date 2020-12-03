import React from "react"
import { Router, Route } from "react-router-dom"

import Header from "./Header"
import StreamCreate from "../components/streams/StreamCreate"
import StreamEdit from "../components/streams/StreamEdit"
import StreamList from "../components/streams/StreamList"
import StreamDelete from "../components/streams/StreamDelete"
import StreamShow from "../components/streams/StreamShow"
import history from "../history"

function App() {
  return (
    <div className="ui container">
      <Router history={history}>
        <>
          <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete/:id" exact component={StreamDelete} />
          <Route path="/streams/show" exact component={StreamShow} />
        </>
      </Router>
    </div>
  )
}

export default App
