import React from 'react'

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

const MapObject = ({ type, position, direction, ...rest }) =>  (
  <div
    className={`Map-object direction-${direction}`}
    style={{
      left: (position.x + .5) * TILE_SIZE,
      top: (position.y + .5) * TILE_SIZE,
    }}
  >
    {renderObject(type, { position, direction, ...rest })}
  </div>
)

export default MapObject
