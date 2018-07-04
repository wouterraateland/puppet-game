export default class Vec3 {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  sub = (v) => new Vec3(this.x - v.x, this.y - v.y, this.z - v.z)

  getLength = () => Math.sqrt(
    Math.pow(this.x, 2) +
    Math.pow(this.y, 2) +
    Math.pow(this.z, 2)
  )

  distance = (v) => this.sub(v).getLength()

  equals = (v) => (
    this.x === v.x &&
    this.y === v.y &&
    this.z === v.z
  )
}
