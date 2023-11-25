import { motion } from 'framer-motion'
import {useState,useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'

type Props = {
    date: string,
    heure: string,
    nomArtiste: string,
    setIsNavTransparent: (isNavTransparent : boolean) => void;
    selected?: boolean;
}

export default function CarteArtiste(props: Props) {
  // change le nomArtiste en majuscule et remplace les espaces par des retours à la ligne
  const nomArtiste = props.nomArtiste.toUpperCase().split(" ")
  const[isHovered, setIsHovered] = useState(false)
  const[isSwitching, setIsSwitching] = useState(false)
  const refCarte = useRef<HTMLDivElement>(null);

  const titleVariants = {
    hover:{
        fontSize: "2.3rem",
        color:"#FFD600",
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    },
    default:{
        fontSize: "2.3rem",
        color:"#FFFBEE",
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    },
    exit:{
        fontSize: "7.625rem",
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
        y:"0rem",
        fontSize: "1.875rem",
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    },
    default:{
        y:"2.9rem",
        fontSize: "1.875rem",
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    },
    exit:{
        y:"0rem",
        fontSize: "4.6875rem",
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    }
  }

  // default font-size: 1.875rem;
  // exit font-size: 4.6875rem;

  const heureVariants = {
    hover:{
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    },
    default:{
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    },
  }

  const carteVariants = {
    default:{
        scale:1,
        zIndex:1,
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    },
    exit:{
        scale:1,
        // le met au centre de l'écran
        translateX: refCarte.current? -refCarte.current.offsetLeft : 0,
        translateY: refCarte.current? -refCarte.current.offsetTop : 0,
        height: "100vh",
        width: "100vw",
        zIndex:99,
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    }
  }

  const textVariants = {
    default:{
        padding: "0.5rem 1rem",
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    },
    exit:{
        padding: "3rem",
        transition:{
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    }
  }


  return (
    <motion.div
    className={props.selected ? "selected outer-carte-artiste" : "outer-carte-artiste"}
    ref={refCarte}
    variants={carteVariants}
    initial="default"
    exit={isSwitching ? "exit" : "default"}
    >
        <Link className="carte-artiste"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        to="/artiste/1"
        onClick={() => {props.setIsNavTransparent(true); setIsSwitching(true)}}
        >
            <motion.img 
            src="/images/test-travis.png" 
            alt="image de l'artiste" 
            variants={imageVariants}
            initial="default"
            animate={isHovered ? "hover" : "default"}
            exit="default"
            />
            <motion.div className="texts"
            variants={textVariants}
            initial="default"
            exit={isSwitching ? "exit" : "default"}
            >
                <motion.h3
                variants={titleVariants}
                initial="default"
                animate={isHovered ? "hover" : "default"}
                exit={isSwitching ? "exit" : "default"}
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
                exit={isSwitching ? "exit" : "default"}
                >
                    <h4
                    >{props.date}</h4>

                    <motion.h4 
                    variants={heureVariants} 
                    initial="default"
                    animate={isHovered ? "hover" : "default"}
                    exit={isSwitching ? "exit" : "default"}
                    >{props.heure}</motion.h4>

                </motion.div>
            </motion.div>
        </Link>
    </motion.div>
  )
}
