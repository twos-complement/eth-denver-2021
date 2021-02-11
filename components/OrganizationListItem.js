import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import IDXContext from './contexts/idx-context'
import AddReview from './AddReview'

const Wrapper = styled.div`
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.secondary900};
  margin: 20px;
  padding: 20px;
`

const OrganizationListItem = ({ id }) => {
  const [organization, setOrganization] = useState()
  const idx = useContext(IDXContext)

  useEffect(() => {
    async function load() {
      const org = await idx.loadOrganization(id)
      setOrganization(org.state.content)
    }

    load()
  }, [])

  return (
    <Wrapper>
      <h3>
        {organization ? organization.name : `Loading [${id}] from Ceramic...`}
      </h3>
      <AddReview organizationId={id} />
    </Wrapper>
  )
}
export default OrganizationListItem
