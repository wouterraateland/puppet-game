import React from 'react'
import { connect } from 'react-redux'
import Character from 'components/game/Character'

import * as MovementPath from 'ducks/game/movementPath'

const teamColors = [
  '#f00',
  '#00f',
]

const Fighter = ({ direction, properties, onMouseDown }) => (
  <div onMouseDown={onMouseDown}>
    <Character
      stats={properties.character}
      color={teamColors[properties.team]}
      direction={direction}
    />
  </div>
)

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMouseDown: (event) => {
    event.preventDefault()
    dispatch(MovementPath.start(ownProps.position))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fighter)
