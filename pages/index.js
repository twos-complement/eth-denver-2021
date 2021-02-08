import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'

import withAuth from '../components/hoc/withAuth'
import { HELLO_WORLD_QUERY } from '../util/queries'

const Home = ({ auth: { email } }) => {
  const { data, loading, error } = useQuery(HELLO_WORLD_QUERY)

  if (error) throw error

  return (
    <div>
      <Head>
        <title>2C Vercel Client Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to 2C Vercel Client Boilerplate{email && `, ${email}`}</h1>
        <a href="/api/logout">Logout</a>
        {loading && <span>Loading data...</span>}
        {data && data.helloWorld && <p>{data.helloWorld}</p>}
      </main>
    </div>
  )
}

export default withAuth(Home)
