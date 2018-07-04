import React from 'react'
import { connect } from 'react-redux'
import './styles.css'

import { getMapTiles, getMapObjects } from 'selectors/map'
import Compass from './Compass'
import MapTile from './Tile'
import MapOverlay from './Overlay'
import MapObject from './Object'

export const TILE_SIZE = 64
const MAP_WIDTH = 8
const MAP_HEIGHT = 8

export const Map = ({tiles, objects}) => (
  <div
    className="Map"
    style={{
      width: MAP_WIDTH * TILE_SIZE,
      height: MAP_HEIGHT * TILE_SIZE,
    }}
  >
    <Compass />
    {tiles.map((props, i) => (<MapTile key={i} {...props} />))}
    <MapOverlay />
    {objects.map((props, i) => (<MapObject key={i} {...props} />))}
  </div>
)

const mapStateToProps = (state) => ({
  tiles: getMapTiles(state),
  objects: getMapObjects(state),
})

export default connect(
  mapStateToProps
)(Map)
