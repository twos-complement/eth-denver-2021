import { useState, useContext } from 'react'

import FiveStars from './FiveStars'

const Review = ({ review: { stars, description, imageUrl, videoUrl } }) => (
  <div>
    <p>Your review:</p>
    <FiveStars stars={stars} />
    <p>{description}</p>

    {!!imageUrl && (
      <div>
        <img src={imageUrl}></img>
      </div>
    )}

    {!!imageUrl && (
      <div>
        {!!videoUrl && (
          <video controls width="250">
            <source src={videoUrl} />
          </video>
        )}
      </div>
    )}
  </div>
)

export default Review
