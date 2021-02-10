import ThreeIdProvider from '3id-did-provider'
import IDX from './IDX'
import ceramic from './ceramic'
import aliases from './aliases'

let idx

export async function getIdx() {
  if (idx) return idx

  //TODO make private:
  const seed = Uint8Array.from(
    '0dddac007ef6cff35111267b443cad45b44641716dc1ddbc191f2dc6acbf7473',
  )

  // Permission dialog (auto accept for SoC):
  function getPermission(request) {
    return request.payload.paths
  }

  // Create auth provider:
  const threeId = await ThreeIdProvider.create({ getPermission, seed, ceramic })
  const provider = threeId.getDidProvider()

  // Set DID provider for ceramic:
  await ceramic.setDIDProvider(provider)

  // Create (and memoize) idx instance:
  idx = new IDX({
    ceramic,
    aliases,
  })

  // Log meta:
  console.log('Initialized State of Colorado DID.')
  console.log(`DID: ${idx.instance.id}`)
  console.log('Index:')
  console.log(await idx.instance.getIndex())

  return idx
}

export default idx
