import { useState, useContext } from 'react'

import IDXContext from './contexts/idx-context'
import FiveStars from './ui/FiveStars'

const AddReview = ({ organizationId }) => {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const [description, setDescription] = useState('')
  const [stars, setStars] = useState(0)
  const idx = useContext(IDXContext)

  if (complete) return <div>Thanks for leaving a review!</div>

  if (loading) return <div>Posting review on Ceramic...</div>

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
            organizationId,
            stars,
            description,
          })
          setComplete(true)
        }}
      >
        <FiveStars onClick={value => setStars(value)} stars={stars} />
        <textarea
          onChange={e => setDescription(e.target.value)}
          placeholder="Add your review..."
          value={description}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddReview
