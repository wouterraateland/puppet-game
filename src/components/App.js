import React from 'react'
import { Switch, Route } from 'react-router'

import HomePage from 'pages/Home'
import GamePage from 'pages/Game'

const App = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/play" exact component={GamePage} />
  </Switch>
)

export default App
