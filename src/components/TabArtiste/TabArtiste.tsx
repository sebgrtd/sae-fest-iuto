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
    setArtistes: (mapArtiste: any) => void
}

export default function TabArtiste(props : Props) {
    const current = window.location.pathname;
    console.log(current);
  const [isOpen, setIsOpen] = useState(true);

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

  const sortedArtists = props.artistes.sort((a, b) => {
    const heurePassageA = a.heurePassage;
    const heurePassageB = b.heurePassage;
    return heurePassageA.localeCompare(heurePassageB); // Assuming heurePassage is in a sortable format
  });

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
            <th>TYPE EVENEMENT</th>
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
            {isOpen &&
              sortedArtists.map((artiste, index) => {
                return (
                  <TableRow
                    date={props.date}
                    setArtistes={props.setArtistes}
                    artiste={artiste}
                    key={artiste.idG}
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