import { getIdx } from '../../util/soc-idx'

//TODO: Authenticate with SoC SSO:
export default async (req, res) => {
  const idx = await getIdx()
  const organization = {
    name: req.body.name,
  }
  const docid = await idx.addOrganizationToList(organization)

  res.statusCode = 200
  res.json({ success: true, docid: docid.toString(), organization })
}
