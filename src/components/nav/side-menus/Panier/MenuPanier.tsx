import React, { useContext, useState } from 'react';
import { CartContext } from '../../../../App.tsx'; // Assurez-vous que le chemin est correct
import { ItemPanier } from './ItemPanier';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../../components/form/Button';
import axios from 'axios';
import { getUserCookie, removeCookie} from '../../../../cookies/CookiesLib.tsx';


type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};


const bubbleVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [1.2, 0.8, 1], 
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.6,
      bounce: 0.3,
    },
  },
  exit: { scale: 0.5, opacity: 0, transition: { duration: 0.3 } }, // Réduire et s'estomper en sortant
};


const MenuPanier: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const { cart, setCart } = useContext(CartContext);
  const [reservationMessage, setReservationMessage] = useState('');
  const [buttonText, setButtonText] = useState('RESERVER');
  const [isButtonDisabled, setIsButtonDisabled] = useState(cart.length === 0);
  

  // Calculer le sous-total
  const subtotal = cart.reduce((acc: number, item: { price: number; quantity: number; }) => acc + item.price * item.quantity, 0);

  const handleCloseMenu = () => {
    setIsOpen(false);
    setReservationMessage('');
    setButtonText('RESERVER'); // Réinitialise le texte du bouton à RESERVER
  };

  const handleReservation = async () => {
    setIsButtonDisabled(true);
    try {
      // ajoutes idUser dans cart
      const user = getUserCookie();
      const newCart = cart.map((item) => {
        item.idUser = user.idUser;
        return item;
      })
      const response = await axios.post('http://51.178.46.205:8080/reserver_billets', newCart);
      console.log(cart);
      if (response.status === 200) {
        setReservationMessage('Merci pour votre achat! 🎉');
        setCart([]); // vide le panier
        removeCookie('cart')
        setButtonText('FERMER'); // Change le texte en “FERMER” après la réservation
        setIsButtonDisabled(false);
      } else {
        throw new Error('Erreur lors de la réservation');
      }
    } catch (error) {
      console.error('Échec de la réservation:', error);
      setReservationMessage('Échec de la réservation, veuillez réessayer.');
      setIsButtonDisabled(cart.length === 0); 
    }
  };
  // gère la fermeture du menu
  const handleButtonClick = () => {
    if (buttonText === 'FERMER') {
      handleCloseMenu(); // appelle la fonction qui gère la fermeture du menu
    } else {
      handleReservation(); 
    }
  };


  React.useEffect(() => {
    setIsButtonDisabled(cart.length === 0 && buttonText !== 'FERMER');
  }, [cart.length, buttonText]);


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
      <svg className="cross" onClick={() => handleCloseMenu()} width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="6.52539" y="0.321533" width="35.8974" height="3.58974" rx="1.79487" transform="rotate(45 6.52539 0.321533)" fill="#E45A3B"/>
  <rect x="3.87891" y="25.5957" width="35.8974" height="3.58974" rx="1.79487" transform="rotate(-45 3.87891 25.5957)" fill="#E45A3B"/>
</svg>
      <div className="container">
        <h2>Mon panier</h2>
        <section className='le-panier'>
          <AnimatePresence>
          {cart.length > 0 ? (
            cart.map((item) => (
              <ItemPanier
                key={item.uniqueId}
                id={item.id}
                typeBillet={item.id}
                title={item.title}
                price={typeof item.price === 'number' ? item.price : parseInt(item.price, 10)}
                quantite={item.quantity}
                selectedDays={item.selectedDaysSortedString ? item.selectedDaysSortedString.split('-') : undefined}
                uniqueId={item.uniqueId}
                />
                ))
                ) : (
                  <p>Panier Vide</p>
                  )}
              </AnimatePresence>
        </section>
        {reservationMessage && (
          <motion.div
            className="reservation-message"
            variants={bubbleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <p>{reservationMessage}</p>
          </motion.div>
        )}
        <div className="sous-total">
          <h4>Sous total: </h4>
          <h4>{subtotal.toFixed(2)}€</h4>
        </div>

        <Button isDisabled={isButtonDisabled} onClick={handleButtonClick} text={buttonText}></Button>
      </div>
    </motion.div>
  );
};

export default MenuPanier;