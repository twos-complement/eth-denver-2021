const ReviewListSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'io.2c.ethdenver-2021.reviewList',
  type: 'object',
  properties: {
    notes: {
      type: 'array',
      title: 'reviews',
      items: {
        type: 'object',
        title: 'io.2c.ethdenver-2021.review',
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

export default ReviewListSchema
