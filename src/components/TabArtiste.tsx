import React, { useState } from 'react'
import Artiste from '../utilitaires/Artiste'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
    date: string
    artistes : Artiste[]
    setArtistes: (artistes: Artiste[]) => void
}

export default function TabArtiste(props : Props) {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <section className='tab-artiste'>
        <h3>{props.date}</h3>
        <table>
            <tr className='heading'>
                <th>HORAIRES</th>
                <th>ARTISTE</th>
                <th>GENRES MUSICAUX</th>
                <th>SCENE</th>
                <th onClick={() => setIsOpen(!isOpen)}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <motion.rect
                        variants={firstBarVariants}
                        animate={isOpen ? "open" : "closed"}
                        initial={false}
                        y="12" width="28" height="4" rx="2" fill="white"/>
                        <motion.rect 
                        variants={secondBarVariants}
                        animate={isOpen ? "open" : "closed"}
                        initial={false}
                        y="12" width="28" height="4" rx="2" fill="white"/>
                    </svg>
                </th>
            </tr>
            <AnimatePresence>
            {
             isOpen && props.artistes.map((artiste, index) => {
                    return (
                        <motion.tr key={index} 
                        variants={tableRowVariant}
                        initial="closed"
                        exit="closed"
                        animate="open"
                        >
                            <td>{artiste.horairePassage}</td>
                            <td>{artiste.nomMG} {artiste.prenomMG}</td>
                            <td>{artiste.genresMusicaux.join(', ')}</td>
                            <td>{artiste.scene}</td>
                            <td>
                                <svg width="28" height="4" viewBox="0 0 28 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="28" height="4" rx="2" fill="currentColor"/>
                                </svg>
                            </td>
                        </motion.tr>
                    )
                })
            }
            </AnimatePresence>
        </table>
    </section>
  )
}
