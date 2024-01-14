import './index.css'
import './components/nav/Navbar'
import Navbar from './components/nav/Navbar'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Accueil from './pages/Accueil/Accueil'
import { createContext, useEffect, useState } from 'react'
import Programmation from './pages/Programmation/Programmation'
import PageArtiste from './pages/Evenement/PageEvenement'
import Billeterie from './pages/Billeterie/Billeterie'
import Faq from './pages/faq/Faq'
import { getCookie } from './cookies/CookiesLib'  
interface cartContext{
  cart: any[],
  setCart: (cart: any[]) => void,
}


export const CartContext = createContext<cartContext>({
  cart: [],
  setCart: () => {},
})

function App() {
  const [cart, setCart] = useState<any[]>(() => getCookie('cart') || []);
  const [isNavInFocus, setIsNavInFocus] = useState(false)
  const[isNavTransparent, setIsNavTransparent] = useState(true);
  const location = useLocation();
  

  useEffect(() => {

  }, []);


  return (
    <CartContext.Provider value = {{cart, setCart}}>
      <Navbar setNavInFocus={setIsNavInFocus} isTransparent={isNavTransparent}/>
      <AnimatePresence>

        <Routes location={location} key={location.key}>
            <Route path="/" element={<Accueil isNavInFocus={isNavInFocus} setIsNavTransparent={setIsNavTransparent}  />} />
            <Route path="/programmation" element={<Programmation isNavInFocus={isNavInFocus} setIsNavTransparent={setIsNavTransparent} />} />
            <Route path="/billeterie" element={<Billeterie isNavInFocus={isNavInFocus} setIsNavTransparent={setIsNavTransparent} />} />
            <Route path="/faq" element={<Faq isNavInFocus={isNavInFocus} setIsNavTransparent={setIsNavTransparent} />}/>
            <Route path="/artiste" element={<PageArtiste />}/>
        </Routes>

      </AnimatePresence>
    </CartContext.Provider>
  )
}

export default App
