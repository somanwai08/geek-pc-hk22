import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { hasToken } from 'ultis/localstorage'

export default class AuthRoute extends Component {
  render() {
    console.log(this.props, 'authroute this props')
    const { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={(props) => {
          console.log(props, 'routes props')
          if (hasToken()) {
            return <Component {...props}></Component>
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location.pathname },
                }}
              ></Redirect>
            )
          }
        }}
      ></Route>
    )
  }
}
