import { useEffect } from 'react'
import Head from 'next/head'

import withIdx from '../components/hoc/withIdx'

async function createBusiness(idx) {
  if (!idx) return

  const resp = await idx.set('basicProfile', {
    name: 'New Business',
  })

  // <DID>
  console.log(resp)
}

const Home = ({ idx }) => {
  useEffect(() => {
    createBusiness(idx)
  }, [idx])

  return (
    <div>
      <Head>
        <title>2C Vercel Client Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to ETHDenver 2021!</h1>
      </main>
    </div>
  )
}

export default withIdx(Home)
