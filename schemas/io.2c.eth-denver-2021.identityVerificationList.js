const IdentityVerificationListSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'io.2c.ethdenver-2021.identityVerificationList',
  type: 'object',
  properties: {
    identityVerifications: {
      type: 'array',
      title: 'identityVerifications',
      items: {
        type: 'object',
        title: 'io.2c.ethdenver-2021.identityVerification',
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

export default IdentityVerificationListSchema
