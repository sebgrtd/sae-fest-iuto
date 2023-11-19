import './index.css'
import './components/nav/Navbar'
import Navbar from './components/nav/Navbar'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import Accueil from './pages/Accueil/Accueil'

function App() {
  return (
    <>
      <Navbar/>

      <AnimatePresence>

        <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/programmation" />
            <Route path="/billeterie" />
            <Route path="/faq"/>
        </Routes>

      </AnimatePresence>
    </>
  )
}

export default App
