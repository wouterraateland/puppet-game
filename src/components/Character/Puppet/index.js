import React from 'react'
import './styles.css'

import classNames from 'classnames'

const Puppet = ({ name, idle }) => (
  <div className={classNames('Puppet', { idle })}>
    <div className="Puppet-foot" />
    <div className="Puppet-hand" />
    <div className="Puppet-body" />
    <div className="Puppet-foot" />
    <div className="Puppet-hand" />
    <div className="Puppet-head" />
  </div>
)

export default Puppet
