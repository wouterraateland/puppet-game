import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { getMapTiles, getMapObjects, getMapSize } from 'selectors/map'

import Compass from './Compass'
import Tile from './Tile'
import Overlay from './Overlay'
import MapObject from './Object'

export const TILE_SIZE = 64

const Map = styled.div`
  position: absolute;
  left: 50%; top: 50%;

  width: ${props => props.size.width * TILE_SIZE}px;
  height: ${props => props.size.height * TILE_SIZE}px;

  border-radius: 2em;

  background-color: #03a9f4;

  transform: translate(-50%, -50%) scale(1, .5) rotate(45deg);

  &::after {
    pointer-events: none;
    content: '';

    position: absolute;
    left: 0; top: 0;
    right: 0; bottom: 0;

    border-radius: 2em;

    box-shadow:
      0.5em 0.5em rgba(0, 0, 0, 0.75),
      1.0em 1.0em rgba(0, 0, 0, 0.50),
      1.5em 1.5em rgba(0, 0, 0, 0.25);
  }
`

const mapStateToProps = (state) => ({
  tiles: getMapTiles(state),
  objects: getMapObjects(state),
  size: getMapSize(state),
})

export default connect(
  mapStateToProps
)(({size, tiles, objects}) => (
  <Map size={size}>
    <Compass />
    {tiles.map((props, i) => (<Tile key={i} {...props} />))}
    <Overlay />
    {objects.map((props, i) => (<MapObject key={i} {...props} />))}
  </Map>
))
