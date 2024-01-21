import React from 'react'
import Billet from '../../../classes/Billet'

type Props = {
    billet : Billet;
}

export default function AfficheurMonBillet(props:Props) {
  return (
    <div className="billet">
        <img src="/images/billet.png" alt="billet" />
        <div className="textes">
        <div className="description">
            <h3>Pass accès {props.billet.duree} jour {props.billet.quantite > 1 ? ("(x"+props.billet.quantite+")") : ""}</h3>
            <p>{Billet.getDate(props.billet)}</p>
        </div>
        <button>Télécharger</button>
        </div>  
    </div> 
  )
}
