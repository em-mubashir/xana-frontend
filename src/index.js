import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/styles/tailwind.css'

// layouts

import Admin from 'layouts/Admin.js'
import Auth from 'layouts/Auth.js'
import ReportForm from './components/Report/ReportForm'

// views without layouts

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      {/* <Route path='/admin' component={Admin} /> */}
      {/* <Route path='/auth' component={Auth} /> */}
      {/* add routes without layouts */}
      {/* <Route path='/' exact component={Auth} /> */}
      {/* add redirect for first page */}
      <Route path="/" exact component={ReportForm} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
