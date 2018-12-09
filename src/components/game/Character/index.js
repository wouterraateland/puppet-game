import { connect } from 'react-redux'

import { getCharacterById } from 'selectors/characters'

import Puppet from './Puppet'

const mapStateToProps = (state, ownProps) => ({
  ...getCharacterById(state, ownProps)
})

export default connect(
  mapStateToProps
)(Puppet)
