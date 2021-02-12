import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

import IDXContext from '../components/contexts/idx-context'
import IdentityVerificationsContext from '../components/contexts/identity-verifications-context'
import OrganizationItem from '../components/OrganizationItem'
import IdentityVerificationListItem from '../components/IdentityVerificationListItem'

const Wrapper = styled.div`
  display: inline-block;
  margin-right: 12px;
  margin-botom: 8px;
`

const Quest = ({ contract, account }) => {
  const [organizations, setOrganizations] = useState([])
  const idx = useContext(IDXContext)
  const { identityVerifications } = useContext(IdentityVerificationsContext)
  const [nfts, setNFTS] = useState([])
  const [tokens, setTokens] = useState([])

  async function loadOrganizations() {
    const organizations = await idx.loadOrganizationList()
    setOrganizations(organizations)
  }

  useEffect(async () => {
    loadOrganizations()
  }, [])

  useEffect(async () => {
    if (!account.id || !contract) {
      return
    }

    console.log(`Getting tokens for ${account.id}`)
    const nearTokens = await contract.get_tokens({ owner_id: account.id })

    console.log(nearTokens.length + ' NEAR Tokens found')

    setTokens(nearTokens)
  }, [contract, account])

  useEffect(async () => {
    if (!contract) {
      return
    }

    const nftList = []

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      const nearToken = await contract.get_token({ token_id: token })
      nftList.push(nearToken)
      console.log('Near token: ' + JSON.stringify(nearToken))
    }

    setNFTS(nftList)
  }, [tokens])

  const checkin = async () => {
    await fetch(`/api/get-reward?id=${account.id}`).then(async response => {
      const data = await response.json()
      console.log('NEAR NFT: ' + JSON.stringify(data.token))

      setNFTS([...nfts, data.token])
    })
  }

  return (
    <div>
      <Head>
        <title>2C | ETHDenver 2021</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2>Quest > CDA Fun Finder</h2>
        <div>
          {!organizations.length && <h4>Loading Organizations...</h4>}
          {organizations.map(organization => (
            <OrganizationItem key={organization.id} id={organization.id}>
              <button onClick={checkin}>Checkin</button>
            </OrganizationItem>
          ))}
        </div>
        <div>
          {nfts.map(nft => (
            <Wrapper key={nft.tokenId} >
              <img width="128px" src={nft.tokenImage} />
              <div>Beer Reward</div>
            </Wrapper>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Quest
