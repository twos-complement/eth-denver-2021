import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Web3 from 'web3'

import IDXContext from '../components/contexts/idx-context'
import UNSTOPPABLE_ABI from '../util/abis/unstoppable-domains.json'

const UNSTOPPABLE_IDX_DID_KEY = 'truereview.idx.did'
const UNSTOPPABLE_CONTRACT_ADDRESS =
  '0x95AE1515367aa64C462c71e87157771165B1287A'

const LinkIdentityToUnstoppableDomain = () => {
  const [loading, setLoading] = useState(false)
  const [linked, setLinked] = useState(false)
  const [tokenId, setTokenId] = useState('')
  const idx = useContext(IDXContext)
  const [contract, setContract] = useState()
  const [address, setAddress] = useState()
  const [keyValue, setKeyValue] = useState()

  // TODO: abstract to hoc:
  async function bootstrapWeb3() {
    // Load web3:
    if (!window.ethereum) throw new Error('Please enable an ethereum provider!')
    window.web3 = new Web3(window.ethereum)
    window.ethereum.enable()

    // Load Unstoppable Ethereum contract:
    const contract = new web3.eth.Contract(
      UNSTOPPABLE_ABI,
      UNSTOPPABLE_CONTRACT_ADDRESS,
    )

    // Get wallet account info:
    const accounts = await window.web3.eth.getAccounts()
    const address = accounts[0]

    setContract(contract)
    setAddress(address)
  }
  useEffect(bootstrapWeb3, [])

  async function refreshKeyValue() {
    if (!tokenId) return
    // GET KEY
    try {
      const did = await contract.methods
        .get(UNSTOPPABLE_IDX_DID_KEY, tokenId)
        .call()
      setKeyValue(did)
    } catch (e) {}
  }
  // Refresh key value when token changes:
  useEffect(refreshKeyValue, [tokenId])

  async function setIDXDIDOnUnstoppableDomain() {
    setLoading(true)

    // Set IDX DID to Unstoppable Domain `truereview.idx.did` namespace:
    await contract.methods
      .set(UNSTOPPABLE_IDX_DID_KEY, idx.instance.id, tokenId)
      .send({
        from: address,
      })

    setLoading(false)
    setLinked(true)
  }

  if (!contract) {
    return (
      <div>
        <h3>Loading Unstoppable Domains contract...</h3>
      </div>
    )
  }

  if (linked)
    return (
      <div>
        <h1>Linked!</h1>
        <Link href="/">
          <a>Return to Home</a>
        </Link>
      </div>
    )

  return (
    <div>
      <Head>
        <title>Link Identity to Unstoppable Domain - 2C | ETHDenver 2021</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Link Identity to Unstoppable Domain</h1>
        <h2>
          Linking IDX DID to Unstoppable Domain will allow reviews to be
          accessed via your crypto domain name.
        </h2>
        <form
          onSubmit={e => {
            e.preventDefault()
            setIDXDIDOnUnstoppableDomain()
          }}
        >
          <input
            placeholder="Unstoppable Domain Token ID"
            onChange={e => {
              setTokenId(e.target.value)
            }}
            value={tokenId}
          />
          {keyValue ? (
            <p>Current linked IDX DID: {keyValue}</p>
          ) : (
            'No Linked IDX DID to this domain!'
          )}
          <button type="submit" disabled={loading}>
            {loading ? 'Linking...' : 'Link Identity to Domain'}
          </button>
        </form>
      </main>
    </div>
  )
}

export default LinkIdentityToUnstoppableDomain
