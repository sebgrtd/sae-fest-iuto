import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import Groupe from '../../classes/Groupe'
import axios from 'axios'
import { getUserCookie } from '../../cookies/CookiesLib'


// const currentPage = location.pathname;
// console.log(currentPage);
type Props = {
    date: string,
    artiste: Groupe,
    setArtistes: (mapArtiste: any) => void,
    location?: string; 
}

export default function TableRow(props : Props) {
    const [isLoading ,setIsLoading] = useState(false)
    const tableRowVariant={
        open:{
            opacity:1,
            y:0,
            transition: {
                duration: 0.5,
                ease:[1,0,0,1]
            }
        },
        closed:{
            opacity:0,
            y:-40,
            transition: {
                duration: 0.5,
                ease:[1,0,0,1]
            }
        }
    }
    
    const handleSupprimerArtiste = () => {
        setIsLoading(true)
        axios.post("http://localhost:8080/saveArtiste", {
            idArtiste: props.artiste.idG,
            idUser: getUserCookie().idUser
        }).then((res) => {
            if (res.status = 200){
                props.setArtistes((oldMapArtiste : Map<string, Groupe[]>) => {
                    const artistesMap = new Map(Object.entries(oldMapArtiste));
                    artistesMap.forEach((value, key) => {
                        if (key == props.date){
                            const newValue = value.filter((groupe: Groupe) => groupe.idG !== props.artiste.idG);
                            artistesMap.set(key, newValue);
                        }
                    });
                    return Object.fromEntries(artistesMap);
                });
            }
            else{
                alert("erreur lors de la suppression de l'artiste")
            }
        }).catch((err) => {
            setIsLoading(false)
            alert("erreur lors de la suppression de l'artiste")
        })
    }
    
    const spinnerVariants = {
        hidden:{
            x:"-45%",
            opacity:0,
            scale: 0.9,
            rotate:0
        },
        loading:{
            x:"-45%",
            rotate: 360,
            opacity:1,
            scale: 1,
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
        },
        exit:{
            x:"-45%",
            opacity:0,
            scale: 0.9,
            transition: {
                duration: 0.5,
                ease:[1,0,0,1]
            }
        }
    }

    const hideAndShowVariants = {
        hidden:{
            opacity:0,
            scale: 0.9,
            rotate:0
        },
        show:{
           opacity:1,
           scale:1,
           transition:{
                duration: 0.25,
                ease: [1, 0, 0,1]
            }
        },
        exit:{
            opacity:0,
            scale: 0.9,
            transition: {
                duration: 0.5,
                ease:[1,0,0,1]
            }
        }
    }

  return (
    <motion.tr key={props.artiste.idG} 
    variants={tableRowVariant}
    initial="closed"
    exit="closed"
    animate="open"
    >
        <td>{Groupe.getHeurePassage(props.artiste.heurePassage)} - {Groupe.getHeurePassage(props.artiste.heureFinPassage)}</td>
        <td>{props.artiste.nomG}</td>
        <td>{props.artiste.genresMusicaux?.join(', ')}</td>
        <td>{props.artiste.scene}</td>
        <td onClick={handleSupprimerArtiste}>

        <AnimatePresence>
            {
                isLoading && (
                    <motion.svg 
                variants={spinnerVariants}
                animate={isLoading ? "loading" : "default"}
                initial="hidden"
                className="spinner"
                width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-inside-1_1585_2279" fill="white">
                    <path d="M7.63581 3.18394C7.27008 2.65851 6.54432 2.52569 6.04869 2.93088C3.75363 4.80714 2.05872 7.328 1.19143 10.1808C0.211393 13.4044 0.345199 16.8641 1.57128 20.0024C2.79736 23.1406 5.04432 25.7747 7.95008 27.4802C10.8558 29.1857 14.2512 29.8632 17.589 29.4037C20.9268 28.9441 24.0126 27.3741 26.3493 24.9468C28.686 22.5194 30.1374 19.3761 30.4697 16.0232C30.802 12.6703 29.9958 9.30324 28.181 6.46446C26.575 3.95225 24.2619 1.98327 21.5451 0.79711C20.9584 0.540949 20.2956 0.864976 20.0855 1.4697C19.8754 2.07442 20.1981 2.73014 20.7811 2.99457C23.0072 4.00419 24.9023 5.63985 26.2277 7.71316C27.7621 10.1132 28.4437 12.9599 28.1627 15.7946C27.8818 18.6292 26.6547 21.2868 24.6791 23.339C22.7036 25.3911 20.0947 26.7184 17.2727 27.107C14.4508 27.4956 11.5802 26.9228 9.12357 25.4809C6.66691 24.039 4.76723 21.812 3.73064 19.1587C2.69406 16.5055 2.58093 13.5805 3.40949 10.8551C4.12527 8.50073 5.50778 6.41376 7.37815 4.84008C7.86801 4.42793 8.00154 3.70937 7.63581 3.18394Z"/>
                    </mask>
                    <path d="M7.63581 3.18394C7.27008 2.65851 6.54432 2.52569 6.04869 2.93088C3.75363 4.80714 2.05872 7.328 1.19143 10.1808C0.211393 13.4044 0.345199 16.8641 1.57128 20.0024C2.79736 23.1406 5.04432 25.7747 7.95008 27.4802C10.8558 29.1857 14.2512 29.8632 17.589 29.4037C20.9268 28.9441 24.0126 27.3741 26.3493 24.9468C28.686 22.5194 30.1374 19.3761 30.4697 16.0232C30.802 12.6703 29.9958 9.30324 28.181 6.46446C26.575 3.95225 24.2619 1.98327 21.5451 0.79711C20.9584 0.540949 20.2956 0.864976 20.0855 1.4697C19.8754 2.07442 20.1981 2.73014 20.7811 2.99457C23.0072 4.00419 24.9023 5.63985 26.2277 7.71316C27.7621 10.1132 28.4437 12.9599 28.1627 15.7946C27.8818 18.6292 26.6547 21.2868 24.6791 23.339C22.7036 25.3911 20.0947 26.7184 17.2727 27.107C14.4508 27.4956 11.5802 26.9228 9.12357 25.4809C6.66691 24.039 4.76723 21.812 3.73064 19.1587C2.69406 16.5055 2.58093 13.5805 3.40949 10.8551C4.12527 8.50073 5.50778 6.41376 7.37815 4.84008C7.86801 4.42793 8.00154 3.70937 7.63581 3.18394Z" fill="currentColor" stroke="currentColor" stroke-width="8" mask="url(#path-1-inside-1_1585_2279)"/>
                </motion.svg>
                )
            }
        </AnimatePresence>
            <motion.svg 
            variants={hideAndShowVariants}
            initial="hidden"
            animate={isLoading ? "hidden" :"show"}
            width="28" height="4" viewBox="0 0 28 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="4" rx="2" fill="currentColor"/>
            </motion.svg>  
        </td>
    </motion.tr>
  )
}
