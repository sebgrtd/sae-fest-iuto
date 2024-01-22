import React, { useEffect } from 'react'
import Button from '../../components/form/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function SectionBilleterie() {
  const[nbReservations, setNbReservations] = React.useState(0)

  useEffect(() => {
        // on recupere le nb de reservations : /getNbReservations
        axios.get('https://www.festiuto.sebastien-gratade.fr:8080/getNbReservations').then((res) => {
            console.log(res)
            if (res.status === 200){
                setNbReservations(res.data)
            }
            else{
                //alert("erreur lors de la récupération du nombre de réservations")
            }
            }).catch((_) => {
                //alert("erreur lors de la récupération du nombre de réservations")
            }
        )
    },[])

  return (
    <section id="SectionBilleterie">
        <div className="content">
            <div className="text-etoile">
                <h2>RESERVES TON PASS POUR LE FESTIVAL DE L'ANNEE!</h2>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M62.9991 27.739L42.1815 27.7675L56.8787 13.0286L50.7001 6.86056L36.0029 21.5994L35.9744 0.785744L27.2406 0.797718L27.2692 21.6114L12.5316 6.91288L6.36413 13.0979L21.1017 27.7964L0.289932 27.825L0.301899 36.5537L21.1137 36.5251L6.41646 51.2641L12.6009 57.4321L27.2981 42.6932L27.3266 63.5069L36.0603 63.4949L36.0318 42.6812L50.7694 57.3798L56.931 51.1948L42.1934 36.4962L63.011 36.4677L62.9991 27.739Z" fill="#FFD600"/>
                </svg>
            </div>
            <p>
                Prépare toi à vivre une expérience unique en son genre ! Nos billets sont maintenant disponibles et c’est l’occasion de garantir ta place pour l’évènement de l’année.
                <br></br>
                <br></br>
                Les billets sont en quantité limitée, alors ne tarde pas. Réserve dès maintenant pour ne pas manquer cette opportunitée de faire partie de cette édition du FEST IUT’O!
            </p>
            <div className="infos">
                <section className='info'>
                    <img src="/icones/location.svg" alt="Icone position" />
                    <p>Olivet, 45160</p>
                </section>
                <section className='info'>
                    <img src="/icones/calendar.svg" alt="Icone calendrier" />
                    <p>21 au 23 juin 2024</p>
                </section>
                <section className='info'>
                    <img src="/icones/ticket.svg" alt="Icone prix" />
                    <p>{nbReservations} Réservations</p>
                </section>
            </div>
        </div>
        <Link to="/billeterie" className='btn-link'>
            <Button isDark text="BILLETERIE"/>
        </Link>
    </section>
  )
}
