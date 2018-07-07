import { connect } from 'react-redux'
import styled, { css } from 'styled-components'

import { getConnectedSides } from 'selectors/map'
import { TILE_SIZE } from './'

const Tile = styled.div.attrs({
  style: ({position}) => ({
    left: `${position.x * TILE_SIZE}px`,
    top: `${position.y * TILE_SIZE}px`,
  })
})`
  position: absolute;

  width: ${_ => TILE_SIZE}px;
  height: ${_ => TILE_SIZE}px;

  border-radius: 2em;
  box-shadow:
    0 0 0 .02em #8BC34A,
    0.5em 0.5em #1B5E20,
    1.0em 1.0em rgba(0, 0, 0, .25),
    1.5em 1.5em rgba(0, 0, 0, .125);

  background-color: #8BC34A;

  transform: translate(-.5em, -.5em);

  ${props => props.connections.left && css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  `}

  ${props => props.connections.top && css`
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  `}

  ${props => props.connections.right && css`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `}

  ${props => props.connections.bottom && css`
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
`

const mapStateToProps = (state, ownProps) => ({
  connections: getConnectedSides(state, ownProps)
})

export default connect(
  mapStateToProps
)(Tile)
