import React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'

import Action from './Action'

const ActionBar = styled.div`
  position: absolute;
  left: 0;
  right: 0; bottom: 1em;

  text-align: center;
  pointer-events: auto;

  transition: bottom .2s ease-in-out;

  ${props => props.disabled && css`
    bottom: -10em;
  `}
`

const mapStateToProps = state => ({
  isPlayerTurn: true,
})

export default connect(
  mapStateToProps
)(({ isPlayerTurn }) => (
  <ActionBar disabled={!isPlayerTurn}>
    <Action name="MOVE" />
    <Action name="ACT" />
    <Action name="END_TURN" />
  </ActionBar>
))
