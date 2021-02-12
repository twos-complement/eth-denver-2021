import times from 'lodash/times'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Star = styled.div`
  &:before {
    content: '☆';
    font-size: 5rem;
    color: ${({ isActive }) => (isActive ? 'orange' : 'gray')};
    cursor: pointer;
  }
`

const FiveStars = ({ onClick, stars = 0 }) => (
  <Wrapper>
    {times(5, i => (
      <Star key={i} isActive={stars > i} onClick={() => onClick(i + 1)} />
    ))}
  </Wrapper>
)

export default FiveStars
