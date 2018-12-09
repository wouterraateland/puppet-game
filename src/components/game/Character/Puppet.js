import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { lighten, darken } from 'utilities/styles'

const Puppet = styled.div`
  position: absolute;
  left: 50%; bottom: 0;

  transform: translate(0, -.5em);
`

const Sphere = styled.div.attrs({
  style: ({x=0,y=0,z=0,direction=0}) => {
    const xp = Math.cos(direction)
    const yp = -Math.sin(direction)
    return {
      transform:
        `translate(${x*xp + y*yp}em, ${(-x*yp + y*xp - z) / 2}em)
        translate(-50%, -50%)`,
      zIndex: Math.round(100 - x*yp + y*xp + z)
    }
  }
})`
  position: absolute;
  left: 0; top: 0;

  width: ${props => props.size}em;
  height: ${props => props.size}em;

  border-radius: 100%;
  ${({color='#fff'}) => css`background-image:
    radial-gradient(circle at 33% 33%, ${lighten(color, 20)}, ${color}, ${darken(color, 20)});
  `}

  transform-origin: 50% 50%;
`

const bounce = amount => keyframes`
  to { transform: translateY(${amount/2}em); }
`

const BounceZ = styled.div`
  ${({delay=0,duration=1,amount=0}) => css`
    animation: ${bounce(amount)} ${duration}s ease-in-out infinite alternate;
    animation-delay: ${delay}s;
  `}
`

const Foot = props => <Sphere {...props} size={.5} z={-.125} />
const LeftFoot = props => <Foot {...props} x={-.5} />
const RightFoot = props => <Foot {...props} x={.5} />

const Body = props => <Sphere {...props} size={2} z={1.25} />

const Hand = props => <Sphere {...props} size={.5} z={1} />
const LeftHand = props => <Hand {...props} x={-1.125} />
const RightHand = props => <Hand {...props} x={1.125} />

const Head = ({direction,...rest}) => (
  <BounceZ amount={.125} delay={.2}>
    <Sphere {...rest} size={1.5} z={2.75}/>
    <Sphere size={.25} x={-.25} y={.75} z={2.75} direction={direction} color="#000" />
    <Sphere size={.25} x={.25} y={.75} z={2.75} direction={direction} color="#000" />
  </BounceZ>
)

export default ({direction}) => (
  <Puppet>
    <LeftFoot direction={(direction - .5) * Math.PI / 2} />
    <RightFoot direction={(direction - .5) * Math.PI / 2} />
    <BounceZ amount={.125}>
      <Body direction={(direction - .5) * Math.PI / 2} />
      <Head direction={(direction - .5) * Math.PI / 2} />
      <BounceZ amount={.125} delay={.1}>
        <LeftHand direction={(direction - .5) * Math.PI / 2} />
      </BounceZ>
      <BounceZ amount={.125} delay={.1}>
        <RightHand direction={(direction - .5) * Math.PI / 2} />
      </BounceZ>
    </BounceZ>
  </Puppet>
)
