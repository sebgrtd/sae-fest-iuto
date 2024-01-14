import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'

type Props = {
    nomArtiste: string;
    datePassage: string;
}

export default function SelectionneurArtiste(props:Props) {
    const[isHovering, setIsHovering] = useState(true);
    const[isSaved, setIsSaved] = useState(false);
    const[isLoading, setIsLoading] = useState(false);
    const[hasLoaded, setHasLoaded] = useState(false);

    const handleClick = () => {
        setIsLoading(true);

        setTimeout(() => {
            setHasLoaded(true);
            setTimeout(() => {
                setHasLoaded(false);
                setIsLoading(false);
                setIsSaved(true);
            }, 2500);
        }, 2500);
    }

    const containerVariants = {
        defaultNotSaved: {
            x: "85%",
            transition:{
                duration:0.5,
                ease:[1,0,0,1]
            }
        },
        hoveredNotSaved:{
            x: "0%",
            transition:{
                duration:0.5,
                ease:[1,0,0,1]
            }
        }
    }

    const bookmarkVariants = {
        default:{
            opacity:1,
        },
        hidden:{
            opacity:0,
        }
    }

    const rectVariants = {
        default:{
            rotate:"35deg",
            scale:3,
        },
        hover:{
            rotate:"35deg",
            scale:3.1,
        }
    }

    const wrapperRectVariants = {
        default:{
            scale: 3.3,
            x: "-95%",
            rotate: "125deg",
        },
        hover:{
            scale:3.5,
            x: "-95%",
            rotate: "125deg",
        }
    }

    const innerRectVariants = {
        default:{
            rotate:0,
            scale: 3.5,
            x:"-95%",
            y:"55%",
            transition:{
                duration:0.5,
                ease:[1,0,0,1]
            }
        },
        hover:{
            rotate:0,
            scale: 3.5,
            x:"-95%",
            y:"53.5%",
            transition:{
                duration:0.5,
                ease:[1,0,0,1]
            }
        },
        loading:{
            rotate:0,
            scale: 3.5,
            x:"-95%",
            y:"-10%",
            transition:{
                duration:0.5,
                ease:[1,0,0,1]
            }
        }
    }

    const textsVariants = {
        default:{
            opacity:1,
            y: "-50%",
            x: 0,
            transition:{
                duration:0.5,
                ease:[1,0,0,1]
            }
        },
        hiddenRight:{
            opacity:0,
            y: "-50%",
            x: 10,
            transition:{
                duration:0.5,
                ease:[1,0,0,1]
            }
        },
        hiddenLeft:{
            opacity:0,
            y: "-50%",
            x: -10,
            transition:{
                duration:0.5,
                ease:[1,0,0,1]
            }
        }
    }
  
    return (
    <button className='selectionneur-artiste'>
        
        <img src={"/images/" + (props.nomArtiste.startsWith("P") ? "test-playboi-carti.png" : "test-travis.png")} alt="image de l'artiste"/>
        <div className="image-mask"></div>

        <div className="content">
            <h3>{props.nomArtiste}</h3>
            <h4>{props.datePassage}</h4>
        </div>

        <motion.div 
        variants={containerVariants}
        animate={(isLoading || isHovering) ? "hoveredNotSaved" : "defaultNotSaved"}
        initial="defaultNotSaved"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleClick}
        className="bookmark-container">

            <motion.svg
            variants={bookmarkVariants}
            animate={(isLoading || isHovering) ? "hiddenRight" : "default"}
            initial="default"
            className='bookmark' width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.6875 1.59375L3.3125 1.59375C2.88981 1.59375 2.48443 1.76166 2.18555 2.06055C1.88666 2.35943 1.71875 2.76481 1.71875 3.1875L1.71875 15.4062L6.5 11.1562L11.2813 15.4062L11.2813 3.1875C11.2813 2.76481 11.1133 2.35943 10.8145 2.06055C10.5156 1.76166 10.1102 1.59375 9.6875 1.59375Z" stroke="#E45A3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </motion.svg>



            <motion.div 
            variants={textsVariants}
            animate={hasLoaded ? "hiddenRight" : isLoading ? "hiddenLeft" : "default"}
            initial="default"
            className="text-feedback placeholder">
                <p>VOIR CET ARTISTE</p>
                <img src="/icones/right-arrow.svg" alt="fleche de droite"/>
            </motion.div>

            <motion.div
            variants={textsVariants}
            animate={hasLoaded ? "hiddenRight" : isLoading ? "default" : "hiddenLeft"}
            initial="hidden"
            className="text-feedback loading">
                <p>AJOUT...</p>
            </motion.div>

            <motion.div 
            variants={textsVariants}
            animate={hasLoaded ? "default" : isLoading ? "hiddenLeft" : "hiddenRight"}
            initial="default"
            className='text-feedback loading'>
                <p>ARTISTE AJOUTÉ</p>
            </motion.div>



            <motion.div 
                className="rect yellow"
                variants={rectVariants}
                animate={(isLoading || isHovering) ? "hover" : "default"}
                initial="default"
            />

            <motion.div 
                className="rect wrapper"
                variants={wrapperRectVariants}
                animate={(isLoading || isHovering) ? "hover" : "default"}
                initial="default"
            >   
                <motion.div 
                variants={innerRectVariants}
                animate={isLoading ? "loading" : isHovering ? "hover" : "default"}
                initial="default"
                className="real-rect orange"/>
            </motion.div>
            
        </motion.div>

    </button>
  )
}
