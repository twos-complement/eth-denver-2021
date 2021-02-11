import React, { useState, useEffect, useContext } from 'react'

import IDXContext from './idx-context'

const IdentityVerificationsContext = React.createContext()

export const IdentityVerificationsProvider = ({ children }) => {
  const [identityVerifications, setIdentityVerifications] = useState([])
  const idx = useContext(IDXContext)

  async function refresh() {
    const identityVerifications = await idx.loadIdentityVerificationList()
    setIdentityVerifications(identityVerifications)
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <IdentityVerificationsContext.Provider
      value={{ identityVerifications, refresh }}
    >
      {children}
    </IdentityVerificationsContext.Provider>
  )
}

export default IdentityVerificationsContext
