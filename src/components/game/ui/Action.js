import React from 'react'
import styled from 'styled-components'

const Action = styled.div`
  display: inline-block;
  width: 4em;
  height: 4em;
  margin: 0 1em;

  border-radius: 2em;

  line-height: 4em;

  background-color: #000;
  color: #fff;
`

export default ({ name, icon, onClick }) => (
  <Action onClick={onClick}>{name}</Action>
)
