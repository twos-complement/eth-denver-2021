import { IDX as _IDX } from '@ceramicstudio/idx'
import { schemas } from './ceramic-config.json'

// TODO: abstract to config:
const SOCDID =
  'did:3:kjzl6cwe1jw147bgidx8l6ts9xdtvpiu5s9jh4k505tk052uwlw8fr8zkp7tuyh'

class IDX {
  constructor({ ceramic, aliases }) {
    this.instance = new _IDX({ ceramic, aliases })
    this.ceramic = ceramic
    this.aliases = aliases
  }

  async addOrganizationToList({ name }) {
    let current = await this.loadOrganizationList()

    // Create Organization on Ceramic:
    const orgDoc = await this.ceramic.createDocument('tile', {
      content: { name },
      metadata: {
        schema: schemas.Organization,
        controllers: [SOCDID],
      },
    })

    // Set reference to Organization in "organizations" on SoC idx index:
    const orgListDoc = await this.instance.set('organizations', {
      organizations: [...current, { name }],
    })

    return orgListDoc
  }

  async loadOrganizationList() {
    // Load organizations list from SoC index:
    const data = await this.instance.get('organizations', SOCDID)
    if (!data) return []
    return data.organizations
  }
}

export default IDX
