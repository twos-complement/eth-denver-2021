import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'

import { SAMPLE_MY_COLORADO_PAYLOAD } from '../util/mocks'
import IDXContext from '../components/contexts/idx-context'
import { sign } from 'jsonwebtoken'

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
      <div>
        <h1>Verified!</h1>
        <Link href="/">
          <a>Return to Home</a>
        </Link>
      </div>
    )

  return (
    <div>
      <Head>
        <title>Verify Identity With myColorado - 2C | ETHDenver 2021</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Verify Identity With myColorado Digital ID</h1>
        <h2>
          By clicking "Verify", I consent to the State of Colorado publicly
          verifying my IDX ID against myColorado digital ID.
        </h2>
        <button onClick={verify} disabled={verifying}>
          {verifying ? 'Verifying...' : 'Verify'}
        </button>
      </main>
    </div>
  )
}

export default MyColorado
