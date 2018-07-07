import styled, { keyframes } from 'styled-components'

import { TILE_SIZE } from './'

const rotate = keyframes`
  to { transform: rotate(360deg); }
`

const MovementOption = styled.div`
  position: absolute;
  left: ${props => props.position.x * TILE_SIZE}px;
  top: ${props => props.position.y * TILE_SIZE}px;

  width: ${TILE_SIZE}px;
  height: ${TILE_SIZE}px;

  transform: translate(-.5em, -.5em);

  &::after {
    content: '';

    display: block;
    width: 3em;
    height: 3em;
    margin: .5em;

    border: .5em solid;
    border-color: #000 #fff #000 #fff;
    border-radius: 2em;

    animation: ${rotate} 8s linear infinite;
  }
`

export default MovementOption
