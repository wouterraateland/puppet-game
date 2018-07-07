import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import Character from 'components/game/Character'

import { startMovementPath } from 'ducks/game/movementPath'
import { isCurrentFighter } from 'selectors/battle'

const teamColors = [
  '#f00',
  '#00f',
]

const Fighter = ({ active, direction, properties, onMouseDown }) => (
  <div onMouseDown={active ? onMouseDown : _.noop}>
    <Character
      stats={properties.character}
      color={teamColors[properties.team]}
      direction={direction}
    />
  </div>
)

const mapStateToProps = (state, props) => ({
  active: isCurrentFighter(state, props.id) && state.game.battle.chosenAction === "MOVE",
})

const mapDispatchToProps = (dispatch, {position}) => ({
  onMouseDown: (event) => {
    event.preventDefault()
    dispatch(startMovementPath(position))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fighter)
