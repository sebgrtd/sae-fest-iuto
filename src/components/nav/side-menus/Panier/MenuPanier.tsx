import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react';
import TextField from '../../../form/TextField';
import Button from '../../../form/Button';
import ItemPanier from './ItemPanier';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen : boolean) => void;
}

export default function MenuConnexion(props: Props) {

  const menuVariants = {
    hidden:{
      x: "42rem",
      transition:{
        duration: 0.5,
        ease: [1, -0.02, 0,1]
      }
    },
    visible:{
      x: 0,
      transition:{
        duration: 0.5,
        ease: [1, -0.02, 0,1]
      }
    }
  }

  return (
    <motion.div className='side-menu cart'
    variants={menuVariants}
    initial="hidden"
    animate={props.isOpen ? "visible" : "hidden"}>
        <div className="cross" onClick={() => props.setIsOpen(false)}>
            <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6.52539" y="0.321533" width="35.8974" height="3.58974" rx="1.79487" transform="rotate(45 6.52539 0.321533)" fill="#E45A3B"/>
              <rect x="3.87891" y="25.5957" width="35.8974" height="3.58974" rx="1.79487" transform="rotate(-45 3.87891 25.5957)" fill="#E45A3B"/>
            </svg>
        </div>
        <div className="container">
          <h2>Mon panier</h2>

          <section className='le-panier'>
            <ItemPanier typeBillet={1} quantite={1}/>
            <ItemPanier typeBillet={1} quantite={1}/>
            
          </section>
          
          <div className="sous-total">
            <h4>Sous total: </h4>
            <h4>35,99€</h4>
          </div>
          <Button text="RESERVER"/>
        </div>
    </motion.div>
  )
}
