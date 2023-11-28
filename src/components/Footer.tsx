import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
        <div className="top-content">
            <div className="logo">
                <img src="/logo-yellow.svg" alt="logo"/>
            </div>
            <div className="rubriques">
                <div className="rubrique">
                    <h3>Aide</h3>
                    <ul>
                        <li><Link to="faq">FAQ</Link></li>
                        <li><Link to="contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="rubrique">
                    <h3>A propos</h3>
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="billeterie">Billeterie</Link></li>
                        <li><Link to="programmation">Programmation</Link></li>
                        <li><Link to="faq">FAQ</Link></li>
                        <li><Link to="connexion">Connexion</Link></li>
                    </ul>
                </div>
                <div className="rubrique">
                    <h3>Rejoignez nous</h3>
                    <ul>
                        <li><a href="https://twitter.com/">Twitter</a></li>
                        <li><a href="https://www.instagram.com/">Instagram</a></li>
                    </ul>
                </div>
            </div>        
        </div>
        <div className="bottom-content">
            <h4>© 2023 IUT Orléans. Tous droits réservés.</h4>
            <h5>Amael Maserati, Sébastien Gratade, Alexandre Raviart, Coursimault Irvyn</h5>
        </div>
    </footer>
  )
}
