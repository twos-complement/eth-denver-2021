import { useState, useEffect } from 'react'

import withIdx from './hoc/withIdx'

const OrganizationListItem = ({ idx, ceramic }) => {
  const [name, setName] = useState()

  useEffect(() => {
    async function loadOrganization() {
      const resp = await idx.instance.ceramic.loadDocument(ceramic)
      setName(resp.state.content.name)
    }

    loadOrganization()
  })

  return (
    <li>
      {!name && 'Loading Organization...'}
      {name && name}
    </li>
  )
}

export default withIdx(OrganizationListItem)
