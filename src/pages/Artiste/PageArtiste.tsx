import React from 'react'
import { Link } from 'react-router-dom'
import BoutonReseau from '../../components/Artiste/BoutonReseau'
import { motion } from 'framer-motion'

type props = {

}

export default function PageArtiste() {
  
    const btnRetourVariants = {
        initial:{
            opacity:0,
            transition:{
                duration:0.6,
                ease: "easeInOut"
            }
        },
        visible:{
            opacity:1,
            transition:{
                delay: 0.6,
                duration:0.3,
                ease: "easeInOut"
            }
        }
    }
  
    return (
    <div id='PageArtiste'>
      <img src="/images/test-travis.png" alt="image de fond" />
      <motion.div className="container-link"
      variants={btnRetourVariants}
      initial="initial"
      animate="visible"
      >
        <Link to="/programmation" className='btn-retour'>
            <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="20.1737" y1="1.73036" x2="4.73082" y2="17.1733" stroke="#19212C" stroke-width="4.89419"/>
                <line x1="20.1251" y1="34.7304" x2="1.92662" y2="16.5319" stroke="#19212C" stroke-width="4.89419"/>
                <line x1="40.0459" y1="17.4837" x2="3.64892" y2="17.4837" stroke="#19212C" stroke-width="4.89419"/>
            </svg>
            Retour
        </Link>
      </motion.div>
      <div className="content">
        <h3>TRAVIS 
            <br/>
            SCOTT
        </h3>
        <motion.div className="infos"
        variants={btnRetourVariants}
        initial="initial"
        animate="visible"
        >
            <p className='description'>
            Tame Impala est un projet musical australien originaire de Perth, créé en 2007 et dirigé par le musicien multi-instrumentiste Kevin Parker. Parker écrit, joue, produit et enregistre la musique seul en studio d'enregistrement. En tournée, il est accompagné de différents musiciens.
Tame Impala est né du précédent groupe de Kevin Parker, Dee Dee Dums, qui mêlait des influences blues, jazz et rock psychédélique. Ce groupe était formé de Parker à la guitare et de Luke Epstein à la batterie. Ils remportent la deuxième place au AmpFest de 20051, et terminent troisième la même année au cours de la finale nationale de The Next Big Thing2. En octobre 2006, les Dee Dee Dums remportent la finale nationale de la National Campus Band Competition3.
            </p>
            <div className="les-reseaux">
                <BoutonReseau href="https://www.soundcloud.com/" type='soundcloud' />
                <BoutonReseau href="https://www.spotify.com/" type='spotify'/>
                <BoutonReseau href="https://www.instagram.com/" type='instagram'/>
                <BoutonReseau href="https://www.twitter.com/" type='twitter'/>
                <BoutonReseau href="https://www.youtube.com/" type='youtube'/>
            </div>
        </motion.div>
        <div className="date-heure">
            <h4>22 JUILLET</h4>
            <h4>17H30</h4>
        </div>
      </div>
    </div>
  )
}
