import React from 'react'
import styled from 'styled-components'

import { AbsCenter } from 'components/lib'

const Compass = styled.div`
  position: absolute;
  top: 2em;
  right: 2em;

  width: 4em;
  height: 4em;

  border-radius: 100%;

  box-shadow:
    0.5em 0.5em #880e4f,
    1.0em 1.0em rgba(0, 0, 0, 0.25),
    1.5em 1.5em rgba(0, 0, 0, 0.125);

  background-color: #f44336;
  color: #fff;

  transform: translate(-.5em, -.5em);
`

const CompassDirection = AbsCenter.extend`
  width: 1.5em;
  height: 1.5em;
  padding: .25em;

  text-align: center;
  font-weight: bold;
`

const North = CompassDirection.extend`bottom: auto;`
const East  = CompassDirection.extend`left:   auto;`
const South = CompassDirection.extend`top:    auto;`
const West  = CompassDirection.extend`right:  auto;`

export default () => (
  <Compass>
    <North>N</North>
    <East>E</East>
    <South>S</South>
    <West>W</West>
  </Compass>
)
