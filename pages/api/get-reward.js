import * as nearAPI from 'near-api-js'

const {
  Near,
  Account,
  Contract,
  KeyPair,
  keyStores: { InMemoryKeyStore },
} = nearAPI

export default async (req, res) => {
  const contractName = 'dev-1612906641805-6652913'
  const networkId = 'testnet'
  const nodeUrl = 'https://rpc.testnet.near.org'
  let config = {
    networkId,
    nodeUrl,
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
    contractName,
  }

  const credentials =
    '5fWYCZXC6met6MNsxL87AQjXsaoHTLTrpT8UjLAAudjkQkVEYuNfgiL2jnhjQ8Kt69jBzBqQXc9ZYLJx4fPz3yfu'
  const keyStore = new InMemoryKeyStore()
  const keyPair = KeyPair.fromString(credentials)
  // keyStore.setKey(networkId, contractName, keyPair)
  keyStore.setKey(networkId, 'eth-denver-2021.testnet', keyPair)
  const key = keyStore.getKey(networkId, contractName)

  const near = new Near({
    networkId,
    nodeUrl,
    deps: { keyStore },
  })

  const account = await near.account('eth-denver-2021.testnet')

  // Initializing our contract APIs by contract name and configuration
  const contract = await new Contract(account, contractName, {
    viewMethods: [
      'check_access',
      'get_token_owner',
      'total_supply',
      'get_token',
      'get_token_ownerId',
      'get_token_tokenType',
      'get_token_tokenImage',
    ],
    changeMethods: [
      'grant_access',
      'revoke_access',
      'transfer_from',
      'transfer',
      'mint_reward',
    ],
  })

  const token = await contract.mint_reward({
    owner_id: 'eth-denver-2021.testnet',
  })

  // ed25519:SbQy4MNQwC6PjNUxz6gT6BouVJVwARtthWYpE9QkmrX

  res.statusCode = 200
  res.json({ success: true, token })
}
