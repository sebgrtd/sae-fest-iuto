import React from 'react'
import {useState} from 'react';

type Props = {
    typeBillet: number,
    quantite: number,
}

export default function ItemPanier(props: Props) {
  const [quantite, setQuantite] = useState(props.quantite);

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
                    <span className='ajout-retrait' onClick={() => setQuantite(quantite-1)}>-</span>
                    <input type="number" className='quantite' value={quantite}/>
                    <span className='ajout-retrait' onClick={() => setQuantite(quantite+1)}>+</span>
                </div>
            </div>
        </div>   
        <img className='cross' src="/icones/cross.svg" alt="croix"/>
    </div>
  )
}
