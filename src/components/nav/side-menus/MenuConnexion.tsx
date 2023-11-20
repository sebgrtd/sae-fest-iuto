import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react';
import TextField from '../../form/TextField';
import Button from '../../form/Button';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen : boolean) => void;
}

export default function MenuConnexion(props: Props) {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

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
    <motion.div className='side-menu connexion'
    variants={menuVariants}
    initial="hidden"
    animate={props.isOpen ? "visible" : "hidden"}>
        <div className="cross" onClick={() => props.setIsOpen(false)}>
          <img src="/icones/cross.svg" alt="croix" />
        </div>
        <div className="container">
          <h2>Me connecter</h2>
          <form onSubmit={handleSubmit}>
            <TextField text="e-mail" textVar={email} setTextVar={setEmail}/>
            <TextField text="mot de passe" textVar={password} setTextVar={setPassword} isPassword/>
            <Button text="CONNEXION"/>
          </form>
          <div className="other">
            <Link to="/aideconnexion">Je n'arrive pas à me connecter</Link>
            <Link to="inscription">Créer un compte</Link>
          </div>
        </div>
    </motion.div>
  )
}
