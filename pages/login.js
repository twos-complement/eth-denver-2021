import Head from 'next/head'

export default function Login() {
  return (
    <div>
      <Head>
        <title>2C Vercel Client Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <a href={process.env.NEXT_PUBLIC_LOGIN_PATH}>Login</a>
      </main>
    </div>
  )
}
