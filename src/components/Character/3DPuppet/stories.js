import React from 'react'
import { storiesOf } from '@storybook/react'
import Puppet from './'

import decorateWithScene from 'stories/Scene'

storiesOf('Character/Puppet', module)
  .addDecorator(decorateWithScene)
  .add('Plain 3D puppet', () => <Puppet name="Bert" />)
  .add('Idle 3D puppet', () => <Puppet name="Rudolf" idle />)
  .add('Rotated 3D puppet', () => <Puppet name="Rudolf" idle direction={90} />)
