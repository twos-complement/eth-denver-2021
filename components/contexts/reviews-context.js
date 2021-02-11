import React, { useState, useEffect, useContext } from 'react'

import IDXContext from './idx-context'

const ReviewsContext = React.createContext()

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState()
  const idx = useContext(IDXContext)

  async function refresh() {
    const reviews = await idx.loadReviewsList()
    setReviews(reviews)
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <ReviewsContext.Provider value={{ reviews, refresh }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export default ReviewsContext
