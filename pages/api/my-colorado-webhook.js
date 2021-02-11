import { getIdx } from '../../util/soc-idx'

export default async (req, res) => {
  const idx = await getIdx()

  console.log(req.body)

  const docId = await idx.verifyIdentity({
    docId: req.body.MerchantPassthruData.Message,
    signedChallenge: req.body.MerchantPassthruData.ControlCode,
    name: req.body.FirstName,
  })

  res.statusCode = 200
  res.json({ success: true, docId: docId.toString(), name: req.body.FirstName })
}
