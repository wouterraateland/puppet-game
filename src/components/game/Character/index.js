import React from 'react'
import { connect } from 'react-redux'
import './styles.css'

import { getCharacterById } from 'selectors/characters'

const Character = ({ color, direction, stats={} }) => (
  <div
    className="Character"
    style={{backgroundColor: color}}
  >
    <span className="Character-name">{stats.name || 'unknown'} ({direction})</span>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  ...getCharacterById(state, ownProps)
})

export default connect(
  mapStateToProps
)(Character)
