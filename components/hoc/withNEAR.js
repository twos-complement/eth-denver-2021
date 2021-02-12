import React, { useState, useEffect } from 'react'

import { initContract } from '../../util/near'

const withNEAR = WrappedComponent => {
  const NEARComponent = props => {
    const [contract, setContract] = useState()

    useEffect(async () => {
      console.log('Initializing NFT contract')
      setContract(await initContract())
      console.log('NFT Contract initialized')
    }, [])

    if (!contract) {
      return <h1>Loading NFTs...</h1>
    }

    return (
      <WrappedComponent {...props} contract={contract}>
        {props.children}
      </WrappedComponent>
    )
  }

  return NEARComponent
}

export default withNEAR
