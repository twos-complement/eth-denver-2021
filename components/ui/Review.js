import { useState, useContext } from 'react'

import FiveStars from './FiveStars'

const Review = ({ review: { stars, description } }) => (
  <div>
    <p>Your review:</p>
    <FiveStars stars={stars} />
    <p>{description}</p>
  </div>
)

export default Review
