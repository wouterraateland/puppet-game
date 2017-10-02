import React from 'react'
import { Route } from 'react-router'
import './styles.css'

import HomePage from 'pages/Home'

const App = () => (
  <div className="App">
    <Route path="/" exact component={HomePage} />
  </div>
)

export default App
