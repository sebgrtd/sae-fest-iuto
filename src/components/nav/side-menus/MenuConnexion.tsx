import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import {useState, useEffect, useRef} from 'react';
import TextField from '../../form/TextField';
import Button from '../../form/Button';
import axios from 'axios';
import { setUserCookie, getUserCookie, isConnected, removeUserCookie } from '../../../cookies/CookiesLib';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen : boolean) => void;
}

type menuConnexionTabs = "connexion" | "inscription" | "connecte" | "aideConnexion" | "modifierInfos" | "mesBillets";

export default function MenuConnexion(props: Props) {
  const[currentMenu, setCurrentMenu] = useState<menuConnexionTabs>(isConnected() ? "connecte" : "connexion"); 
  const formConnexionRef = useRef<HTMLFormElement>(null);
  const formInscriptionRef = useRef<HTMLFormElement>(null);
  const formResetMdpRef = useRef<HTMLFormElement>(null);
  const formModifierInfosRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setCurrentMenu(isConnected() ? "connecte" : "connexion");
  }, [props.isOpen === true])
  

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[pseudo, setPseudo] = useState("");
  const[oldPassword, setOldPassword] = useState("");

  console.log(getUserCookie());

  const goTo = (menu : menuConnexionTabs, e? : React.MouseEvent<HTMLAnchorElement>) => {
    if(e) {e.preventDefault();}
    //reset tous les champs
    setEmail("");
    setPassword("");
    setPseudo("");
    setOldPassword("");

    if (menu === "modifierInfos"){
      if (isConnected() === false){
        goTo("connexion");
        return;
      }
      const user = getUserCookie();
      setEmail(user.emailUser);
      setPseudo(user.pseudoUser);
    }

    setCurrentMenu(menu);
  }

  const handleConnexion = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // verifie si les champs sont remplis
    // verifie si l'email est bien un email (regex)

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = regexEmail.test(email);

    if (!isEmail){
      alert("L'email n'est pas valide");
      return;
    }
    if (password.length === 0){
      alert("Le mot de passe doit faire au moins 8 caractères");
      return;
    }

    // fais une requete post avec axios à localhost:8080/connecter

    const data = {
      email,
      password
    }

    axios.post("http://localhost:8080/connecter", data).then((res) => {
      const data = res.data;
      if (data.error){
        alert(data.error);
        return;
      }
      const idUser = data.idUser;
      const pseudoUser = data.pseudoUser;
      const emailUser = data.emailUser;
      setUserCookie({idUser, pseudoUser, emailUser});
      goTo("connecte");
    })
  }

  const handleDeconnexion = (e : React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    removeUserCookie();
    setCurrentMenu("connexion");
  }

  const handleInscription = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const data = {
      pseudo,
      email,
      password
    }

    axios.post("http://localhost:8080/inscription", data).then((res) => {
      const data = res.data;

      if (data.error){
        alert(data.error);
        return;
      }

      const idUser = data.idUser;
      const pseudoUser = data.pseudoUser;
      const emailUser = data.emailUser;
      setUserCookie({idUser, pseudoUser, emailUser});
      goTo("connecte");
    })

  }

  const handleResetMdp = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email
    }

    axios.post("http://localhost:8080/resetPassword", data).then((res) => {
      const data = res.data;
      if (res.data.error){
        alert(data.error);
        return;
      }

      // TODO CHANGER SUR LA PAGE DE CODE

    })
  }

  const handleModifierInfos = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isConnected() === false){
      goTo("connexion");
      return;
    }

    const currentID = getUserCookie().idUser;

    const data = {
      id:currentID,
      pseudo,
      email,
      password,
      oldPassword
    } 

    axios.post("http://localhost:8080/modifierProfil", data).then((res) => {
      const data = res.data;

      if (data.error){
        alert(data.error);
        return;
      }

      const idUser = data.idUser;
      const pseudoUser = data.pseudoUser;
      const emailUser = data.emailUser;
      setUserCookie({idUser, pseudoUser, emailUser});
      goTo("connecte");
    })
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

  const menuSwitchVariants = {
    exit:{
      // part à gauche et disparait
      x: "-100vw",
      transition:{
        duration: 0.5,
        ease: [1, -0.02, 0,1]
      }
    },
    appearing:{
      // vient de droite et apparait
      x: "100vw",
      transition:{
        duration: 0.5,
        ease: [1, -0.02, 0,1]
      }
    },
    default:{
      // reste au centre
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
        <AnimatePresence>
          {currentMenu === "connexion" ? (
              <motion.div className="container"
              variants={menuSwitchVariants}
              initial="appearing"
              animate="default"
              exit="exit"
              key={currentMenu}
              >  
              <h2>Me connecter</h2>
              <form onSubmit={handleConnexion} ref={formConnexionRef}>
                <TextField text="e-mail" textVar={email} setTextVar={setEmail}/>
                <TextField text="mot de passe" textVar={password} setTextVar={setPassword} isPassword/>
                <Button text="CONNEXION" formRef={formConnexionRef}/>
              </form>
              <div className="other">
                <a href="" onClick={(e) => goTo("aideConnexion",e)}>Je n'arrive pas à me connecter</a>
                <a href="" onClick={(e) => goTo("inscription",e)}>Créer un compte</a>
              </div>
            </motion.div>
          ): currentMenu === "connecte" ?(
            <motion.div className="container"
            variants={menuSwitchVariants}
              initial="appearing"
              animate="default"
              exit="exit"
              key={currentMenu}
            >  
              <h2>Bonjour {getUserCookie().pseudoUser}</h2>
              {
                // todo billets achetés
              }
              <div className="other">
                <a href="" onClick={(e) => goTo("modifierInfos",e)}>Modifier mes informations</a>
                <a href="" onClick={handleDeconnexion} className='deconnexion'>Déconnexion</a>
              </div>
              
            </motion.div>
          )
        : currentMenu === "inscription" ? (
          <motion.div className="container"
            variants={menuSwitchVariants}
              initial="appearing"
              animate="default"
              exit="exit"
              key={currentMenu}
            >  
            <h2>Créer un compte</h2>
            <form onSubmit={handleInscription}
            ref={formInscriptionRef}
            >
                <TextField text="pseudo" textVar={pseudo} setTextVar={setPseudo}/>
                <TextField text="e-mail" textVar={email} setTextVar={setEmail}/>
                <TextField text="mot de passe" textVar={password} setTextVar={setPassword} isPassword/>
                <Button text="M'INSCRIRE" formRef={formInscriptionRef}/>
            </form>
            <div className="other">
                <a href="" onClick={(e) => goTo("aideConnexion",e)}>Je n'arrive pas à me connecter</a>
                <a href="" onClick={(e) => goTo("connexion",e)}>J'ai déjà un compte</a>
              </div>
            </motion.div>
        )
        : currentMenu === "aideConnexion" ? (
          <motion.div className="container"
            variants={menuSwitchVariants}
              initial="appearing"
              animate="default"
              exit="exit"
              key={currentMenu}
            >  
            <h2>Réinitialiser mon mot de passe</h2>
            <form onSubmit={handleResetMdp}
            ref={formResetMdpRef}
            >
                <TextField text="e-mail" textVar={email} setTextVar={setEmail}/>
                <Button text="REINITIALISER" formRef={formResetMdpRef}/>
            </form>
            <div className="other">
                <a href="" onClick={(e) => goTo("inscription",e)}>Créer un compte</a>
                <a href="" onClick={(e) => goTo("connexion",e)}>J'ai déjà un compte</a>
              </div>
          </motion.div>
        )
        : currentMenu === "modifierInfos" ? (
          <motion.div className="container"
            variants={menuSwitchVariants}
              initial="appearing"
              animate="default"
              exit="exit"
              key={currentMenu}
            >  
            <h2>Modifier mes informations</h2>
            <form onSubmit={handleModifierInfos}
            ref={formModifierInfosRef}
            >
                <TextField text="pseudo" textVar={pseudo} setTextVar={setPseudo}/>
                <TextField text="e-mail" textVar={email} setTextVar={setEmail}/>
                <TextField text="mot de passe" textVar={password} setTextVar={setPassword} isPassword/>
                <TextField text="ancien mot de passe" textVar={oldPassword} setTextVar={setOldPassword} isPassword/>
                <Button text="MODIFIER" formRef={formModifierInfosRef}/>
            </form>
            <div className="other">
                <a href="" onClick={(e) => goTo("connecte",e)}>Retour</a>
              </div>
          </motion.div>
        )
        : currentMenu === "mesBillets" && (
          <></>
        )
        }
          
        </AnimatePresence>
    </motion.div>
  )
}
