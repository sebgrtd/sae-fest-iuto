import { motion } from 'framer-motion'
import {useState,useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'

type Props = {
    id:number|undefined,
    date: string,
    heure: string,
    nomArtiste: string,
    setIsNavTransparent: (isNavTransparent : boolean) => void;
    comesFromPageArtist?: boolean;
    oldX?: number;
    oldY?: number;
    oldGroupes?: Groupe[];
    description?: string;
    estArtiste?: boolean;
}

type Groupe = {
    idG: number;
    nomG: string;
    descriptionG: string;
    datePassage: string;
    heurePassage: string;
  }

export default function CarteProgrammation(props: Props) {
  const nomArtiste = props.nomArtiste.toUpperCase().split(" ")
  const[isHovered, setIsHovered] = useState(false)
  const[isSwitching, setIsSwitching] = useState(false)
  const[delay, setDelay] = useState(props.comesFromPageArtist? 0.2 : 0)
  const refCarte = useRef<HTMLDivElement>(null);
  const[zIndexCard, setZIndexCard] = useState(props.comesFromPageArtist ? 99 : 1)

  useEffect(() => {
    console.log('oldX:', props.oldX);
    console.log('oldY:', props.oldY);
    
    setTimeout(() => {
      console.log(props.date)
      console.log(props.heure)
  
      setZIndexCard(1)
      setDelay(0)
    }, 600);
  }, [])

  

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
            delay:delay,
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    },
    exit:{
        fontSize: "7.625rem",
        color:"#FFD600",
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
        y:(window.innerWidth <= 576 ? 3.1 : 2.9).toString() + "rem",
        fontSize: "1.875rem",
        transition:{
            delay:delay,
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
        zIndex:zIndexCard,
        width: "24rem",
        height: "15.5rem",
        y:0,
        x:0,
        transition:{
            delay:0.2,
            duration:0.4,
            ease: [1, 0, 0,1]
        }
    },
    exit:{
        x: refCarte.current? -refCarte.current.offsetLeft : props.oldX? -props.oldX : 0,
        y: refCarte.current? -refCarte.current.offsetTop : props.oldY? -props.oldY : 0,
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
            delay:delay*2,
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
    className="outer-carte-artiste"
    ref={refCarte}
    variants={carteVariants}
    initial={props.comesFromPageArtist ? "exit" : "default"}
    animate="default"
    exit={isSwitching ? "exit" : "default"}
    onClick={() => window.scrollTo(0,0)}
    >
        <Link className="carte-artiste"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        to={{
            pathname:"/artiste",
            search:`?id=${props.id}`,
        }}
        state={{
            nomArtiste: props.nomArtiste,
            date: props.date,
            heure: props.heure,
            oldX: refCarte.current?.offsetLeft,
            oldY: refCarte.current?.offsetTop,
            oldGroupes: props.oldGroupes,
            description: props.description,
            estArtiste: props.estArtiste
        }}
        onClick={() => {props.setIsNavTransparent(true); setIsSwitching(true)}}
        >
            <motion.img 
            // src={"http://localhost:8080/getImageArtiste/" + props.id} 
            src={"images/test-travis.png"} 
            alt="image de l'artiste" 
            variants={imageVariants}
            initial="default"
            animate={isHovered ? "hover" : "default"}
            exit="default"
            />
            <motion.div className="texts"
            variants={textVariants}
            initial={props.comesFromPageArtist ? "exit" : "default"}
            animate="default"
            exit={isSwitching ? "exit" : "default"}
            >
                <motion.h3
                variants={titleVariants}
                initial={props.comesFromPageArtist ? "exit" : "default"}
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
                initial={props.comesFromPageArtist ? "exit" : "default"}
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
