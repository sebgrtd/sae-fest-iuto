import {useEffect, useState, useRef} from 'react'
import { Link, useLocation } from 'react-router-dom'
import BoutonReseau from '../../components/Artiste/BoutonReseau'
import { motion } from 'framer-motion'


export default function PageArtiste() {
  
    const location = useLocation();
    const oldX = location.state?.oldX;
    const oldY = location.state?.oldY;
    const[nomArtiste, setNomArtiste] = useState(location.state?.nomArtiste)
    const[date, setDate] = useState(location.state?.date)
    const[heure, setHeure] = useState(location.state?.heure)
    const[description, setDescription] = useState("Tame Impala est un projet musical australien originaire de Perth, créé en 2007 et dirigé par le musicien multi-instrumentiste Kevin Parker. Parker écrit, joue, produit et enregistre la musique seul en studio d'enregistrement. En tournée, il est accompagné de différents musiciens. Tame Impala est né du précédent groupe de Kevin Parker, Dee Dee Dums, qui mêlait des influences blues, jazz et rock psychédélique. Ce groupe était formé de Parker à la guitare et de Luke Epstein à la batterie. Ils remportent la deuxième place au AmpFest de 20051, et terminent troisième la même année au cours de la finale nationale de The Next Big Thing2. En octobre 2006, les Dee Dee Dums remportent la finale nationale de la National Campus Band Competition3.")
    const titleRef = useRef<HTMLHeadingElement>(null);

    const params = new URLSearchParams(window.location.search)
    const idArtiste = params.get('id')

    const[windowWidth, setWindowWidth] = useState(window.innerWidth)
    const[infosGridPosition, setInfosGridPosition] = useState<"top" | "bottom">("top")

    useEffect(() => {
      
      const handleResize = () => {
        setWindowWidth(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)
    
      return () => {    
        window.removeEventListener('resize', handleResize)
      }
    }, [])
    
    useEffect(() => {
      if(titleRef.current){
        // regarde si la width du titre est plus grande que 25% de la width de la fenetre - 2*3rem
        if(titleRef.current.offsetWidth > windowWidth/4 - 2*3*16){
          setInfosGridPosition("top")
        }
        else{
            setInfosGridPosition("bottom")
        }
      }
    }, [titleRef, windowWidth])
    

    const infosVariants = {
        initial:{
            opacity:0,
            transition:{
                duration:0.1,
                ease: "easeInOut"
            }
        },
        visible:{
            opacity:1,
            transition:{
                delay: 0.8,
                duration:0.6,
                ease: "easeInOut"
            }
        }
    }
  
    const overlayVariants = {
        initial:{
            background:"linear-gradient(to top, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0) 60%)",
            transition:{
                duration:0.1,
                ease: "easeInOut"
            }
        },
        extended:{
            background:"linear-gradient(to top, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0) 100%)",
            transition:{
                delay: 0.6,
                duration:0.6,
                ease: "easeInOut"
            }
        }
    }

    return (
    <div id='PageArtiste'>
      <motion.div className="overlay"
      variants={overlayVariants}
    initial="initial"
    animate={infosGridPosition === "top" ? "extended" : "initial"}
      />

      <img src="/images/test-travis.png" alt="image de fond" />
      <div className="content"
      style={{
        columnGap: infosGridPosition === "top" ? "0" : "5rem",
        rowGap: windowWidth > 991 ? "0" : "5rem",
    }}
      >
        <h3 ref={titleRef}>
        {
        nomArtiste.toUpperCase().split(" ").map((mot : string, index:number) => {
            return(
                <span key={index}>{mot}<br/></span>
            )
        })
    }
        </h3>
        <motion.div className="infos"
        variants={infosVariants}
        initial="initial"
        animate="visible"
        exit="initial"
        style={{gridArea : infosGridPosition}}
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
            <Link to="/programmation"
            state={{
                comesFromPageArtist:idArtiste,
                oldX: oldX,
                oldY: oldY
            }}
            className='btn-retour'>
                <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6.52539" y="0.321533" width="35.8974" height="3.58974" rx="1.79487" transform="rotate(45 6.52539 0.321533)"/>
                    <rect x="3.87891" y="25.5957" width="35.8974" height="3.58974" rx="1.79487" transform="rotate(-45 3.87891 25.5957)"/>
                </svg>
            </Link>
           

        </motion.div>
        <div className="date-heure">
            <h4>{date}</h4>
            <h4>{heure}</h4>
        </div>
      </div>
    </div>
  )
}
