import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Variant, Variants, motion } from 'framer-motion';

type Props = {
    linkTo: string;
    name: string;
    isCurrent: boolean;
    isOpen: boolean;
    setIsOpen : (isOpen : boolean) => void;
    variants: Variants;
}

export default function NavLink(props : Props) {
    return (
    <motion.div className='link-container'
    variants={props.variants}
    whileHover={props.isCurrent ? {} : "hover"}>   
        <motion.div
        variants={props.variants}
        initial={!props.isOpen ? "hidden" : "visibleColor"}
        animate={props.isOpen ? "visible" : "hidden"}
        whileHover={props.isCurrent ? {} : "hoverColor"}
        >
            <Link to={props.linkTo} className={props.isCurrent ? "active" : ""} onClick={() => props.setIsOpen(false)}>{props.name}</Link>
        </motion.div>
    </motion.div>
  )
}
