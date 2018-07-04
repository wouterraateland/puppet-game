import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { getConnectedSides } from 'selectors/map'
import { TILE_SIZE } from './'

const Tile = ({ position, connections=[] }) => (
  <div
    className={classNames('Map-tile', ...connections)}
    style={{
      left: position.x * TILE_SIZE,
      top: position.y * TILE_SIZE,
      width: TILE_SIZE,
      height: TILE_SIZE,
    }}
  />
)

const mapStateToProps = (state, ownProps) => ({
  connections: getConnectedSides(state, ownProps)
})

export default connect(
  mapStateToProps
)(Tile)
