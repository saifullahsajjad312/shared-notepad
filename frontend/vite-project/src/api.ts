const API_URL = "https://stockless-jaimee-summarily.ngrok-free.dev"
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true',
}

export interface NoteListItem {
  id: string
  title: string
  created_at: string
  updated_at: string
}

export interface Note {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

export async function createNote(): Promise<Note> {
  const res = await fetch(`${API_URL}/notes`, { method: 'POST', headers: HEADERS, body: '{}' })
  return res.json()
}

export async function listNotes(): Promise<NoteListItem[]> {
  const res = await fetch(`${API_URL}/notes`, { headers: HEADERS })
  return res.json()
}

export async function getNote(id: string): Promise<Note> {
  const res = await fetch(`${API_URL}/notes/${id}`, { headers: HEADERS })
  if (!res.ok) throw new Error('Note not found')
  return res.json()
}

export async function updateNote(id: string, title: string, content: string): Promise<Note> {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify({ title, content }),
  })
  return res.json()
}

export async function deleteNote(id: string): Promise<void> {
  await fetch(`${API_URL}/notes/${id}`, { method: 'DELETE', headers: HEADERS })
}
