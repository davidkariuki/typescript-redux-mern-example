import React from "react"
import { BrowserRouter, Route } from "react-router-dom"

import Header from "./Header"
import StreamCreate from "../components/streams/StreamCreate"
import StreamEdit from "../components/streams/StreamEdit"
import StreamList from "../components/streams/StreamList"
import StreamDelete from "../components/streams/StreamDelete"
import StreamShow from "../components/streams/StreamShow"

function App() {
  return (
    <div className="ui container">
      <BrowserRouter>
        <>
          <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit" exact component={StreamEdit} />
          <Route path="/streams/delete" exact component={StreamDelete} />
          <Route path="/streams/show" exact component={StreamShow} />
        </>
      </BrowserRouter>
    </div>
  )
}

export default App
