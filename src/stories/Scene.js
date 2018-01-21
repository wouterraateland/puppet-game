import React from 'react'
import React3 from 'react-three-renderer'
import * as THREE from 'three'

class Scene extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      scenePosition: THREE.Vector3(0, 0, 0),
      timer: Date.now() / 1000
    }

    this.onAnimate = this.onAnimate.bind(this)
  }

  onAnimate() {
    this.setState({
      scenePosition: new THREE.Vector3(0, 0, 0),
      timer: Date.now() / 1000,
    })
  }

  render() {
    const { width, height, story } = this.props
    const { scenePosition, timer } = this.state

    const cameraPosition = new THREE.Vector3(
      100 * Math.cos(timer),
      50,
      100 * Math.sin(timer)
    )

    const lightPosition = new THREE.Vector3(400, 400, 400)

    return (
      <React3
        mainCamera="camera"
        width={window.innerWidth}
        height={window.innerHeight}

        onAnimate={this.onAnimate}
      >
        <resources>
          <texture
            resourceId="cloth_texture"
            url="../../assets/textures/cloth.jpg"
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
            anisotropy={16}
          />
          <meshLambertMaterial
            resourceId="cloth"
          >
            <textureResource resourceId="cloth_texture" />
          </meshLambertMaterial>
          <meshPhongMaterial
            resourceId="blackPlastic"
            color={0x444444} />
        </resources>
        <scene>
          <orthographicCamera
            name="camera"
            left={-width / 2}
            top={height / 2}
            right={width / 2}
            bottom={-height / 2}
            near={0}
            far={2000}

            position={cameraPosition}
            lookAt={scenePosition}
          />
          <ambientLight color={0x606040} />
          <directionalLight
            color={0xaaaaaa}
            position={lightPosition}
            lookAt={scenePosition}
          />
          {story()}
          <axisHelper
            position={scenePosition}
            size={100}
          />
        </scene>
      </React3>
    )
  }
}

const decorateWithScene = story => (
  <Scene
    width={window.innerWidth}
    height={window.innerHeight}
    story={story}
  />
)

export default decorateWithScene
