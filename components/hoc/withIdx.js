import React, { useState, useEffect } from 'react'
import { EthereumAuthProvider } from '3id-connect'
import IDX from '../../util/IDX'
import ceramic from '../../util/ceramic'

const withIdx = WrappedComponent => {
  const IdxComponent = props => {
    const [idx, setIdx] = useState()

    useEffect(() => {
      // Inject IDX identity provider:
      async function setup() {
        const idx = new IDX()
        const addresses = await window.ethereum.enable()
        // Metamask by default (TODO: add myColorado option)
        console.log(addresses)
        const authProvider = new EthereumAuthProvider(
          window.ethereum,
          addresses[0],
        )
        // Connect wallet:
        await idx.threeIdConnect.connect(authProvider)
        // Get DID Provider:
        const provider = await idx.threeIdConnect.getDidProvider()
        // Set DID Provider on Ceramic:
        await ceramic.setDIDProvider(provider)

        setIdx(idx.instance)
      }

      setup()
    }, [])

    return (
      <WrappedComponent {...props} idx={idx}>
        {props.children}
      </WrappedComponent>
    )
  }

  return IdxComponent
}

export default withIdx
