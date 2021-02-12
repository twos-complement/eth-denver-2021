import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import IDXContext from '../components/contexts/idx-context'
import IdentityVerificationsContext from '../components/contexts/identity-verifications-context'
import OrganizationListItem from '../components/OrganizationListItem'
import IdentityVerificationListItem from '../components/IdentityVerificationListItem'

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
        <h1>Welcome to ETHDenver 2021!</h1>
        <h2>Organizations</h2>
        <div>
          {!organizations.length && <h4>Loading Organizations...</h4>}
          {organizations.map(organization => (
            <OrganizationListItem key={organization.id} id={organization.id} />
          ))}
        </div>
        <Link href="/my-colorado">
          <a>Verify Identity with myColorado</a>
        </Link>
        <h2>Identity Verifications</h2>
        <div>
          {!identityVerifications.length && (
            <h4>Loading Identity Verifications...</h4>
          )}
          {identityVerifications.map(identityVerification => (
            <IdentityVerificationListItem
              key={identityVerification.id}
              id={identityVerification.id}
            />
          ))}
        </div>
        <Link href="/link-identity-to-unstoppable-domain">
          <a>Link Identity to Unstoppable Domain</a>
        </Link>
      </main>
    </div>
  )
}

export default Home
