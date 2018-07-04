import React from 'react'
import styled from 'styled-components'

import Action from './Action'

const ActionBar = styled.div`
  position: absolute;
  left: 0;
  right: 0; bottom: 1em;

  text-align: center;
`

export default ({ move, takeAction, endTurn}) => (
  <ActionBar>
    <Action name="Move" onClick={move} />
    <Action name="Act" onClick={takeAction} />
    <Action name="End turn" onClick={endTurn} />
  </ActionBar>
)
