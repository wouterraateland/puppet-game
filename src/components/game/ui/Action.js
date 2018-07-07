import React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'

import { choseAction } from 'ducks/game/battle'
import { isActionExecuted } from 'selectors/battle'

const Action = styled.div`
  display: inline-block;
  width: 4em;
  height: 4em;
  margin: 0 1em;

  border-radius: 2em;

  line-height: 4em;

  background-color: #000;
  color: #fff;

  ${props => props.disabled && css`
    opacity: .5;
  `}
`

const mapStateToProps = (state,props) => ({
  disabled: isActionExecuted(state,props.name),
})

const mapDispatchToProps = (dispatch, props) => ({
  onClick: () => dispatch(choseAction(props.name)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ name, icon, onClick, disabled }) => (
  <Action onClick={disabled ? () => {} : onClick} disabled={disabled}>{name}</Action>
))
