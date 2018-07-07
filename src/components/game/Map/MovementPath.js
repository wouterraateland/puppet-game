import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { TILE_SIZE } from './'

const MovementPath = styled.svg`
  pointer-events: none;
  position: absolute;
  left: 0; top: 0;

  width: 100%;
  height: 100%;

  transform: translate(-.5em, -.5em);

  opacity: .5;

  stroke: purple;
  stroke-width: 1em;
  stroke-linecap: round;
  stroke-linejoin: round;

  fill: transparent;
`

const mapStateToProps = (_,{path}) => ({
  path: path
    .map(({x,y}) => `${(x + 0.5) * TILE_SIZE},${(y + 0.5) * TILE_SIZE}`)
    .join(' ')
})

export default connect(
  mapStateToProps
)(({ path }) => (<MovementPath>
  <polyline points={path} />
</MovementPath>))
