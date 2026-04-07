import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ArchivePage from './pages/ArchivePage'
import BriefPage from './pages/BriefPage'

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/brief/:date" element={<BriefPage />} />
        </Routes>
      </main>
    </div>
  )
}
