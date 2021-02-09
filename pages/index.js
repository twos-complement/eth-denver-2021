import Head from 'next/head'
import Link from 'next/Link'

const Home = () => (
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
    </main>
  </div>
)

export default Home
