import { IDX as _IDX } from '@ceramicstudio/idx'

// TODO: abstract to config:
const orgOwner =
  'did:3:kjzl6cwe1jw147v2nmms5cka2qxvi4vylfolzuq4sk4rwn3l9t0mhxrlt1qiltp'

class IDX {
  constructor({ ceramic, aliases }) {
    this.instance = new _IDX({ ceramic, aliases })
  }

  async createOrganization({ name }) {
    const docid = await this.instance.set('organization', {
      name,
    })
    return docid
  }

  async loadOrganizationDocs() {
    return await this.instance.getIndex(orgOwner)
  }
}

export default IDX
