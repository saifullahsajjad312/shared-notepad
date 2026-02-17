import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NoteEditor from './pages/NoteEditor'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notes/:id" element={<NoteEditor />} />
    </Routes>
  )
}

export default App
