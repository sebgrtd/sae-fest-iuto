import React, { useContext } from 'react';
import { CartContext } from '../../../../App.tsx'; 
import { setCookie } from '../../../../cookies/CookiesLib.tsx';


type Props = {
    id: number;
    typeBillet: number,
    title: string,
    price: number,
    quantite: number,
  };

export const ItemPanier: React.FC<Props> = ({ typeBillet, price, quantite, title}) => {
  const { cart, setCart } = useContext(CartContext);

  // Fonction pour enlever un billet du panier
  const removeFromCart = () => {
    const updatedCart = cart.filter((item: { id: number; }) => item.id !== typeBillet);
    setCart(updatedCart);
    setCookie('cart', updatedCart, { expires: 7, sameSite: 'None', secure: true })
  };

  // Fonction pour mettre à jour la quantité d'un billet dans le panier
  const updateQuantity = (newQuantity: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === typeBillet) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    setCookie('cart', updatedCart, { expires: 7, path: '/' }); // Ajoutez le chemin si nécessaire
  };

  return (
    <div className="item-panier">
        <div className="container-item-panier">
            <div className="container-image">
                <img src="/images/billet.png" alt="billet" />
            </div>
            <div className="informations">
              <div className='partie-texte'>
                <div className="textes">
                    <h4>{title}</h4>
                    <h5>{price}€</h5> 
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
    </div>
  );
};