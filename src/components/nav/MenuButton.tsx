import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion';

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen : boolean) => void;
}

export default function MenuButton(props : Props) {

  const[isHovered, setIsHovered] = useState(false);

  const menuBarVariants = (index : number) => {
    return {
        default:{
            rotate: 0,
            y:0,
            x:0,
            opacity:1,
            transition:{
                duration: 0.5,
                ease: [1, -0.02, 0,1]
            }
        },
        hover:{
            opacity: index === 1 ? 0 : 1,
            rotate: index == 0 ? 90 : 0,
            y : index == 0 ? "0.7rem" : index == 1 ? 0 : "-0.7rem",
            transition:{
                duration: 0.5,
                ease: [1, -0.02, 0,1]
            }
        },
        close:{
            opacity: index === 1 ? 0 : 1,
            rotate: index == 0 ? 45 : -45,
            y : index == 0 ? "0.7rem" : index == 1 ? 0 : "-0.7rem",
            transition:{
                duration: 0.5,
                ease: [1, -0.02, 0,1]
            }
        }
    }
  }

  return (
    <div className='nav-btn menu-btn' onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)} onClick={() => props.setIsOpen(!props.isOpen)}>

        <motion.div className="bar" 
        variants={menuBarVariants(0)} 
        initial="default"
        animate={props.isOpen ? "close" : isHovered ? "hover" : "default"} />
        <motion.div className="bar" 
        variants={menuBarVariants(1)} 
        initial="default"
        animate={props.isOpen ? "close" : isHovered ? "hover" : "default"} />
        <motion.div className="bar" 
        variants={menuBarVariants(2)} 
        initial="default"
        animate={props.isOpen ? "close" : isHovered ? "hover" : "default"} />

    </div>
  )
}
