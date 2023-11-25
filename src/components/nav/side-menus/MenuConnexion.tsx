import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react';
import TextField from '../../form/TextField';
import Button from '../../form/Button';
import axios from 'axios';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen : boolean) => void;
}

export default function MenuConnexion(props: Props) {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    // verifie si les champs sont remplis
    // verifie si l'email est bien un email (regex)

    // const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const isEmail = regexEmail.test(email);

    // if (isEmail || password === "") {
    //   alert("Veuillez remplir tous les champs")
    // }

    // fais une requete post avec axios à localhost:8080/connecter

    console.log(email + " " + password)

    const data = {
      email,
      password
    }

    console.log(data)

    axios.post("http://localhost:8080/connecter", data).then((res) => {
      console.log(res);
    })

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
          <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6.52539" y="0.321533" width="35.8974" height="3.58974" rx="1.79487" transform="rotate(45 6.52539 0.321533)" fill="#E45A3B"/>
            <rect x="3.87891" y="25.5957" width="35.8974" height="3.58974" rx="1.79487" transform="rotate(-45 3.87891 25.5957)" fill="#E45A3B"/>
          </svg>
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
