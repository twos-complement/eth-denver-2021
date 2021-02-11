const IdentityVerificationSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'io.2c.ethdenver-2021.identityVerification',
  type: 'object',
  properties: {
    did: {
      type: 'string',
    },
    challenge: {
      type: 'string',
    },
    isVerified: {
      type: 'boolean',
    },
    name: {
      type: 'string',
    },
  },
}

export default IdentityVerificationSchema
