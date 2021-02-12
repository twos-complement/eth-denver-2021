import { useEffect, useState, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'
import styled, { css } from 'styled-components'

const SubText = styled.h5``
const Title = styled.p``

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

const Dropzone = ({ onComplete, accept, autoSubmit }) => {
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

    await onComplete(acceptedFiles, () => {
      // Callback:
      setLoader({
        title: 'Success!',
        subText: 'Your file has been successfully uploaded and pinned to IPFS!',
      })
    })
  }

  useEffect(async () => {
    if (!loader && autoSubmit && isHasFilesToUpload) {
      await submit()
    }
  })

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
          <SubText>{loader.subText}</SubText>
          <Title>{loader.title}</Title>
        </div>
      )}
    </div>
  )
}

Dropzone.defaultProps = {
  accept: 'image/*',
  autoSubmit: false,
}

export default Dropzone
