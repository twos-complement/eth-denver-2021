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

    // Set reference to Organization in "organizations" on SoC IDX index:
    const orgListDoc = await this.instance.set('organizations', {
      organizations: [...current, { id: orgDoc.id.toString() }],
    })

    return orgListDoc
  }

  async loadOrganizationList() {
    // Load organizations list from SoC index:
    const data = await this.instance.get('organizations', SOCDID)
    if (!data) return []
    return data.organizations
  }

  async loadOrganization(docId) {
    // Load organization from Ceramic:
    const data = await this.ceramic.loadDocument(docId, SOCDID)
    return data
  }

  async addReviewToList({ stars, description, organizationId }) {
    let current = await this.loadReviewsList()

    const review = {
      stars,
      description,
      organization: `ceramic://${organizationId}`,
    }

    // Create Review on Ceramic:
    const reviewDoc = await this.ceramic.createDocument('tile', {
      content: review,
      metadata: {
        schema: schemas.Review,
        controllers: [this.instance.id],
      },
    })

    // Set reference to Review in "reviews" on user's IDX index:
    const reviewListDoc = await this.instance.set('reviews', {
      reviews: [...current, review],
    })

    return reviewListDoc
  }

  async loadReviewsList() {
    // Load reviews list from user's IDX index:
    const data = await this.instance.get('reviews')
    if (!data) return []
    return data.reviews
  }
}

export default IDX
