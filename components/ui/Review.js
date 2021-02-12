import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 20px 0;
`

import FiveStars from './FiveStars'

const Review = ({ review: { stars, description, imageUrl, videoUrl } }) => (
  <Wrapper>
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
  </Wrapper>
)

export default Review
