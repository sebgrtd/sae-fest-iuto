import './index.css'
import './components/nav/Navbar'
import Navbar from './components/nav/Navbar'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import Accueil from './pages/Accueil/Accueil'
import { useState } from 'react'

function App() {
  const [isNavInFocus, setIsNavInFocus] = useState(false)
  const[isNavTransparent, setIsNavTransparent] = useState(true);

  return (
    <>
      <Navbar setNavInFocus={setIsNavInFocus} isTransparent={isNavTransparent}/>
      <AnimatePresence>

        <Routes>
            <Route path="/" element={<Accueil isNavInFocus={isNavInFocus} setIsNavTransparent={setIsNavTransparent}  />} />
            <Route path="/programmation" />
            <Route path="/billeterie" />
            <Route path="/faq"/>
        </Routes>

      </AnimatePresence>
    </>
  )
}

export default App
