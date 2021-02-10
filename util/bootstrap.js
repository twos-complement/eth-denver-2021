import { promises as fs } from 'fs'
import { createDefinition, publishSchema } from '@ceramicstudio/idx-tools'
import { Ed25519Provider } from 'key-did-provider-ed25519'

import seed from './soc-seed'
import ceramic from './ceramic'
import OrganizationSchema from '../schemas/io.2c.eth-denver-2021.organization'
import OrganizationListSchema from '../schemas/io.2c.eth-denver-2021.organizationList'

async function bootstrap() {
  // Authenticate the Ceramic instance with the provider:
  await ceramic.setDIDProvider(new Ed25519Provider(seed))

  // Publish schemas:
  const [organizationSchema, organizationListSchema] = await Promise.all([
    publishSchema(ceramic, { content: OrganizationSchema }),
    publishSchema(ceramic, { content: OrganizationListSchema }),
  ])

  // Create the definition using the created schema ID:
  const organizationsDefinition = await createDefinition(ceramic, {
    name: 'organizations',
    description: 'Organizations',
    schema: organizationListSchema.commitId.toUrl(),
  })

  // Write config to JSON file
  const config = {
    definitions: {
      organizations: organizationsDefinition.id.toString(),
    },
    schemas: {
      Organization: organizationSchema.commitId.toUrl(),
      OrganizationList: organizationListSchema.commitId.toUrl(),
    },
  }
  await fs.writeFile(
    './util/ceramic-config.json',
    JSON.stringify(config, null, '\t'),
  )

  console.log('Config written to ../util/ceramic-config.json file:', config)
}

export default bootstrap
