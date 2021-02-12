import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import IDXContext from './contexts/idx-context'
import ReviewsContext from './contexts/reviews-context'
import Review from './ui/Review'
import AddReview from './AddReview'

const Wrapper = styled.div`
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.secondary900};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const OrganizationListItem = ({ id }) => {
  const [organization, setOrganization] = useState()
  const idx = useContext(IDXContext)
  const { reviews } = useContext(ReviewsContext)

  useEffect(() => {
    async function load() {
      const org = await idx.loadOrganization(id)
      setOrganization(org.state.content)
    }

    load()
  }, [])

  const review = reviews.filter(review => review.organization.match(id))[0]

  return (
    <Wrapper>
      <h4>
        {organization ? organization.name : `Loading [${id}] from Ceramic...`}
      </h4>
      {review && <Review review={review} />}
      {!review && <AddReview organization={id} />}
    </Wrapper>
  )
}
export default OrganizationListItem
