// @nearfile

import { PersistentMap, storage, context, logging } from 'near-sdk-as'

export type AccountId = string
export type TokenId = u64
export type IPFSId = string

export enum TokenType {
  BEER_REWARD,
}

/**
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
@nearBindgen
export class MetaData {
  constructor(
    public ownerId: AccountId,
    public tokenId: TokenId,
    public tokenType: TokenType,
    public tokenImage: IPFSId,
  ) {}
}

export const tokenOwnerIds = new PersistentMap<TokenId, AccountId>('o')

export const tokenTypes = new PersistentMap<TokenId, TokenType>('t')

export const tokenImages = new PersistentMap<TokenId, IPFSId>('i')

export const tokenRegistry = new PersistentMap<AccountId, string>('r')
