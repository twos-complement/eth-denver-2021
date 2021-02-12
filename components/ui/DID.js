import styled from 'styled-components'

const Wrapper = styled.h4`
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`

const DID = ({ children }) => (
  <Wrapper>
    {children.slice(0, 10)}...
    {children.slice(children.length - 4, children.length)}
  </Wrapper>
)

export default DID
