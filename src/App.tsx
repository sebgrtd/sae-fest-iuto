import './index.css'
import './components/nav/Navbar'
import Navbar from './components/nav/Navbar'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Accueil from './pages/Accueil/Accueil'
import { useState } from 'react'
import Programmation from './pages/Programmation/Programmation'
import PageArtiste from './pages/Artiste/PageArtiste'

function App() {
  const [isNavInFocus, setIsNavInFocus] = useState(false)
  const[isNavTransparent, setIsNavTransparent] = useState(true);
  const location = useLocation();

  return (
    <>
      <Navbar setNavInFocus={setIsNavInFocus} isTransparent={isNavTransparent}/>
      <AnimatePresence>

        <Routes location={location} key={location.key}>
            <Route path="/" element={<Accueil isNavInFocus={isNavInFocus} setIsNavTransparent={setIsNavTransparent}  />} />
            <Route path="/programmation" element={<Programmation isNavInFocus={isNavInFocus} setIsNavTransparent={setIsNavTransparent} />} />
            <Route path="/billeterie" />
            <Route path="/faq"/>
            <Route path="/artiste" element={<PageArtiste />}/>
        </Routes>

      </AnimatePresence>
    </>
  )
}

export default App
