import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import IDXContext from './contexts/idx-context'
import DID from './ui/DID'

const Wrapper = styled.div`
  background: #efefef;
  padding: 20px;
`

const IdentityVerificationListItem = ({ id }) => {
  const [identityVerification, setIdentityVerification] = useState()
  const idx = useContext(IDXContext)

  useEffect(() => {
    async function load() {
      const doc = await idx.loadIdentityVerification(id)
      setIdentityVerification(doc.content)
    }

    load()
  }, [])

  if (!identityVerification) return <p>Loading [{id}] from Ceramic...</p>

  return (
    <Wrapper>
      <DID>{identityVerification.did}</DID>
      <ul>
        <li>Challenge: {identityVerification.challenge}</li>
        <li>Name: {identityVerification.name || 'TBD'}</li>
        <li>Verified: {identityVerification.isVerified ? 'YES' : 'NO'}</li>
      </ul>
    </Wrapper>
  )
}
export default IdentityVerificationListItem
