const ReviewSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'io.2c.ethdenver-2021.review',
  type: 'object',
  properties: {
    stars: {
      type: 'integer',
      minimum: 1,
      maximum: 5,
    },
    description: {
      type: 'string',
      maxLength: 250,
    },
    organization: {
      $ref: '#/definitions/CeramicDocId',
    },
    imageUrl: {
      $ref: '#/definitions/IPFSDocId',
    },
    videoUrl: {
      $ref: '#/definitions/IPFSDocId',
    },
  },
  definitions: {
    CeramicDocId: {
      type: 'string',
      pattern: '^ceramic://.+(\\\\?version=.+)?',
      maxLength: 150,
    },
    IPFSDocId: {
      type: 'string',
      pattern: '^ipfs://.+(\\\\?version=.+)?',
      maxLength: 150,
    },
  },
}

export default ReviewSchema
