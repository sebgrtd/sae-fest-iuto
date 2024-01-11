import React, { useContext } from 'react';
import { CartContext } from '../../../../App.tsx'; // Assurez-vous que le chemin est correct
import { ItemPanier } from './ItemPanier';
import { motion } from 'framer-motion';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const MenuPanier: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const { cart } = useContext(CartContext);

  // Calculer le sous-total
  const subtotal = cart.reduce((acc: number, item: { price: number; quantity: number; }) => acc + item.price * item.quantity, 0);

  const menuVariants = {
    hidden: {
      x: '42rem',
      transition: {
        duration: 0.5,
        ease: [1, -0.02, 0, 1]
      }
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.5,
        ease: [1, -0.02, 0, 1]
      }
    },
  };

  return (
    <motion.div
      className="side-menu cart"
      variants={menuVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
    >
      <img className="cross" onClick={() => setIsOpen(false)}>
            {/* SVG ou autre élément pour fermer le panier */}
      </img>
      <div className="container">
        <h2>Mon panier</h2>
        <section className='le-panier'>
          {cart.map((item) => (
            <ItemPanier 
              key={item.id}
              id={item.id}
              typeBillet={item.id}
              title={item.title}
              price={typeof item.price === 'number' ? item.price : parseInt(item.price, 10)}
              quantite={item.quantity}
            />
          ))}
        </section>
        <div className="sous-total">
          <h4>Sous total: </h4>
          <h4>{subtotal.toFixed(2)}€</h4>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuPanier;