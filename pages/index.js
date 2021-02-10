import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/Link'

import withIdx from '../components/hoc/withIdx'
import OrganizationListItem from '../components/OrganizationListItem'

const Home = ({ idx }) => {
  const [organizationDocs, setOrganizationDocs] = useState({})

  async function loadOrganizationsDocs() {
    const organizationDocs = await idx.loadOrganizationDocs()
    setOrganizationDocs(organizationDocs)
  }

  useEffect(() => {
    loadOrganizationsDocs()
  }, [])

  return (
    <div>
      <Head>
        <title>2C | ETHDenver 2021</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to ETHDenver 2021!</h1>
        <Link href="/create-organization">
          <a>Create Organization</a>
        </Link>

        <h2>Organizations</h2>
        <ul>
          {Object.keys(organizationDocs).map(key => (
            <OrganizationListItem key={key} ceramic={organizationDocs[key]} />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default withIdx(Home)
