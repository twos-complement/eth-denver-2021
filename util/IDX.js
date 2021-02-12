import { IDX as _IDX } from '@ceramicstudio/idx'
import { schemas } from './ceramic-config.json'

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
        controllers: [this.aliases.ownerDid],
      },
    })

    // Set reference to Organization in "organizations" on SoC IDX index:
    const orgListDoc = await this.instance.set('organizations', {
      organizations: [...current, { id: `ceramic://${orgDoc.id.toString()}` }],
    })

    return orgListDoc
  }

  async loadOrganizationList() {
    // Load organizations list from SoC index:
    const data = await this.instance.get('organizations', this.aliases.ownerDid)
    if (!data) return []
    return data.organizations
  }

  async loadOrganization(docId) {
    // Load organization from Ceramic:
    const data = await this.ceramic.loadDocument(docId, this.aliases.ownerDid)
    return data
  }

  async addReviewToList({
    stars,
    description,
    organization,
    imageUrl,
    videoUrl,
  }) {
    let current = await this.loadReviewsList()

    const review = {
      stars,
      description,
      organization,
      imageUrl,
      videoUrl,
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

  async addIdentityVerificationToList({ did, challenge }) {
    let current = await this.loadIdentityVerificationList()

    // Create IdentityVerification on Ceramic:
    const identityVerificationDoc = await this.ceramic.createDocument('tile', {
      content: { did, challenge },
      metadata: {
        schema: schemas.IdentityVerification,
        controllers: [this.aliases.ownerDid],
      },
    })

    // Set reference to IdentityVerification in "identityVerifications" on SoC IDX index:
    const identityVerificationListDoc = await this.instance.set(
      'identityVerifications',
      {
        identityVerifications: [
          ...current,
          { id: `ceramic://${identityVerificationDoc.id.toString()}` },
        ],
      },
    )

    return identityVerificationDoc.id.toString()
  }

  async loadIdentityVerificationList() {
    // Load identityVerification list from SoC index:
    const data = await this.instance.get(
      'identityVerifications',
      this.aliases.ownerDid,
    )
    if (!data) return []
    return data.identityVerifications
  }

  async loadIdentityVerification(docId) {
    // Load identityVerification object from Ceramic:
    const data = await this.ceramic.loadDocument(docId, this.aliases.ownerDid)
    return data
  }

  async verifyIdentity({ docId, signedChallenge, name }) {
    const { kid } = await this.ceramic.did.verifyJWS(signedChallenge)

    const identityVerificationDoc = await this.loadIdentityVerification(docId)
    console.log('verified kid:', kid)
    console.log('lookup kid:', identityVerificationDoc.state.content.did)

    if (!kid.match(identityVerificationDoc.state.content.did))
      throw new Error('Invalid JWS on identityVerification challenge!')

    const update = {
      content: {
        ...identityVerificationDoc.state.content,
        name,
        isVerified: true,
      },
    }
    await identityVerificationDoc.change(update)

    return true
  }
}

export default IDX
