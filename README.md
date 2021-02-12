# 🐶 True Review - ETH Denver 2021

> 🐶 True Review is a censorship-resistant review platform.

In the wake of Google censoring over 100,000 reviews from Robinhood's app during the GME event, the online community has made it clear that people demand ownership of their VOICE and their DATA. Reviews belong to the PEOPLE, so let's build it that way.

🐶 True Review is a censorship-resistant review platform. It lets people OWN their reviews, and share them without fear of censorship. We used LOTS of awesome tech from our ETHDenver sponsors this year, integrating these awesome tools in interesting ways.

Some highlights:

- **People own their data** by backing rich text/image/video reviews with [IDX](https://idx.xyz/) & [Ceramic](https://ceramic.network/) (all stored on [IPFS](https://ipfs.io/) of course!)
- **Real companies are verified** through The State of Colorado (also backed by IDX/Ceramic/IPFS)
- People can **verify their identity** through their Colorado Digital ID (or similar) for optional bot & spam protection
- People can link their reviews and identity to a **decentralized namespace** with [Unstoppable Domains](https://unstoppabledomains.com/)
- To make things fun and practical, why not add some gamification using [NEAR Protocol](https://near.org/) **NFT rewards and prizes**!?

Let's check out the experience: [FIGMA PROTOTYPE]

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
