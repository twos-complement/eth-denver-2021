import React, { useState, useEffect } from 'react'
import { EthereumAuthProvider } from '3id-connect'
import { ThreeIdConnect } from '3id-connect'

import IDX from '../../util/IDX'
import ceramic from '../../util/ceramic'
import aliases from '../../util/aliases'

const withIdx = WrappedComponent => {
  const IdxComponent = props => {
    const [idx, setIdx] = useState()
    const [account, setAccount] = useState({})

    useEffect(() => {
      // TODO: upgrade to js-3id-id-provider, and remove 3id-connect:
      const threeIdConnect = new ThreeIdConnect()

      // Inject IDX identity provider:
      async function setup() {
        // Authenticate with ethereum wallet:
        const idx = new IDX({ ceramic, aliases })
        const addresses = await window.ethereum.enable()
        const authProvider = new EthereumAuthProvider(
          window.ethereum,
          addresses[0],
        )
        // Connect wallet:
        await threeIdConnect.connect(authProvider)
        // Get DID Provider:
        const provider = await threeIdConnect.getDidProvider()
        // Set DID Provider on Ceramic:
        await ceramic.setDIDProvider(provider)

        setIdx(idx)

        const accountId = await idx.getIdentity()

        setAccount({ id: accountId })
      }

      setup()
    }, [])

    if (!idx) {
      return <h1>Loading IDX...</h1>
    }

    return (
      <WrappedComponent {...props} idx={idx} account={account}>
        {props.children}
      </WrappedComponent>
    )
  }

  return IdxComponent
}

export default withIdx
