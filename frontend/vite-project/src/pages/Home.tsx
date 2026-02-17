import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createNote, listNotes } from '../api'
import type { NoteListItem } from '../api'

export default function Home() {
  const navigate = useNavigate()
  const [notes, setNotes] = useState<NoteListItem[]>([])
  const [openId, setOpenId] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    listNotes()
      .then(notes => setNotes(notes.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())))
      .catch(console.error)
  }, [])

  async function handleCreate() {
    setCreating(true)
    const note = await createNote()
    navigate(`/notes/${note.id}`)
  }

  function handleOpen() {
    if (openId.trim()) navigate(`/notes/${openId.trim()}`)
  }

  return (
    <div>
      <h1>Shared Notepad</h1>

      <section style={{ marginBottom: '2rem' }}>
        <button className="primary" onClick={handleCreate} disabled={creating}>
          {creating ? 'Creating...' : 'Create New Note'}
        </button>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Open by ID</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Paste note ID here"
            value={openId}
            onChange={e => setOpenId(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleOpen()}
          />
          <button onClick={handleOpen} style={{ whiteSpace: 'nowrap' }}>Open</button>
        </div>
      </section>

      <section>
        <h2>All Notes</h2>
        {notes.length === 0 && <p style={{ color: '#888' }}>No notes yet.</p>}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {notes.map(note => (
            <li key={note.id} style={{ borderBottom: '1px solid #eee', padding: '0.75rem 0' }}>
              <Link to={`/notes/${note.id}`}>
                <strong>{note.title || '(untitled)'}</strong>
              </Link>
              <div style={{ fontSize: '0.85rem', color: '#888' }}>
                {new Date(note.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
