import './index.css'
import './components/nav/Navbar'
import Navbar from './components/nav/Navbar'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import Accueil from './pages/Accueil/Accueil'
import { useState } from 'react'

function App() {
  const [isNavInFocus, setIsNavInFocus] = useState(false)

  return (
    <>
      <Navbar setNavInFocus={setIsNavInFocus}/>

      <AnimatePresence>

        <Routes>
            <Route path="/" element={<Accueil isNavInFocus={isNavInFocus} />} />
            <Route path="/programmation" />
            <Route path="/billeterie" />
            <Route path="/faq"/>
        </Routes>

      </AnimatePresence>
    </>
  )
}

export default App
