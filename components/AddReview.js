import { useState, useContext } from 'react'
import styled from 'styled-components'
import createClient from 'ipfs-http-client'

import Dropzone from '../components/ui/Dropzone'
import IDXContext from './contexts/idx-context'
import ReviewsContext from './contexts/reviews-context'
import FiveStars from './ui/FiveStars'

const Textarea = styled.textarea`
  width: 100%;
  height: 300px;
  font-size: 1.7rem;
  padding: 20px;
  height: 120px;
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
`

const AddReview = ({ organization }) => {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const [description, setDescription] = useState('')
  const [stars, setStars] = useState(0)
  const idx = useContext(IDXContext)
  const { refresh } = useContext(ReviewsContext)
  const [imageUrl, setImageUrl] = useState()
  const [videoUrl, setVideoUrl] = useState()

  const uploadImage = async (acceptedFiles, callback) => {
    const file = acceptedFiles[0]
    const ipfs = createClient('https://ipfs.infura.io:5001')

    console.log('Uploading: ', file.path)

    const ipfsUpload = new Promise(async (resolve, reject) => {
      const reader = new FileReader()

      reader.onload = async () => {
        var arrayBuffer = reader.result
        const fileBuffer = new Uint8Array(arrayBuffer)

        const z = await ipfs.add({ path: file.path, content: fileBuffer })

        let url = `https://ipfs.infura.io/ipfs/${z.cid.toString()}?filename=${
          z.path
        }`

        console.log(`Image Url --> ${url}`)

        setImageUrl(url)

        callback(url)
        resolve(url)
      }

      reader.onerror = async error => reject(reader.error)

      reader.readAsArrayBuffer(file)
    })

    await Promise.all([ipfsUpload])
  }

  const uploadVideo = async acceptedFiles => {
    const file = acceptedFiles[0]
    const ipfs = createClient('https://ipfs.infura.io:5001')
    const reader = new FileReader()

    console.log('Uploading: ', file.path)

    reader.onload = async () => {
      var arrayBuffer = reader.result
      const fileBuffer = new Uint8Array(arrayBuffer)

      const z = await ipfs.add({ path: file.path, content: fileBuffer })

      let url = `https://ipfs.infura.io/ipfs/${z.cid.toString()}?filename=${
        z.path
      }`

      console.log(`Video Url --> ${url}`)

      setVideoUrl(url)
    }

    reader.readAsArrayBuffer(file)
  }
  if (complete) return <></>

  if (loading) return <h4>Posting review on Ceramic...</h4>

  if (!showForm)
    return (
      <a
        href="#"
        onClick={e => {
          e.preventDefault()
          setShowForm(true)
        }}
      >
        Add Review
      </a>
    )

  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault()
          setLoading(true)
          await idx.addReviewToList({
            organization,
            stars,
            description,
            imageUrl,
            videoUrl,
          })
          await refresh()
          setComplete(true)
        }}
      >
        <ContentGrid>
          <FiveStars onClick={value => setStars(value)} stars={stars} />
          <Textarea
            onChange={e => setDescription(e.target.value)}
            placeholder="Add your review..."
            value={description}
          />

          <div>
            <h4>Upload Image</h4>
            <br />
            {!!imageUrl && <img src={imageUrl}></img>}
            <Dropzone autoSubmit onComplete={uploadImage} />
          </div>

          <div>
            <h4>Upload Video</h4>
            <br />
            {!!videoUrl && (
              <video controls width="250">
                <source src={videoUrl} />
              </video>
            )}
            <Dropzone autoSubmit onComplete={uploadVideo} accept="video/*" />
          </div>

          <button type="submit">Submit</button>
        </ContentGrid>
      </form>
    </div>
  )
}

export default AddReview
