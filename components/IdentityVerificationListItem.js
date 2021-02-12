import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import IDXContext from './contexts/idx-context'
import ReviewsContext from './contexts/reviews-context'
import Review from './ui/Review'
import AddReview from './AddReview'

const Wrapper = styled.div`
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.secondary900};
  margin: 20px;
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
      <h3>{identityVerification.did}</h3>
      <ul>
        <li>Challenge: {identityVerification.challenge}</li>
        <li>Name: {identityVerification.name || 'TBD'}</li>
        <li>Verified: {identityVerification.isVerified ? 'YES' : 'NO'}</li>
      </ul>
    </Wrapper>
  )
}
export default IdentityVerificationListItem
