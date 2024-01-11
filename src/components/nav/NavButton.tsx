
import { useContext, useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion';
import { easeOut } from 'framer-motion/dom';
import { setCookie, getCookie } from '../../cookies/CookiesLib';
import { CartContext } from '../../App';


type Props =
 {
    isCart? : boolean
    setIsOpen: (isOpen : boolean) => void;
}

export default function NavButton(props:Props) {
    const [cartItemCount, setCartItemCount] = useState(0);
    const {cart, setCart} = useContext(CartContext);
    const controls = useAnimation();

    
    const popAnim = {
    scale: [1, 1.5, 1], // de sa taille a 1,5x fois sa taille puis retour a sa taille initiale
    transition: { duration: 0.5 }, 
  };

      
    // Handler pour mettre à jour le nombre total d’articles dans l’état local
    const updateCartItemCount = () => {
    const cartItems = getCookie('cart');
    if (cartItems) {
        const total = cartItems.reduce((sum: number, item: { quantity: number; }) => sum + item.quantity, 0);
            setCartItemCount(total);
        }else {
            setCartItemCount(0);
          }
        };
        useEffect(() => {
          updateCartItemCount();
          if (cart.length > 0) {
            controls.start(popAnim); // Trigger the animation
          }
        }, [cart]);


  const bgVariants = {
    default : {
        backgroundColor: '#E45A3B00',
        stroke: "#E45A3B",
        transition:{
            duration: 0.3,
            ease:easeOut,
        }
    },
    hover: {
        backgroundColor: '#E45A3B',
        stroke: "#FFFBEE",
        transition:{
            duration: 0.3,
            ease:easeOut,
        }
    }
  }

  return (
    <motion.div className='nav-btn' 
    variants={bgVariants}
    initial='default'
    whileHover="hover"
    onClick={() => props.setIsOpen(true)}
    >
               
               {props.isCart ?
         <>
         {cartItemCount > 0 && (
            <motion.div
            animate={controls}
            className="cart-notification"
          >
            {cartItemCount}
          </motion.div>
         )}
            <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.4856 30.6457C13.1125 30.6457 13.6206 30.1375 13.6206 29.5106C13.6206 28.8838 13.1125 28.3756 12.4856 28.3756C11.8588 28.3756 11.3506 28.8838 11.3506 29.5106C11.3506 30.1375 11.8588 30.6457 12.4856 30.6457Z" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28.3753 30.6457C29.0021 30.6457 29.5103 30.1375 29.5103 29.5106C29.5103 28.8838 29.0021 28.3756 28.3753 28.3756C27.7484 28.3756 27.2402 28.8838 27.2402 29.5106C27.2402 30.1375 27.7484 30.6457 28.3753 30.6457Z" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.40527 5.67517H7.94537L11.3504 24.9706H29.5108" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.3501 20.4304H29.0451C29.1764 20.4305 29.3036 20.3851 29.4051 20.302C29.5067 20.2188 29.5763 20.103 29.602 19.9743L31.6451 9.75909C31.6615 9.67672 31.6595 9.59171 31.6392 9.51021C31.6188 9.42871 31.5806 9.35274 31.5274 9.28779C31.4741 9.22284 31.4071 9.17053 31.3311 9.13463C31.2552 9.09873 31.1722 9.08014 31.0882 9.0802H9.08008" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
         </>
        : 
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M23.5154 9.84375C23.2474 13.4579 20.5076 16.4062 17.4998 16.4062C14.4919 16.4062 11.7473 13.4586 11.4841 9.84375C11.2107 6.08398 13.8767 3.28125 17.4998 3.28125C21.1228 3.28125 23.7888 6.15234 23.5154 9.84375Z" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17.5002 20.7812C11.5529 20.7812 5.51677 24.0625 4.39978 30.2559C4.26511 31.0023 4.68757 31.7188 5.46892 31.7188H29.5314C30.3134 31.7188 30.7359 31.0023 30.6012 30.2559C29.4836 24.0625 23.4474 20.7812 17.5002 20.7812Z" stroke-width="3" stroke-miterlimit="10"/>
        </svg>
        }

    </motion.div>
)
}