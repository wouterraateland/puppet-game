import React from 'react'

import { Page } from 'components/lib'
import { Link } from 'react-router-dom'

export default () => (
  <Page>
    <h1>Puppet Game</h1>
    <Link to="/play">Start Game</Link>
  </Page>
)
