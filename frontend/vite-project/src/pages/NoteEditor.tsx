import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getNote, updateNote, deleteNote } from '../api'

export default function NoteEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    getNote(id)
      .then(note => {
        setTitle(note.title)
        setContent(note.content)
      })
      .catch(() => setError('Note not found.'))
  }, [id])

  async function handleSave() {
    if (!id) return
    try {
      await updateNote(id, title, content)
      alert('Note saved!')
    } catch {
      alert('Failed to save. Please try again.')
    }
  }

  async function handleDelete() {
    if (!id) return
    await deleteNote(id)
    navigate('/')
  }

  if (error) return <div><p>{error}</p><Link to="/">Back to Home</Link></div>

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/">← Back to Home</Link>
      </div>

      <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: '#888', wordBreak: 'break-all' }}>
        <strong>Note ID:</strong> {id}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <textarea
          placeholder="Start writing..."
          value={content}
          onChange={e => setContent(e.target.value)}
          style={{ height: '65vh', resize: 'vertical' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className="primary" onClick={handleSave}>Save</button>
        <button className="danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}
