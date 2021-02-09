# ETH Denver 2021

2C | Two's Complement ETH Denver 2021 project submission.

# Setup

### Development Environment

- Node.js - [Install Node.js 12](https://nodejs.org/en/), including the npm package management tool. [NVM](https://github.com/nvm-sh/nvm) is recommended.

1. Copy `.env.example` to `.env` and add values below, then source to shell.
2. `npm run dev` - to run the Next.js app locally

### Storybook

Install storybook `npm install storybook -g`, then `npm run storybook` to start storybook.

### CI/CD

Vercel deployment setup:

1. [Import git repository on Vercel](https://vercel.com/import/git)
2. Configure any ENV vars for production/preview apps (in web console or using vercel cli)
3. Configure domain for production (set CNAME record to `cname.vercel-dns.com`, and confirm in Vercel console)
4. Configure [integrations](https://vercel.com/integrations), like Slack for notifications

Commits pushed to any branch will automatically build and deploy a `preview` app on Vercel (including PR bot posts).
Commits pushed to `main` branch will automatically build and deploy the `production` app on Vercel.

### Environment Variables

Local development: set values in .env

| Name                   | Default                       | Description                                                                                                                                                                                                                                  |
| ---------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NEXT_PUBLIC_API_PATH   | `http://localhost:3000`       | Location of API (set to localhost or staging for development, production for production)                                                                                                                                                     |
| NEXT_PUBLIC_LOGIN_PATH | `http://localhost:3000/login` | Location of Cognito login page. Use the API test flow in development/staging: `https://staging-api-domain/login`. Use the direct Cognito login page for production (find path in Cloud Formation Outputs - be sure to include redirect_url). |

#### System Environment Variables

Vercel can add [system environment variables](https://vercel.com/docs/build-step#system-environment-variables). Add `VERCEL_GITHUB_COMMIT_SHA` (at minimum for the /api/version endpoint) and leave the value blank, and Vercel will populate these values.

### Authentication Flow

TBD - myColorado and/or wallet + IDX identity linking.

#### Development

In development, auth flow at /login will direct to the `NEXT_PUBLIC_LOGIN_PATH` which defaults to a test Cognito login flow. Create an account, and login with it.

TBD: Delete this web2 flow ;)

#### Staging (Preview Apps)

Pull Requests will deploy a preview app on Vercel. Preview apps are notoriously difficult to test OAuth flows, because their dynamically created URLs must be whitelisted as trusted OAuth redirect destinations. The API has a test auth flow in staging (/login), which will use the Vercel API to load a list of preview apps, and allow you to proxy the auth token to a preview app deployment.

TBD: Delete this web2 flow ;)

#### Production

Set the `NEXT_PUBLIC_LOGIN_PATH` to the full Cognito login page, including the correct redirect url to this client app.

TBD: Delete this web2 flow ;)

### Publish Schema

Set dev ceramic net:
`idx bootstrap -c https://ceramic-clay.3boxlabs.com`

OR (if you already set config to another network):
`idx config:set ceramic-url https://ceramic-clay.3boxlabs.com`

Create a DID for each schema:
`idx did:create -l <SchemaName>`

Publish each schema:
`idx schema:publish <DID> <JSONSchemaString>`

Create a DID for each definition:
`idx did:create -l <SchemaName>`

Create definition of each schema:
`idx definition:create <DID> -n <Name> -d <Description> --schema=<CeramicURL>`

Set definition to aliases in `util/IDX.js`

## Resources

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
