const OrganizationListSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'io.2c.ethdenver-2021.organizationList',
  type: 'object',
  properties: {
    organizations: {
      type: 'array',
      title: 'organizations',
      items: {
        type: 'object',
        title: 'io.2c.ethdenver-2021.organization',
        properties: {
          id: {
            $ref: '#/definitions/CeramicDocId',
          },
        },
      },
    },
  },
  definitions: {
    CeramicDocId: {
      type: 'string',
      pattern: '^ceramic://.+(\\\\?version=.+)?',
      maxLength: 150,
    },
  },
}

export default OrganizationListSchema
