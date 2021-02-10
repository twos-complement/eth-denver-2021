import { useState } from 'react'
import Head from 'next/head'

import withIdx from '../components/hoc/withIdx'

const CreateOrganization = ({ idx }) => {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit() {
    await idx.createOrganization({
      name,
    })

    setIsLoading(false)
  }

  return (
    <div>
      <Head>
        <title>2C | ETHDenver 2021 - Create Organization</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Create Organization</h1>
        <form
          onSubmit={e => {
            handleSubmit()
            e.preventDefault()
            setIsLoading(true)
          }}
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => {
              setName(e.target.value)
            }}
          />
          <button type="submit" disabled={isLoading}>
            Create Organization
          </button>
        </form>
      </main>
    </div>
  )
}

export default withIdx(CreateOrganization)
