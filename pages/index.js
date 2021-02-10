import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/Link'

import withIdx from '../components/hoc/withIdx'
import OrganizationListItem from '../components/ui/OrganizationListItem'

const Home = ({ idx }) => {
  const [organizations, setOrganizations] = useState([])

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
          {organizations.map(organization => (
            <OrganizationListItem
              key={organization.name}
              organization={organization}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default withIdx(Home)
