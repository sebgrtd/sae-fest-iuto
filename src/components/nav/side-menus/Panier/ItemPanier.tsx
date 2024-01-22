import React, { useContext } from 'react';
import { CartContext } from '../../../../App.tsx'; 
import { setCookie } from '../../../../cookies/CookiesLib.tsx';
import { motion } from 'framer-motion';


type Props = {
    id: number;
    uniqueId: string;
    typeBillet: number,
    title: string,
    price: number,
    quantite: number,
    selectedDays?: Array<string>;
  };



export const ItemPanier: React.FC<Props> = ({ price, quantite, title, selectedDays, uniqueId}) => {
  const { cart, setCart } = useContext(CartContext);

  // Fonction pour enlever un billet du panier
  const removeFromCart = () => {
    const updatedCart = cart.filter((item) => item.uniqueId !== uniqueId);
    setCart(updatedCart);
    setCookie('cart', updatedCart, { expires: 7, sameSite: 'None', secure: true });
  };

  // Fonction pour mettre à jour la quantité d'un billet dans le panier
  const updateQuantity = (newQuantity: number) => {
    const updatedCart = cart.map((item) => {
      if (item.uniqueId === uniqueId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    setCookie('cart', updatedCart, { expires: 7, path: '/' }); 
  };// Ajoutez le chemin si nécessaire

  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20, transition: {duration: 0.1} }
  };

    
  const daysList = selectedDays && (
    <div className="selected-days-container">
      {selectedDays.map(day => (
        <span key={day} className="selected-day-badge">{day}</span>
      ))}
    </div>
  );

  return (
      <motion.div
      className="item-panier"
      layout
      initial="visible"
      animate="visible"
      exit="exit"
      variants={itemVariant}
      key={uniqueId}
      >        <div className="container-item-panier">
            <div className="container-image">
                <img src="/images/billet.png" alt="billet" />
            </div>
            <div className="informations">
              <div className='partie-texte'>
                <div className="textes">
                    <h4>{title}</h4>
                    <h5>{price}€</h5> 
                    <div className="jours">
                    {daysList}
                    </div>
                </div>
                </div>
                <div className="compteur-quantitee">
                    <span className='ajout-retrait' onClick={() => updateQuantity(Math.max(0, quantite - 1))}>-</span>
                    <input type="number" className='quantite' value={quantite} readOnly />
                    <span className='ajout-retrait' onClick={() => updateQuantity(quantite + 1)}>+</span>
                </div>
            </div>
        </div>   
              <img className='cross' src="/icones/cross.svg" alt="croix" onClick={removeFromCart} />
    </motion.div>
  );
};