import React from 'react'

import { Page } from 'components/lib'

import Camera from 'components/game/Camera'
import Map from 'components/game/Map'
import HeadsUpDisplay from 'components/game/ui/HeadsUpDisplay'

const GamePage = Page.extend`
  background-image: linear-gradient(#FFF176, #FFFDE7);
`

export default () => (
  <GamePage>
    <Camera>
      <Map />
    </Camera>
    <HeadsUpDisplay />
  </GamePage>
)
