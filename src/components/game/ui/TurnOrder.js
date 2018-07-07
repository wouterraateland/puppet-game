import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { getCurrentTurn, getFighterCharactersSorted } from 'selectors/battle'

const TurnOrder = styled.div`
  position: absolute;
  left: 0; top: 1em;
  right: 0;

  margin: auto;

  overflow: hidden;

  width: 10em;
  height: 2em;
  border-radius: 2em;

  background-color: #000;
  color: #fff;
`

const TurnOrderContent = styled.div`
  width: 100%;
  height: 100%;

  white-space: nowrap;

  transform: translate(${props => 2.5 - 4.5*props.turn}em, 0);

  transition: transform .2s ease-in-out;
`

const Fighter = styled.div`
  display: inline-block;
  width: 4em;
  padding: .25em;
  margin: .25em;
  border-radius: .75em;

  text-align: center;

  background-color: #f12;
`

const mapStateToProps = state => ({
  characters: getFighterCharactersSorted(state),
  turn: getCurrentTurn(state),
})

export default connect(
  mapStateToProps
)(({characters, turn}) => (<TurnOrder>
  <TurnOrderContent turn={turn}>
    {characters.map((character,i) =>
      <Fighter key={i}>{character.name}</Fighter>
    )}
  </TurnOrderContent>
</TurnOrder>))
