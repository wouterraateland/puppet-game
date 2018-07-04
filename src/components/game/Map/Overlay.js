import React from 'react'
import { connect } from 'react-redux'

import * as movementPath from 'ducks/game/movementPath'
import { getCurrentMovementOptions } from 'selectors/fighters'
import { getMovementPath } from 'selectors/movementPath'

import { TILE_SIZE } from './'

const MapOverlay = ({ options, movementPath, onMouseEnter }) => (
  <div className="Map-overlay">
    {options.map((position, i) => (
      <div
        key={i}
        className={'Map-overlay-tile'}
        style={{
          left: position.x * TILE_SIZE,
          top: position.y * TILE_SIZE,
          width: TILE_SIZE,
          height: TILE_SIZE,
        }}
        onMouseEnter={movementPath.length
          ? onMouseEnter(position) : null}
      />
    ))}
    {movementPath.map((position, i) => (
      <div
        key={i}
        className={'Map-movement-path'}
        style={{
          left: position.x * TILE_SIZE,
          top: position.y * TILE_SIZE,
          width: TILE_SIZE,
          height: TILE_SIZE,
        }}
      />
    ))}
  </div>
)

const mapStateToProps = (state) => ({
  options: getCurrentMovementOptions(state),
  movementPath: getMovementPath(state),
})

const mapDispatchToProps = (dispatch) => ({
  onMouseEnter: position => () => dispatch(movementPath.edit(position)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapOverlay)
