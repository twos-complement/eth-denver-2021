import { IDX as _IDX } from '@ceramicstudio/idx'
import { ThreeIdConnect } from '3id-connect'
import ceramic from './ceramic'

const aliases = {
  organization:
    'kjzl6cwe1jw148u9qxkp7caz7jtrz2p7pt7icathzvsruktb7xxq715vlrm4wsn',
}
class IDX {
  constructor() {
    this.instance = new _IDX({ ceramic, aliases })
    this.threeIdConnect = new ThreeIdConnect()
  }
}

export default IDX
