import React from 'react'
import { AbsCenter } from 'components/lib'

import TurnOrder from './TurnOrder'
import ActionBar from './ActionBar'

const HeadsUpDisplay = AbsCenter.extend`
  pointer-events: none;
`

export default () => (
  <HeadsUpDisplay>
    <TurnOrder />
    <ActionBar />
  </HeadsUpDisplay>
)
