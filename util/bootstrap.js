import { promises as fs } from 'fs'
import { createDefinition, publishSchema } from '@ceramicstudio/idx-tools'
import { Ed25519Provider } from 'key-did-provider-ed25519'

import seed from './soc-seed'
import ceramic from './ceramic'
import OrganizationSchema from '../schemas/io.2c.eth-denver-2021.organization'
import OrganizationListSchema from '../schemas/io.2c.eth-denver-2021.organizationList'
import ReviewSchema from '../schemas/io.2c.eth-denver-2021.review'
import ReviewListSchema from '../schemas/io.2c.eth-denver-2021.reviewList'

async function bootstrap() {
  // Authenticate the Ceramic instance with the provider:
  await ceramic.setDIDProvider(new Ed25519Provider(seed))

  // Publish schemas:
  const [
    organizationSchema,
    organizationListSchema,
    reviewSchema,
    reviewListSchema,
  ] = await Promise.all([
    publishSchema(ceramic, { content: OrganizationSchema }),
    publishSchema(ceramic, { content: OrganizationListSchema }),
    publishSchema(ceramic, { content: ReviewSchema }),
    publishSchema(ceramic, { content: ReviewListSchema }),
  ])

  // Create definitions using the created schema ID:
  const organizationsDefinition = await createDefinition(ceramic, {
    name: 'organizations',
    description: 'Organizations',
    schema: organizationListSchema.commitId.toUrl(),
  })
  const reviewsDefinition = await createDefinition(ceramic, {
    name: 'reviews',
    description: 'Reviews',
    schema: reviewListSchema.commitId.toUrl(),
  })

  // Write config to JSON file:
  const config = {
    definitions: {
      organizations: organizationsDefinition.id.toString(),
      reviews: reviewsDefinition.id.toString(),
    },
    schemas: {
      Organization: organizationSchema.commitId.toUrl(),
      OrganizationList: organizationListSchema.commitId.toUrl(),
      Review: reviewSchema.commitId.toUrl(),
      ReviewList: reviewListSchema.commitId.toUrl(),
    },
  }
  await fs.writeFile(
    './util/ceramic-config.json',
    JSON.stringify(config, null, '\t'),
  )

  console.log('Config written to ../util/ceramic-config.json file:', config)
}

export default bootstrap
