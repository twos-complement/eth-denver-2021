import { IDX as _IDX } from '@ceramicstudio/idx'
import { ThreeIdConnect } from '3id-connect'
import ceramic from './ceramic'

const aliases = {
  businessProfile:
    'ceramic://k3y52l7qbv1frxk9ijwxoej9208ujtmqu6fpbjklvj6jyi3p0ogln9q8uhf7qzncw',
}
class IDX {
  constructor() {
    this.instance = new _IDX({ ceramic, aliases })
    this.threeIdConnect = new ThreeIdConnect()
  }
}

export default IDX
