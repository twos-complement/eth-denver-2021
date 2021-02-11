import { PersistentMap, storage, context, logging } from 'near-sdk-as'

import {
  AccountId,
  TokenId,
  IPFSId,
  MetaData,
  TokenType,
  tokenOwnerIds,
  tokenTypes,
  tokenImages,
} from './model'

// Note that MAX_SUPPLY is implemented here as a simple constant
// It is exported only to facilitate unit testing
export const MAX_SUPPLY = u64(100000)

// Note that with this implementation, an account can only set one escrow at a
// time. You could make values an array of AccountIds if you need to, but this
// complicates the code and costs more in storage rent.
const escrowAccess = new PersistentMap<AccountId, AccountId>('b')

// This is a key in storage used to track the current minted supply
const TOTAL_SUPPLY = 'c'

/******************/
/* ERROR MESSAGES */
/******************/

// These are exported for convenient unit testing
export const ERROR_NO_ESCROW_REGISTERED = 'Caller has no escrow registered'
export const ERROR_CALLER_ID_DOES_NOT_MATCH_EXPECTATION =
  'Caller ID does not match expectation'
export const ERROR_MAXIMUM_TOKEN_LIMIT_REACHED = 'Maximum token limit reached'
export const ERROR_OWNER_ID_DOES_NOT_MATCH_EXPECTATION =
  'Owner id does not match real token owner id'
export const ERROR_TOKEN_NOT_OWNED_BY_CALLER =
  'Token is not owned by the caller. Please use transfer_from for this scenario'

/******************/
/* CHANGE METHODS */
/******************/

// Grant access to the given `accountId` for all tokens the caller has
export function grant_access(escrow_account_id: string): void {
  escrowAccess.set(context.predecessor, escrow_account_id)
}

// Revoke access to the given `accountId` for all tokens the caller has
export function revoke_access(escrow_account_id: string): void {
  escrowAccess.delete(context.predecessor)
}

// Transfer the given `token_id` to the given `new_owner_id`. Account `new_owner_id` becomes the new owner.
// Requirements:
// * The caller of the function (`predecessor`) should have access to the token.
export function transfer_from(
  owner_id: string,
  new_owner_id: string,
  token_id: TokenId,
): void {
  const predecessor = context.predecessor

  // fetch token owner and escrow; assert access
  const token = get_token(token_id)
  assert(token !== null)
  assert(token.ownerId == owner_id, ERROR_OWNER_ID_DOES_NOT_MATCH_EXPECTATION)
  const escrow = escrowAccess.get(token.ownerId)
  assert(
    [token.ownerId, escrow].includes(predecessor),
    ERROR_CALLER_ID_DOES_NOT_MATCH_EXPECTATION,
  )

  // assign new owner to token
  set_token(new_owner_id, token_id, token.tokenType, token.tokenImage)
}

function set_token(
  ownerId: AccountId,
  tokenId: TokenId,
  tokenType: TokenType,
  tokenImage: IPFSId,
): MetaData {
  tokenOwnerIds.set(tokenId, ownerId)
  tokenTypes.set(tokenId, tokenType)
  tokenImages.set(tokenId, tokenImage)

  return new MetaData(ownerId, tokenId, tokenType, tokenImage)
}

// Transfer the given `token_id` to the given `new_owner_id`. Account `new_owner_id` becomes the new owner.
// Requirements:
// * The caller of the function (`predecessor`) should be the owner of the token. Callers who have
// escrow access should use transfer_from.
export function transfer(new_owner_id: string, token_id: TokenId): void {
  const predecessor = context.predecessor

  // fetch token owner and escrow; assert access
  const token = get_token(token_id)
  assert(token !== null)
  assert(token.ownerId == predecessor, ERROR_TOKEN_NOT_OWNED_BY_CALLER)

  // assign new owner to token
  set_token(new_owner_id, token_id, token.tokenType, token.tokenImage)
}

/****************/
/* VIEW METHODS */
/****************/

// Returns `true` or `false` based on caller of the function (`predecessor`) having access to account_id's tokens
export function check_access(account_id: string): boolean {
  const caller = context.predecessor

  // throw error if someone tries to check if they have escrow access to their own account;
  // not part of the spec, but an edge case that deserves thoughtful handling
  assert(caller != account_id, ERROR_CALLER_ID_DOES_NOT_MATCH_EXPECTATION)

  // if we haven't set an escrow yet, then caller does not have access to account_id
  if (!escrowAccess.contains(account_id)) {
    return false
  }

  const escrow = escrowAccess.getSome(account_id)
  return escrow == caller
}

// Get an individual owner by given `tokenId`
export function get_token_owner(token_id: TokenId): string {
  const token = get_token(token_id)

  return token.ownerId
}

/********************/
/* NON-SPEC METHODS */
/********************/

export function total_supply(): u64 {
  const supply = storage.getPrimitive<u64>(TOTAL_SUPPLY, 1)

  return supply
}

export function get_token(token_id: TokenId): MetaData {
  const tokenId = token_id
  const ownerId = tokenOwnerIds.getSome(tokenId)
  const tokenType = tokenTypes.getSome(tokenId)
  const tokenImage = tokenImages.getSome(tokenId)

  assert(ownerId != null)

  return new MetaData(ownerId, tokenId, tokenType, tokenImage)
}

export function get_token_ownerId(token_id: TokenId): AccountId {
  const token = get_token(token_id)

  return token.ownerId
}

export function get_token_tokenType(token_id: TokenId): TokenType {
  const token = get_token(token_id)

  return token.tokenType
}

export function get_token_tokenImage(token_id: TokenId): AccountId {
  const token = get_token(token_id)

  return token.tokenImage
}

// Note that ANYONE can call this function! You probably would not want to
// implement a real NFT like this!
export function mint_reward(
  owner_id: AccountId,
  type: TokenType = TokenType.BEER_REWARD,
): TokenId {
  // Fetch the next tokenId, using a simple indexing strategy that matches IDs
  // to current supply, defaulting the first token to ID=1
  //
  // * If your implementation allows deleting tokens, this strategy will not work!
  // * To verify uniqueness, you could make IDs hashes of the data that makes tokens
  //   special; see https://twitter.com/DennisonBertram/status/1264198473936764935
  const tokenId = storage.getPrimitive<u64>(TOTAL_SUPPLY, 1)

  // enforce token limits – not part of the spec but important!
  assert(tokenId <= MAX_SUPPLY, ERROR_MAXIMUM_TOKEN_LIMIT_REACHED)

  const token = set_token(
    owner_id,
    tokenId,
    type,
    'https://ipfs.io/ipfs/Qmck1dijajHdjFpRM1UPfcm6PDTp3p69K5fCML8S1Epuj9?filename=Leading-Icon.png',
  )

  storage.set<u64>(TOTAL_SUPPLY, tokenId + 1)

  // return the tokenId – while typical change methods cannot return data, this
  // is handy for unit tests
  return tokenId
}
