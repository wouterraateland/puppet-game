import React from 'react'

import * as THREE from 'three'
import React3 from 'react-three-renderer'

const ClothSphere = ({position, radius}) => (
  <mesh
    position={new THREE.Vector3(...position)}
  >
  <sphereGeometry
    radius={radius}
    widthSegments={10}
    heightSegments={8}
  />
  <materialResource resourceId="cloth" />
</mesh>)

const ClothButton = ({position, rotation}) => (
  <mesh
    position={new THREE.Vector3(...position)}
    rotation={new THREE.Euler(...rotation)}
  >
  <extrudeGeometry
    amount={0.2}
    bevelSize={0.2}
    bevelThickness={1}>
    <shape>
      <moveTo x={10} y={0}/>
      <quadraticCurveTo cpX={10} cpY={10} x={0} y={10} />
      <quadraticCurveTo cpX={-10} cpY={10} x={-10} y={0} />
      <quadraticCurveTo cpX={-10} cpY={-10} x={0} y={-10} />
      <quadraticCurveTo cpX={10} cpY={-10} x={10} y={0} />
    </shape>
  </extrudeGeometry>
  <materialResource resourceId="blackPlastic" />
</mesh>)

/**
 * PUPPET STATES:
 * sitting
 * standing
 * walking
 * dead
 */

const Puppet = ({ name, state }) => (
  <group
    position={new THREE.Vector3(0, 0, 0)}
    rotation={new THREE.Euler(0, 0, 0)}
  >
    <ClothSphere position={[0, 70, 0]} radius={40}/>
    <ClothSphere position={[0, 20, 0]} radius={25}/>

    <ClothButton position={[-14, 70, 40]} rotation={[0, -5*2*Math.PI/180, 0]}/>
    <ClothButton position={[ 14, 70, 40]} rotation={[0,  5*2*Math.PI/180, 0]}/>

    <ClothSphere position={[-25, 20, 10]} radius={10}/>
    <ClothSphere position={[ 25, 20, 10]} radius={10}/>

    <ClothSphere position={[-10, 0, 20]} radius={10}/>
    <ClothSphere position={[ 10, 0, 20]} radius={10}/>
  </group>
)

export default Puppet
