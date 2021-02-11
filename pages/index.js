import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'

import IDXContext from '../components/contexts/idx-context'
import OrganizationListItem from '../components/OrganizationListItem'

const Home = () => {
  const [organizations, setOrganizations] = useState([])
  const idx = useContext(IDXContext)

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
      </main>
    </div>
  )
}

export default Home
