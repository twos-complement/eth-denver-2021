import { serialize } from 'cookie'

const SetToken = (req, res) => {
  if (!req.body.token) {
    res.statusCode = 401
    return res.json({ success: false })
  }

  res.statusCode = 200
  res.setHeader('Set-Cookie', serialize('token', req.body.token, { path: '/' }))
  res.json({ success: true })
}

export default SetToken
