import React from "react"
import { Route, Redirect } from "react-router-dom"
import { auth } from "../../api/firebase"

export default function PrivateRoute({ component: Component, ...rest }) {
  var currentUser = auth.currentUser

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/" />
      }}
    ></Route>
  )
}