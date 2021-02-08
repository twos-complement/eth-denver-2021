import { serialize } from 'cookie'

const Logout = (req, res) => {
  res.statusCode = 200
  res.setHeader('Set-Cookie', serialize('token', '', { maxAge: -1, path: '/' }))
  res.writeHead(302, { Location: '/login' })
  res.end()
}

export default Logout
