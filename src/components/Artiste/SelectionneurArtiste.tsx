import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { getUserCookie } from '../../cookies/CookiesLib';

type Props = {
    idArtiste: number;
    nomArtiste: string;
    datePassage: string;
    isSaved: boolean;
}

export default function SelectionneurArtiste(props:Props) {
    const[isHovering, setIsHovering] = useState(false);
    const[isSaved, setIsSaved] = useState(props.isSaved);
    const[isLoading, setIsLoading] = useState(false);
    const[hasLoaded, setHasLoaded] = useState(false);
    const[hasFinished, setHasFinished] = useState(false);
    
    const[firstRectBackgroundColor, setFirstRectBackgroundColor] = useState(isSaved ? "orange" : "yellow");
    const[secondRectBackgroundColor, setSecondRectBackgroundColor] = useState(isSaved ? "yellow" : "orange");
    const[firstTextColor, setFirstTextColor] = useState(isSaved ? "light-text" : "orange-text");
    const[secondTextColor, setSecondTextColor] = useState(isSaved ? "orange-text" : "light-text");
    const[firstTextValue,setFirstTextValue]=useState<string>(isSaved ? "RETIRER L’ARTISTE" : "VOIR CET ARTISTE");
    const[secondTextValue,setSecondTextValue]=useState<string>(isSaved ? "SUPPRESSION..." : "AJOUT...");
    const[thirdTextValue,setThirdTextValue]=useState<string>(isSaved ? "ARTISTE SUPPRIMÉ" : "ARTISTE AJOUTÉ");
    const[noTransition, setNoTransition] = useState(false);

    const handleClick = () => {
        if (isLoading ||hasLoaded || hasFinished || noTransition){
            return;
        }

        setIsLoading(true);

        let newSavedState = false;

        axios.post("http://localhost:8080/saveArtiste", {
            idArtiste: props.idArtiste,
            idUser: getUserCookie().idUser
        }).then((res) => {
            // si la requete était bonne
            if (res.status === 200) {
                setHasLoaded(true);
                setTimeout(() => {
                    setHasLoaded(false);
                    setIsLoading(false);
                    setIsSaved((oldSavedProperty: boolean) => {
                        newSavedState = !oldSavedProperty;
                        return !isSaved});
                    setHasFinished(true);
                    setIsHovering(false);
                    setTimeout(() => {
                        setFirstRectBackgroundColor(newSavedState ? "orange" : "yellow");
                        setSecondRectBackgroundColor(newSavedState ? "yellow" : "orange");
                        setNoTransition(true);
                        setHasFinished(false);
                        setFirstTextColor(newSavedState ? "light-text" : "orange-text");
                        setSecondTextColor(newSavedState ? "orange-text" : "light-text");
                        setFirstTextValue(newSavedState ? "RETIRER L’ARTISTE" : "VOIR CET ARTISTE");
                        setSecondTextValue(newSavedState ? "SUPPRESSION..." : "AJOUT...");
                        setThirdTextValue(newSavedState ? "ARTISTE SUPPRIMÉ" : "ARTISTE AJOUTÉ");
    
                        setTimeout(() => {
                            setNoTransition(false)
                        }, 50);
                    }, 400)
                }, 1000);
            }
            else{
                alert("Erreur lors de la sauvegarde de l'artiste");
            }
        }).catch((err) => {
            // si la requete était mauvaise
            setIsLoading(false);
            alert("Erreur lors de la sauvegarde de l'artiste");
        })

        // setTimeout(() => {
        //     setHasLoaded(true);
        //     setTimeout(() => {
        //         setHasLoaded(false);
        //         setIsLoading(false);
        //         setIsSaved((oldSavedProperty: boolean) => {
        //             newSavedState = !oldSavedProperty;
        //             return !isSaved});
        //         setHasFinished(true);
        //         setIsHovering(false);
        //         setTimeout(() => {
        //             setFirstRectBackgroundColor(newSavedState ? "orange" : "yellow");
        //             setSecondRectBackgroundColor(newSavedState ? "yellow" : "orange");
        //             setNoTransition(true);
        //             setHasFinished(false);
        //             setFirstTextColor(newSavedState ? "light-text" : "orange-text");
        //             setSecondTextColor(newSavedState ? "orange-text" : "light-text");
        //             setFirstTextValue(newSavedState ? "RETIRER L’ARTISTE" : "VOIR CET ARTISTE");
        //             setSecondTextValue(newSavedState ? "SUPPRESSION..." : "AJOUT...");
        //             setThirdTextValue(newSavedState ? "ARTISTE SUPPRIMÉ" : "ARTISTE AJOUTÉ");

        //             setTimeout(() => {
        //                 setNoTransition(false)
        //             }, 50);
        //         }, 400)
        //     }, 2500);
        // }, 2500);
    }

    const containerVariants = {
        defaultNoTransition:{
            x: "85%",
            transition:{
                duration:0
            }
        },
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
        defaultNoTransition:{
            rotate:0,
            scale: 3.5,
            x:"-95%",
            y:"60%",
            transition:{
                duration:0,
            }
        },
        default:{
            rotate:0,
            scale: 3.5,
            x:"-95%",
            y:"60%",
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

    const spinnerVariants = {
        hidden:{
          rotate:0
        },
        loading:{
          rotate: 360,
          transition:{
            rotate:{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 2,
              ease: 'linear'
            },
            scale:{
              duration: 0.25,
              ease: [1, 0, 0,1]
            },
            opacity:{
              duration: 0.25,
              ease: [1, 0, 0,1]
            }
          }
        }
      }

    const checkVariants = (isSmall:boolean) => {
        return{
            hidden:{
                width:"1px",
            },
            visible:{
                width:isSmall ?"15px" : "30px",
                transition:{
                    duration:0.5,
                    ease:[1,0,0,1],
                    delay:0.2,
                }
            }
        }
    }
  
    return (
    <button className='selectionneur-artiste'>
        
        <img src={"http://localhost:8080/getImageArtiste/"+props.idArtiste} alt="image de l'artiste"/>
        <div className="image-mask"></div>

        <div className="content">
            <h3>{props.nomArtiste.toUpperCase()}</h3>
            <h4>{props.datePassage}</h4>
        </div>

        <motion.div 
        variants={containerVariants}
        animate={(isLoading || isHovering) ? "hoveredNotSaved" : "defaultNotSaved"}
        initial="defaultNotSaved"
        onMouseEnter={() => {!hasFinished && setIsHovering(true)}}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleClick}
        className="bookmark-container">

            <motion.svg
            variants={bookmarkVariants}
            animate={(isLoading || isHovering) ? "hidden" : "default"}
            initial="default"
            className={`bookmark ${isSaved ? "saved" : ""}`} width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M9.6875 1.59375L3.3125 1.59375C2.88981 1.59375 2.48443 1.76166 2.18555 2.06055C1.88666 2.35943 1.71875 2.76481 1.71875 3.1875L1.71875 15.4062L6.5 11.1562L11.2813 15.4062L11.2813 3.1875C11.2813 2.76481 11.1133 2.35943 10.8145 2.06055C10.5156 1.76166 10.1102 1.59375 9.6875 1.59375Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </motion.svg>



            <motion.div 
            variants={textsVariants}
            animate={hasLoaded ? "hiddenRight" : isLoading ? "hiddenLeft" : "default"}
            initial="default"
            className={`text-feedback placeholder ${firstTextColor}`}>
                <p>{firstTextValue}</p>

                <svg className='arrow' width="43" height="39" viewBox="0 0 43 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="21.0769" y1="37.1648" x2="37.4558" y2="20.7859" stroke="currentColor" stroke-width="5.19082"/>
                    <line x1="21.1282" y1="2.16477" x2="40.4297" y2="21.4663" stroke="currentColor" stroke-width="5.19082"/>
                    <line x1="-2.26898e-07" y1="20.4568" x2="38.603" y2="20.4568" stroke="currentColor" stroke-width="5.19082"/>
                </svg>

            </motion.div>

            <motion.div
            variants={textsVariants}
            animate={hasLoaded ? "hiddenRight" : isLoading ? "default" : "hiddenLeft"}
            initial="hidden"
            className={`text-feedback loading ${secondTextColor}`}>
                <p>{secondTextValue}</p>
                <motion.svg 
                variants={spinnerVariants}
                animate={isLoading ? "loading" : "default"}
                initial="default"
                width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-inside-1_1585_2279" fill="white">
                    <path d="M7.63581 3.18394C7.27008 2.65851 6.54432 2.52569 6.04869 2.93088C3.75363 4.80714 2.05872 7.328 1.19143 10.1808C0.211393 13.4044 0.345199 16.8641 1.57128 20.0024C2.79736 23.1406 5.04432 25.7747 7.95008 27.4802C10.8558 29.1857 14.2512 29.8632 17.589 29.4037C20.9268 28.9441 24.0126 27.3741 26.3493 24.9468C28.686 22.5194 30.1374 19.3761 30.4697 16.0232C30.802 12.6703 29.9958 9.30324 28.181 6.46446C26.575 3.95225 24.2619 1.98327 21.5451 0.79711C20.9584 0.540949 20.2956 0.864976 20.0855 1.4697C19.8754 2.07442 20.1981 2.73014 20.7811 2.99457C23.0072 4.00419 24.9023 5.63985 26.2277 7.71316C27.7621 10.1132 28.4437 12.9599 28.1627 15.7946C27.8818 18.6292 26.6547 21.2868 24.6791 23.339C22.7036 25.3911 20.0947 26.7184 17.2727 27.107C14.4508 27.4956 11.5802 26.9228 9.12357 25.4809C6.66691 24.039 4.76723 21.812 3.73064 19.1587C2.69406 16.5055 2.58093 13.5805 3.40949 10.8551C4.12527 8.50073 5.50778 6.41376 7.37815 4.84008C7.86801 4.42793 8.00154 3.70937 7.63581 3.18394Z"/>
                    </mask>
                    <path d="M7.63581 3.18394C7.27008 2.65851 6.54432 2.52569 6.04869 2.93088C3.75363 4.80714 2.05872 7.328 1.19143 10.1808C0.211393 13.4044 0.345199 16.8641 1.57128 20.0024C2.79736 23.1406 5.04432 25.7747 7.95008 27.4802C10.8558 29.1857 14.2512 29.8632 17.589 29.4037C20.9268 28.9441 24.0126 27.3741 26.3493 24.9468C28.686 22.5194 30.1374 19.3761 30.4697 16.0232C30.802 12.6703 29.9958 9.30324 28.181 6.46446C26.575 3.95225 24.2619 1.98327 21.5451 0.79711C20.9584 0.540949 20.2956 0.864976 20.0855 1.4697C19.8754 2.07442 20.1981 2.73014 20.7811 2.99457C23.0072 4.00419 24.9023 5.63985 26.2277 7.71316C27.7621 10.1132 28.4437 12.9599 28.1627 15.7946C27.8818 18.6292 26.6547 21.2868 24.6791 23.339C22.7036 25.3911 20.0947 26.7184 17.2727 27.107C14.4508 27.4956 11.5802 26.9228 9.12357 25.4809C6.66691 24.039 4.76723 21.812 3.73064 19.1587C2.69406 16.5055 2.58093 13.5805 3.40949 10.8551C4.12527 8.50073 5.50778 6.41376 7.37815 4.84008C7.86801 4.42793 8.00154 3.70937 7.63581 3.18394Z" fill="currentColor" stroke="currentColor" stroke-width="8" mask="url(#path-1-inside-1_1585_2279)"/>
                </motion.svg>

            </motion.div>

            <motion.div 
            variants={textsVariants}
            animate={hasLoaded ? "default" : isLoading ? "hiddenLeft" : "hiddenRight"}
            initial="default"
            className={`text-feedback loading ${secondTextColor}`}>
                
                <p>{thirdTextValue}</p>

                <svg
                className='check'
                width="33" height="24" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.rect
                    variants={checkVariants(true)}
                    animate={(hasLoaded || hasFinished) ? "visible" : "hidden"}
                    initial="hidden"
                    x="2.32227" y="10.5835" height="3.14835" rx="0.467735" transform="rotate(45 2.32227 10.5835)" fill="currentColor"/>
                    <motion.rect
                    variants={checkVariants(false)}
                    animate={(hasLoaded || hasFinished) ? "visible" : "hidden"}
                    initial="hidden"
                    x="10.3555" y="21.1675" height="3.14835" rx="0.467735" transform="rotate(-45 10.3555 21.1675)" fill="currentColor"/>
                </svg>

            </motion.div>



            <motion.div 
                className={`rect ${firstRectBackgroundColor}`}
                variants={rectVariants}
                animate={(isLoading || isHovering || hasLoaded) ? "hover" : "default"}
                initial="default"
            />

            <motion.div 
                className="rect wrapper"
                variants={wrapperRectVariants}
                animate={(isLoading || isHovering ) ? "hover" : "default"}
                initial="default"
            >   
                <motion.div 
                variants={innerRectVariants}
                animate={noTransition ? "defaultNoTransition" : (isLoading ||hasFinished) ? "loading" : isHovering ? "hover" : "default"}
                initial="default"
                className={`real-rect ${secondRectBackgroundColor}`}/>
            </motion.div>
            
        </motion.div>

    </button>
  )
}
