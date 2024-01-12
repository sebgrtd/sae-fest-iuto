import React, { useContext } from 'react';
import { CartContext } from '../../../../App.tsx'; // Assurez-vous que le chemin est correct
import { ItemPanier } from './ItemPanier';
import { motion } from 'framer-motion';
import Button from '../../../../components/form/Button';


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
      <svg className="cross" onClick={() => setIsOpen(false)} width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="6.52539" y="0.321533" width="35.8974" height="3.58974" rx="1.79487" transform="rotate(45 6.52539 0.321533)" fill="#E45A3B"/>
  <rect x="3.87891" y="25.5957" width="35.8974" height="3.58974" rx="1.79487" transform="rotate(-45 3.87891 25.5957)" fill="#E45A3B"/>
</svg>
      <div className="container">
        <h2>Mon panier</h2>
        <section className='le-panier'>
          {cart.length > 0 ? (
            cart.map((item) => (
              <ItemPanier
                key={item.id}
                id={item.id}
                typeBillet={item.id}
                title={item.title}
                price={typeof item.price === 'number' ? item.price : parseInt(item.price, 10)}
                quantite={item.quantity}
              />
            ))
          ) : (
            <p>Panier Vide</p>
          )}
        </section>

        <div className="sous-total">
          <h4>Sous total: </h4>
          <h4>{subtotal.toFixed(2)}€</h4>
        </div>

        <Button text="RESERVER"></Button>
      </div>
    </motion.div>
  );
};

export default MenuPanier;