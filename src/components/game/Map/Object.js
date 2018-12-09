import React from 'react'
import styled from 'styled-components'

import { Fighter, Tree } from 'components/game/objects'

import { TILE_SIZE } from './'

export const MAP_OBJECT_TYPES = {
  FIGHTER: 0,
  TREE: 1,
}

const renderObject = (type, props) => {
  switch (type) {
    case MAP_OBJECT_TYPES.FIGHTER:
      return <Fighter {...props} />
    case MAP_OBJECT_TYPES.TREE:
      return <Tree {...props} />
    default:
      return null
  }
}

const MapObject = styled.div`
  position: absolute;
  left: ${props => (props.position.x + .5) * TILE_SIZE}px;
  top: ${props => (props.position.y + .5) * TILE_SIZE}px;

  z-index: ${props => props.position.x + props.position.y};

  width: 0;
  height: 0;

  transform: rotate(-45deg) scale(1, 2);

  transition-property: left, top;
  transition-duration: .2s;
  transition-timing-function: ease-in-out;

  ${'' /* &::before {
    pointer-events: none;
    content: '';

    position: absolute;
    left: 0; top: -1em;

    border: 1em solid transparent;
    border-right-width: 0;
    border-left: 4em solid purple;

    transform-origin: 0 50%;
    transform: scale(1, .5) rotate(${props => 45 + 90*props.direction}deg);
    transform: rotate(${props => 90*props.direction}deg);

    transition: transform .2s ease-in-out;
  } */}
`

export default ({ type, position, direction, ...rest }) =>  (
  <MapObject position={position} direction={direction}>
    {renderObject(type, { position, direction, ...rest })}
  </MapObject>
)
