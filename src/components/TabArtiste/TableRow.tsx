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
            <td>{props.artiste.nomSt ?? 'Pas de Style défini'}</td>
            <td>{props.artiste.scene}</td>
            <td>{props.artiste.typeA ? `Activité annexe : ${props.artiste.typeA}` : "Concert"}</td>
            {props.location !== "/horaire" && (
                <td onClick={handleSupprimerArtiste}>
                    <AnimatePresence>
                        {isLoading && (
                            <motion.svg
                                variants={spinnerVariants}
                                animate={isLoading ? "loading" : "default"}
                                initial="hidden"
                                className="spinner"
                                width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* ... (contenu du SVG) */}
                            </motion.svg>
                        )}
                    </AnimatePresence>
                    <motion.svg
                        variants={hideAndShowVariants}
                        initial="hidden"
                        animate={isLoading ? "hidden" : "show"}
                        width="28" height="4" viewBox="0 0 28 4" fill="none" xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="28" height="4" rx="2" fill="currentColor" />
                    </motion.svg>
                </td>
            )}
        </motion.tr>
    );
}