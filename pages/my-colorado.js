import { useState, useContext } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'

import { SAMPLE_MY_COLORADO_PAYLOAD } from '../util/mocks'
import IDXContext from '../components/contexts/idx-context'

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  align-content: center;
  padding: 40px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;

  > * {
    padding-bottom: 30px;
  }
`

const MyColorado = () => {
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const idx = useContext(IDXContext)

  async function verify() {
    setVerifying(true)

    // Create identityVerification, and get challenge:
    const {
      data: { docId, challenge },
    } = await axios.post('/api/create-identity-verification', {
      did: idx.instance.id,
    })

    // Sign challenge:
    const signedChallenge = await idx.ceramic.did.createJWS(challenge)
    console.log('signed challenge', signedChallenge)
    console.log('Simulating myColorado auth initialization:', {
      docId,
      signedChallenge,
    })

    // Simulate myColorado auth, trigger webhook:
    const resp = await axios.post('/api/my-colorado-webhook', {
      ...SAMPLE_MY_COLORADO_PAYLOAD,
      MerchantPassthruData: {
        Message: docId,
        ControlCode: signedChallenge,
      },
    })

    setVerifying(false)
    setVerified(true)
  }

  if (verified)
    return (
      <Wrapper>
        <Content>
          <img src="/scout1.png" width="200" />
          <h1>Verified!</h1>
          <Link href="/">
            <a>Return to Home</a>
          </Link>
        </Content>
      </Wrapper>
    )

  return (
    <div>
      <Head>
        <title>Verify Identity With myColorado - 2C | ETHDenver 2021</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Wrapper>
          <Content>
            <h2>Verify Identity With myColorado Digital ID</h2>
            <h5>
              By clicking "Verify", I consent to the State of Colorado publicly
              verifying my IDX ID against myColorado digital ID.
            </h5>
            <button onClick={verify} disabled={verifying}>
              {verifying ? 'Verifying...' : 'Verify'}
            </button>
          </Content>
        </Wrapper>
      </main>
    </div>
  )
}

export default MyColorado
