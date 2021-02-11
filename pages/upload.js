import { useState, Fragment } from 'react'
import createClient from 'ipfs-http-client'
import Head from 'next/head'
import { useDropzone } from 'react-dropzone'
import styled, { css } from 'styled-components'

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const Wrapper = styled.div`
  display: grid;
`

const Fields = styled.div`
  display: grid;
  grid-row-gap: 20px;
`

const getColor = ({ isDragAccept, isDragReject, isDragActive }) => {
  if (isDragAccept) {
    return '#00e676'
  }

  if (isDragReject) {
    return '#ff1744'
  }

  if (isDragActive) {
    return '#2196f3'
  }

  return '#eeeeee'
}

const DropzoneContainer = styled.div`
  ${({ theme: { bp, dp, ...theme }, ...props }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
  `}
`

const Dropzone = ({ onComplete, accept }) => {
  const [title, setTitle] = useState('')
  const [loader, setLoader] = useState(false)
  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept,
    onDrop: files => {
      setTitle(files[0].name)
    },
  })

  const isHasFilesToUpload = acceptedFiles.length > 0

  async function submit() {
    // Upload file to IPFS:
    setLoader({
      title: 'Uploading...',
      subText: 'We are sending your file to IPFS for safekeeping',
    })

    setTimeout(async () => {
      // Callback:
      setLoader({
        title: 'Success!',
        subText: 'Redirecting back to your reviews',
      })
      await onComplete(acceptedFiles)
    }, 300)
  }

  function renderForm() {
    return (
      <Fragment>
        <Fields>
          <DropzoneContainer
            {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </DropzoneContainer>

          <input
            type="text"
            name="title"
            placeholder="Filename"
            onChange={e => setTitle(e.target.value)}
            value={title}
            variant="outlined"
          />

          {isHasFilesToUpload && (
            <div>
              <button color="default" variant="contained" onClick={submit}>
                Upload
              </button>
            </div>
          )}
        </Fields>
      </Fragment>
    )
  }

  return (
    <div>
      {!loader && renderForm()}
      {loader && (
        <div>
          <h4>{loader.subText}</h4>
          {loader.title}
        </div>
      )}
    </div>
  )
}

Dropzone.defaultProps = {
  accept: 'image/*',
}

export default function Upload() {
  const [src, setSrc] = useState(
    'https://ipfs.infura.io/ipfs/QmZAnYYs5xM9zpLaUoY5EZVJE9vHHMdb9qYQhbTa9DZBXD?filename=eclipse.jpeg',
  )

   const [videoSrc, setVideoSrc] = useState('https://ipfs.infura.io/ipfs/QmfPC6LFfhCXmjD9yDU4vFQj2zuAmYiz2z7VtWSg3GXGcF?filename=sample-mov-file.mov'
  )


  const uploadImage = async acceptedFiles => {
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

      console.log(`Image Url --> ${url}`)

      setSrc(url)
    }

    reader.readAsArrayBuffer(file)
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

      setVideoSrc(url)
    }

    reader.readAsArrayBuffer(file)
  }

  return (
    <div>
      <Head>
        <title>Review Image Upload</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <div>
      <h3>Upload Image</h3>
        <img src={src}></img>
        <Dropzone onComplete={uploadImage} />
        </div>
        <div>
      <h3>Upload Video</h3>
        <video controls width="250">
        <source src={videoSrc}/></video>
        <Dropzone onComplete={uploadVideo} accept="video/*"/>
        </div>
      </main>
    </div>
  )
}
