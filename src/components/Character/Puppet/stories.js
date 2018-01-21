import React from 'react'
import { storiesOf } from '@storybook/react'
import Puppet from './'

import decorateWithBackground from 'stories/Background'

storiesOf('Character/Puppet', module)
  .addDecorator(decorateWithBackground)
  .add('Plain puppet', () => <Puppet name="Bert" />)
  .add('Idle puppet', () => <Puppet name="Rudolf" idle />)
  .add('Rotated puppet', () => <Puppet name="Rudolf" idle direction={90} />)
