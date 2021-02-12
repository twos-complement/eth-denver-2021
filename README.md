# 🐶 True Review - ETH Denver 2021

> 🐶 True Review is a censorship-resistant review platform.

![True Review Cover](/public/cover.jpg)

Built by [2C | Two's Complement](https://twoscomplement.io)

Teammates:

- Nico Valencia
- Katy Jeremko
- Julian Ramlal
- Chieri Wada

In the wake of Google censoring over 100,000 reviews from Robinhood's app during the GME event, the online community has made it clear that people demand ownership of their VOICE and their DATA. Reviews belong to the PEOPLE, so let's build it that way.

🐶 True Review is a censorship-resistant review platform. It lets people OWN their reviews, and share them without fear of censorship. We used LOTS of awesome tech from our ETHDenver sponsors this year, integrating these awesome tools in interesting ways.

Some highlights:

- **People own their data** by backing rich text/image/video reviews with [IDX](https://idx.xyz/) & [Ceramic](https://ceramic.network/) (all stored on [IPFS](https://ipfs.io/) of course!)
- **Real companies are verified** through The State of Colorado (also backed by IDX/Ceramic/IPFS)
- People can **verify their identity** through their Colorado Digital ID (or similar) for optional bot & spam protection
- People can link their reviews and identity to a **decentralized namespace** with [Unstoppable Domains](https://unstoppabledomains.com/)
- To make things fun and practical, why not add some gamification using [NEAR Protocol](https://near.org/) **NFT rewards and prizes**!?

Let's check out the experience: [FIGMA PROTOTYPE](https://www.figma.com/proto/0eMGJeHltlcCKp4eTqdl5u/2021?node-id=246%3A84301&viewport=879%2C-40%2C0.06251474469900131&scaling=contain&hotspot-hints=0)

## Flows

### myColorado Identity Verification Flow

1. User accepts myColorado digital ID consent
2. User requests challenge from API
3. API uses SoC IDX to create `identityVerification` record with the DID and the challenge
4. User signs and passes signed challenge, and `identityVerification` docId to myColorado authentication flow
5. myColorado posts webhook back to API with signed challenge
6. API verifies DID signature on challenge
7. API uses SoC IDX to update `identityVerification` record with the DID and the person's public info
8. Dapp reads public verification records to confirm DID ownership
9. Users can now see state government identity verified reviews ⭐

### Unstoppable Domain IDX DID Link Flow

1. User registers an Unstoppable Domain
2. User authenticates with IDX
3. User sets `truereview.idx.did` domain record to their IDX DID
4. User's domain `truereview.idx.did` can now resolve their censorship-resistant reviews ⭐

### NEAR Gamifications Rewards

1. User checks in to an Organization to complete a "quest"
2. NEAR NFT is minted for reward and assigned to the user's IDX DID
3. List of each IDX DID's tokens is stored on NEAR contract

## Challenges

#### User-owned data is tough.

We considered 3 layers of decentralized data in the ecosystem:

1. **Base Layer (Blockchain/Ethereum/etc.)** - storing data directly on a fully decentralized blockchain is the purest approach, but can be costly, slow, and difficult to scale
2. **Middle Layer (Filecoin/etc.)** - a mix of both worlds (1 & 2), blockchain backed monetization powers a more trusted and permanent storage marketplace, must more scalable than directly on Ethereum, but still has atomic transaction costs
3. **p2p Community (IPFS/Pinata/Ceramic/Textile/TheGraph/etc.)** - a community driven ecosystem, mostly leveraging core IPFS technology to provide a network of peers that help store and share data in a more fluid nature

Each layer has it's pros and cons for specific use cases. For a review platform:

- People paying a cost in order to leave a review isn't realistic
- People want to interoperate with a variety of wallets, blockchain technology, and social identity verifications
- People want to own their data, and decide where it is stored

## Setup

### Development Environment

True Review is a Dapp on a static Next.js/React stack, using minimal web2 APIs for web3 node interfaces (Infura, Near, IPFS, etc.)

- Node.js - [Install Node.js 12](https://nodejs.org/en/), including the npm package management tool. [NVM](https://github.com/nvm-sh/nvm) is recommended.

1. `npm install`
2. `npm run dev`
3. GET `/api/bootstrap` to create and publish schemas and definitions
4. POST `/api/add-organization` with `{ name: 'Organization Name'}` to create an organization and add to State of Colorado's IDX Index
