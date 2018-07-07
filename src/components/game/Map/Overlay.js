import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import MovementPath from './MovementPath'
import MovementOption from './MovementOption'

import { editMovementPathRequest } from 'ducks/game/movementPath'
import { getPossibleLocations } from 'selectors/battle'
import { getMovementPath } from 'selectors/movementPath'

const MapOverlay = ({ isMoving, locations, movementPath, onMouseEnter }) => (
  <div>
    {isMoving
      ? locations.map((position, i) => (
        <MovementOption
          key={i}
          position={position}
          onMouseEnter={movementPath.length ? onMouseEnter(position) : _.noop} />
      ))
      : null}
    <MovementPath path={movementPath} />
  </div>
)

const mapStateToProps = (state) => ({
  isMoving: state.game.battle.chosenAction === "MOVE",
  locations: getPossibleLocations(state),
  movementPath: getMovementPath(state),
})

const mapDispatchToProps = (dispatch) => ({
  onMouseEnter: position => () => dispatch(editMovementPathRequest(position)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapOverlay)
