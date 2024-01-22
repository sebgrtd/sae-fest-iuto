import Billet from '../../../classes/Billet'
import axios from 'axios';

type Props = {
        billet : Billet;
}

export default function AfficheurMonBillet(props:Props) {
 
    const handleDownload = () => {
        axios.post('https://www.api.festiuto.sebastien-gratade.fr/telecharger_billet', {
        responseType: 'blob',    
        data: props.billet
        })
        .then((response) => {
            console.log(response);
            // sur mon serveur j'ai fait send_file('billet.pdf, as_attachment=True)
            
            const blob = new Blob([response.data], { type: 'application/pdf' });

            const url = window.URL.createObjectURL(blob);
            
            window.open(url);

        })
    }

    return (
        <div className="billet">
                <img src="/images/billet.png" alt="billet" />
                <div className="textes">
                <div className="description">
                        <h3>Pass accès {props.billet.duree} jour {props.billet.quantite > 1 ? ("(x"+props.billet.quantite+")") : ""}</h3>
                        <p>{Billet.getDate(props.billet)}</p>
                </div>
                <button onClick={handleDownload}>Télécharger</button>
                </div>  
        </div>
    )
}
