import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'

import IDXContext from '../components/contexts/idx-context'
import IdentityVerificationsContext from '../components/contexts/identity-verifications-context'
import OrganizationListItem from '../components/OrganizationListItem'
import IdentityVerificationListItem from '../components/IdentityVerificationListItem'

const ContentGrid = styled.div`
  display: grid;
  grid-row-gap: 20px;
  padding: 40px 40px 60px 40px;
`

const OrganizationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
`

const Spacer = styled.div`
  height: 30px;
`

const IdentityVerificationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
`

const Home = () => {
  const [organizations, setOrganizations] = useState([])
  const idx = useContext(IDXContext)
  const { identityVerifications } = useContext(IdentityVerificationsContext)

  async function loadOrganizations() {
    const organizations = await idx.loadOrganizationList()
    setOrganizations(organizations)
  }

  useEffect(() => {
    loadOrganizations()
  }, [])

  return (
    <div>
      <Head>
        <title>2C | ETHDenver 2021</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ContentGrid>
          <h1>🐶 True Review</h1>
          <h4>http://truereview.crypto</h4>
          <Link href="/link-identity-to-unstoppable-domain">
            <a>Link Identity to Unstoppable Domain</a>
          </Link>

          <Spacer />

          <h3>Organizations</h3>
          <OrganizationGrid>
            {!organizations.length && <h4>Loading Organizations...</h4>}
            {organizations.map(organization => (
              <OrganizationListItem
                key={organization.id}
                id={organization.id}
              />
            ))}
          </OrganizationGrid>

          <Spacer />

          <Link href="/my-colorado">
            <a>Verify Identity with myColorado</a>
          </Link>
          <h3>Identity Verifications</h3>
          <div>
            {!identityVerifications.length && (
              <h4>Loading Identity Verifications...</h4>
            )}
            <IdentityVerificationGrid>
              {identityVerifications.map(identityVerification => (
                <IdentityVerificationListItem
                  key={identityVerification.id}
                  id={identityVerification.id}
                />
              ))}
            </IdentityVerificationGrid>
          </div>
        </ContentGrid>
      </main>
    </div>
  )
}

export default Home
