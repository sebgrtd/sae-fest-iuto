import './index.css'
import './components/nav/Navbar'
import Navbar from './components/nav/Navbar'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar/>

      <AnimatePresence>

        <Routes>
            <Route path="/" />
            <Route path="/programmation" />
            <Route path="/billeterie" />
            <Route path="/faq"/>
        </Routes>

      </AnimatePresence>
    </>
  )
}

export default App
