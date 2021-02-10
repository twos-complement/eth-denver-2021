const OrganizationSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'io.2c.ethdenver-2021.organization',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      maxLength: 150,
    },
  },
}

export default OrganizationSchema
