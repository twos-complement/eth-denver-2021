# ETH Denver 2021

2C | Two's Complement ETH Denver 2021 project submission.

## Setup

### Development Environment

- Node.js - [Install Node.js 12](https://nodejs.org/en/), including the npm package management tool. [NVM](https://github.com/nvm-sh/nvm) is recommended.

1. Copy `.env.example` to `.env` and add values below, then source to shell.
2. `npm run dev` - to run the Next.js app locally
3. Request `/api/bootstrap` to create and publish schemas and definitions
4. Request `/api/add-organization` to create an organization and add to State of Colorado IDX Index

### Environment Variables

| Name | Default | Description |
| ---- | ------- | ----------- |
| TBD  | TBD     | TBD         |

### Authentication Flow

1. User accepts myColorado digital ID consent
2. User requests challenge from API
3. API uses SoC IDX to create `identityVerification` record with the DID and the challenge
4. User signs and passes signed challenge, and `identityVerification` docId to myColorado authentication flow
5. myColorado posts webhook back to API with signed challenge
6. API verifies DID signature on challenge
7. API uses SoC IDX to update `identityVerification` record with the DID and the person's public info
8. Dapp reads public verification records to confirm DID ownership
