import { IDX as _IDX } from '@ceramicstudio/idx'
import { ThreeIdConnect } from '3id-connect'
import ceramic from './ceramic'

const schemaOwner = 'did:key:z6MkgTar9aC1bYSWgZd4goo17LayCjbR1h2wjJhoSYaV6zhf'
const orgOwner =
  'did:3:kjzl6cwe1jw1491brjhid8jl31hiyyf3ggxq8pv9qhz2zn9c8ml24vostu6w7cv'
const aliases = {
  organization:
    'kjzl6cwe1jw148u9qxkp7caz7jtrz2p7pt7icathzvsruktb7xxq715vlrm4wsn',
}

class IDX {
  constructor() {
    this.instance = new _IDX({ ceramic, aliases })
    this.threeIdConnect = new ThreeIdConnect()
    window.ix = this.instance
  }

  async createOrganization({ name }) {
    const resp = await this.instance.set('organization', {
      name,
    })
  }

  async loadOrganizationDocs() {
    return await this.instance.getIndex(orgOwner)
  }
}

export default IDX
