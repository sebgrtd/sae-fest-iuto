import React, { useContext } from 'react';
import { CartContext } from '../../../../App.tsx'; 

type Props = {
  typeBillet: number,
  quantite: number,
};

export const ItemPanier: React.FC<Props> = ({ typeBillet, quantite }) => {
  const { cart, setCart } = useContext(CartContext);

  // Fonction pour enlever un billet du panier
  const removeFromCart = () => {
    const updatedCart = cart.filter((item: { id: number; }) => item.id !== typeBillet);
    setCart(updatedCart);
  };

  // Fonction pour mettre à jour la quantité d'un billet dans le panier
  const updateQuantity = (newQuantity: number) => {
    const updatedCart = cart.map((item: { id: number; }) => {
      if (item.id === typeBillet) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  return (
    <div className="item-panier">
        <div className="container-item-panier">
            <div className="container-image">
                <img src="/images/billet.png" alt="billet" />
            </div>
            <div className="informations">
                <div className="textes">
                    <h4>Pass 1 jour - fosse</h4>
                    <h5>35,99€</h5>
                </div>
                <div className="compteur-quantitee">
                    <span className='ajout-retrait' onClick={() => updateQuantity(Math.max(0, quantite - 1))}>-</span>
                    <input type="number" className='quantite' value={quantite} readOnly />
                    <span className='ajout-retrait' onClick={() => updateQuantity(quantite + 1)}>+</span>
                </div>
                <img className='cross' src="/icones/cross.svg" alt="croix" onClick={removeFromCart} />
            </div>
        </div>   
    </div>
  );
};