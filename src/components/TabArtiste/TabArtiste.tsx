import React, { useEffect, useState } from 'react'
import Artiste from '../../classes/Artiste'
import { AnimatePresence, motion } from 'framer-motion'
import Groupe from '../../classes/Groupe'
import axios from 'axios'
import { getUserCookie } from '../../cookies/CookiesLib'
import TableRow from './TableRow'

type Props = {
    date: string,
    artistes : Groupe[],
    setArtistes: (mapArtiste: any) => void,
    doesntHaveTypes?:boolean
}

export default function TabArtiste(props : Props) {
    const current = window.location.pathname;
  const [isOpen, setIsOpen] = useState(true);
  const[sortedArtists, setSortedArtists] = useState<Groupe[]>(props.artistes);

  const firstBarVariants={
    open:{
        opacity:0,
        transition: {
            duration: 0.5,
            ease:[1,0,0,1]
        }
    },
    closed:{
        opacity:1,
        transition: {
            duration: 0.5,
            ease:[1,0,0,1]
        }
    }
  }

  const secondBarVariants={
    open: {
        rotate:0,
        transition: {
            duration: 0.5,
            ease:[1,0,0,1]
        }
    },
    // rotate(-90 12 28)
    closed: {
        rotate: 90,
        transition: {
            duration: 0.5,
            ease:[1,0,0,1]
        }
    }
    
  }

  useEffect(() => {
    if (props.artistes == undefined){
        return;
    }
    let formatedArtists =props.artistes.sort((a, b) => {
        const heurePassageA = a.heurePassage;
        const heurePassageB = b.heurePassage;
        return heurePassageA.localeCompare(heurePassageB);
    })

    formatedArtists.map((artiste) => {
        // on va regarder pour chauqe artiste si son heure de passage est comprise dans les heures de passages que d'autres artistes
        // si oui on va ajouter dans sa propriété passageConcurrents la liste de ces artistes
        
        formatedArtists.map((artiste2) => {
            if (artiste.idG !== artiste2.idG){
                const heure1 = new Date(0,0,0,parseInt(artiste.heurePassage.split(":")[0]), parseInt(artiste.heurePassage.split(":")[1]))
                const heure1Fin = new Date(0,0,0,parseInt(artiste.heureFinPassage.split(":")[0]), parseInt(artiste.heureFinPassage.split(":")[1]))

                const heure2 = new Date(0,0,0,parseInt(artiste2.heurePassage.split(":")[0]), parseInt(artiste2.heurePassage.split(":")[1]))
                const heure2Fin = new Date(0,0,0,parseInt(artiste2.heureFinPassage.split(":")[0]), parseInt(artiste2.heureFinPassage.split(":")[1]))

                const estComprise = (heure1 >= heure2 && heure1 <= heure2Fin) || (heure1Fin >= heure2 && heure1Fin <= heure2Fin) || (heure1 <= heure2 && heure1Fin >= heure2Fin)

                if (estComprise){
                    // si l'artiste n'est pas déjà dedans
                    if(!artiste.passagesConcurrents?.includes(artiste2)){
                        // on ajoute l'artiste2 dans la liste des passages concurrents de l'artiste
                        if (! artiste.passagesConcurrents){
                            artiste.passagesConcurrents = [];
                        }
                        artiste.passagesConcurrents.push(artiste2);
                    }
                }
            }
        })

        setSortedArtists(formatedArtists);

        setSortedArtists((oldArtists : Groupe[]) => {
            let newArtists = [...oldArtists];

            // on ajoute les artistes concurrents

            newArtists.map((artiste) => {
                // on va regarder pour chauqe artiste si son heure de passage est comprise dans les heures de passages que d'autres artistes
                // si oui on va ajouter dans sa propriété passageConcurrents la liste de ces artistes
                
                newArtists.map((artiste2) => {
                    if (artiste.idG !== artiste2.idG){
                        const heure1 = new Date(0,0,0,parseInt(artiste.heurePassage.split(":")[0]), parseInt(artiste.heurePassage.split(":")[1]))
                        const heure1Fin = new Date(0,0,0,parseInt(artiste.heureFinPassage.split(":")[0]), parseInt(artiste.heureFinPassage.split(":")[1]))
        
                        const heure2 = new Date(0,0,0,parseInt(artiste2.heurePassage.split(":")[0]), parseInt(artiste2.heurePassage.split(":")[1]))
                        const heure2Fin = new Date(0,0,0,parseInt(artiste2.heureFinPassage.split(":")[0]), parseInt(artiste2.heureFinPassage.split(":")[1]))
        
                        const estComprise = (heure1 >= heure2 && heure1 <= heure2Fin) || (heure1Fin >= heure2 && heure1Fin <= heure2Fin) || (heure1 <= heure2 && heure1Fin >= heure2Fin)
        
                        if (estComprise){
                            // si l'artiste n'est pas déjà dedans
                            if(!artiste.passagesConcurrents?.includes(artiste2)){
                                // on ajoute l'artiste2 dans la liste des passages concurrents de l'artiste
                                if (! artiste.passagesConcurrents){
                                    artiste.passagesConcurrents = [];
                                }
                                artiste.passagesConcurrents.push(artiste2);
                            }
                        }
                    }
                })
            })

            newArtists.sort((a, b) => {
                const heurePassageA = a.heurePassage;
                const heurePassageB = b.heurePassage;
                return heurePassageA.localeCompare(heurePassageB);
            })
            return newArtists;
        
        })
      // j'ai envie d'ajouter pour chaque artiste sa liste de passages concurrents d'autres artistes (si un artiste passe en même temps)
  })}, [props.artistes]);

  useEffect(() => {
    console.log("sortedArtists", sortedArtists)
  }, [sortedArtists])

  return (
    <section className='tab-artiste'>
      <h3>{Groupe.getJourPassage(props.date, true)}</h3>
      <table>
        <thead>
          <tr>
            <th>HORAIRES</th>
            <th>ARTISTE</th>
            <th>GENRES MUSICAUX</th>
            <th>SCENE</th>
            {! props.doesntHaveTypes && (<th>TYPE EVENEMENT</th>)}
            <th
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <svg
                width='28'
                height='28'
                viewBox='0 0 28 28'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <motion.rect
                  variants={firstBarVariants}
                  animate={isOpen ? 'open' : 'closed'}
                  initial={false}
                  y='12'
                  width='28'
                  height='4'
                  rx='2'
                  fill='white'
                />
                <motion.rect
                  variants={secondBarVariants}
                  animate={isOpen ? 'open' : 'closed'}
                  initial={false}
                  y='12'
                  width='28'
                  height='4'
                  rx='2'
                  fill='white'
                />
              </svg>
            </th>
          </tr>
        </thead>
        <AnimatePresence>
          <motion.tbody layout>
            {(isOpen && sortedArtists) &&
              sortedArtists.map((artiste, index) => {
                return (
                  <TableRow
                    date={props.date}
                    setArtistes={props.setArtistes}
                    artiste={artiste}
                    key={artiste.idG+ " " + (artiste.passagesConcurrents ? artiste.passagesConcurrents?.length : -1)}
                    doesntHaveTypes={props.doesntHaveTypes}
                    location={current}
                  />
                );
              })}
          </motion.tbody>
        </AnimatePresence>
      </table>
    </section>
  );
}