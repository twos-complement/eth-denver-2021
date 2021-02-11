import { getIdx } from '../../util/soc-idx'

export default async (req, res) => {
  const idx = await getIdx()
  const challenge = 'makemerandompl0x'

  const docId = await idx.addIdentityVerificationToList({
    did: req.body.did,
    challenge,
  })

  res.statusCode = 200
  res.json({ success: true, docId: docId.toString(), challenge })
}
