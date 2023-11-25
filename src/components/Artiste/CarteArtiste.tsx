import { motion } from 'framer-motion'
import {useState} from 'react'
import { Link } from 'react-router-dom'

type Props = {
    date: string,
    heure: string,
    nomArtiste: string,
    setIsNavTransparent: (isNavTransparent : boolean) => void;
}

export default function CarteArtiste(props: Props) {
  // change le nomArtiste en majuscule et remplace les espaces par des retours à la ligne
  const nomArtiste = props.nomArtiste.toUpperCase().split(" ")
  const[isHovered, setIsHovered] = useState(false)

  const titleVariants = {
    hover:{
        color:"#FFD600",
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    },
    default:{
        color:"#FFFBEE",
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    }
  }

  // fais le variant pour l'image de l'artiste (scale 1.2 sur hover)
    const imageVariants = {
        hover:{
            scale:1.3,
            transition:{
                duration:0.4,
                ease: [1, 0, 0,1]
            }
        },
        default:{
            scale:1,
            transition:{
                duration:0.4,
                ease: [1, 0, 0,1]
            }
        }
    }

  // fais le variant pour le texte de dateHeure (x 2rem sur hover)

  const dateHeureVariants = {
    hover:{
        y:"-2.1rem",
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    },
    default:{
        y:"0rem",
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    }
  }

  const heureVariants = {
    hover:{
        y:"-0.5rem",
        transition:{
            duration:0,
            ease: [1, 0, 0,1]
        }
    },
    default:{
        y:"2rem",
        transition:{
            duration:0,
            ease: [1, 0, 0,1]
        }
    }
  }

  return (
    <Link className="carte-artiste"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    to="/artiste/1"
    onClick={() => props.setIsNavTransparent(true)}
    >
        <motion.img 
        src="/images/test-travis.png" 
        alt="image de l'artiste" 
        variants={imageVariants}
        initial="default"
        animate={isHovered ? "hover" : "default"}
        />
        <div className="texts">
            <motion.h3
            variants={titleVariants}
            initial="default"
            animate={isHovered ? "hover" : "default"}
            >{
                nomArtiste.map((mot, index) => {
                    return(
                        <span key={index}>{mot}<br/></span>
                    )
                })
            }</motion.h3>
            <motion.div className="date-heure"
            variants={dateHeureVariants}
            initial="default"
            animate={isHovered ? "hover" : "default"}
            >
                <h4>{props.date}</h4>
                <motion.h4 
                variants={heureVariants} 
                initial="default"
                animate={isHovered ? "hover" : "default"}
                >{props.heure}</motion.h4>
            </motion.div>
        </div>
    </Link>
  )
}
