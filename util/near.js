import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'

const contractName = 'dev-1612906641805-6652913'
const networkId = 'testnet'
const nodeUrl = 'https://rpc.testnet.near.org'
const walletUrl = 'https://wallet.testnet.near.org'
const nearConfig = {
  networkId,
  nodeUrl,
  walletUrl,
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  contractName,
}

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfig,
    ),
  )

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      viewMethods: [
        'check_access',
        'get_token_owner',
        'total_supply',
        'get_token',
        'get_token_ownerId',
        'get_token_tokenType',
        'get_token_tokenImage',
        'get_tokens',
      ],
      changeMethods: [
        'grant_access',
        'revoke_access',
        'transfer_from',
        'transfer',
        'mint_reward',
      ],
    },
  )

  return window.contract
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
}
