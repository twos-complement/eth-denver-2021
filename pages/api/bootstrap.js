import bootstrap from '../../util/bootstrap'

export default async (req, res) => {
  await bootstrap()
  res.statusCode = 200
  res.json({ success: true })
}
