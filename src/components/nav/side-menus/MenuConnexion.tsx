import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import {useState, useEffect, useRef} from 'react';
import TextField from '../../form/TextField';
import Button from '../../form/Button';
import axios from 'axios';
import { setUserCookie, getUserCookie, isConnected, removeUserCookie } from '../../../cookies/CookiesLib';
import ChampCode from '../../form/ChampCode';
import Combo from '../../form/Combo';
import SearchBar from '../../form/SearchBar';
import SelectionneurArtiste from '../../Artiste/SelectionneurArtiste';
import Artiste from '../../../classes/Artiste';
import TabArtiste from '../../TabArtiste/TabArtiste';
import Groupe from '../../../classes/Groupe';
import AfficheurMonBillet from './AfficheurMonBillet';
import Billet from '../../../classes/Billet';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen : boolean) => void;
}

type menuConnexionTabs = "connexion" | "inscription" | "connecte" | "aideConnexion" | "modifierInfos" | "mesBillets" | "codeVerification" | "changerMdp" | "planification" | "affichage-planification";

type typeErreur = "email" | "password" | "pseudo" | "oldPassword" | "verifPassword" | "codeVerification";

export default function MenuConnexion(props: Props) {
  const[currentMenu, setCurrentMenu] = useState<menuConnexionTabs>(isConnected() ? "connecte" : "connexion"); 
  const formConnexionRef = useRef<HTMLFormElement>(null);
  const formInscriptionRef = useRef<HTMLFormElement>(null);
  const formResetMdpRef = useRef<HTMLFormElement>(null);
  const formModifierInfosRef = useRef<HTMLFormElement>(null);
  const formCodeVerificationRef = useRef<HTMLFormElement>(null);
  const formModifMdpRef = useRef<HTMLFormElement>(null);
  const[isLoading, setIsLoading] = useState(false);
  const[filtreDate, setFiltreDate] = useState("Tout");
  const[filtreGenre, setFiltreGenre] = useState("Tout");
  const[mesBillets, setMesBillets] = useState<Billet[]>([]);

  useEffect(() => {
    setCurrentMenu(isConnected() ? "connecte" : "connexion");
  }, [props.isOpen === true])

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[verifierPassword, setVerifierPassword] = useState("");
  const[pseudo, setPseudo] = useState("");
  const[oldPassword, setOldPassword] = useState("");
  const[codeVerification, setCodeVerification] = useState("");

  const[errorEmail, setErrorEmail] = useState("");
  const[errorPassword, setErrorPassword] = useState("");
  const[errorPseudo, setErrorPseudo] = useState("");
  const[errorOldPassword, setErrorOldPassword] = useState("");
  const[errorVerifPassword, setErrorVerifPassword] = useState("");
  const[errorCodeVerification, setErrorCodeVerification] = useState("");

  const[isWrong, setIsWrong] = useState(false);
  const[isMenuChanging, setIsMenuChanging] = useState(false);

  const[artistes, setArtistes] = useState<Groupe[]>([]);
  // j'ai envie d'avoir une sdd de type Map <String> : Groupe[]
  const[tableauxArtistes, setTableauxArtistes] = useState<Map<string, Groupe[]>>(new Map());

  const handleResetArtists = () => {
    axios.get("http://localhost:8080/getArtistesWithSave?idUser="+getUserCookie().idUser+ (filtreDate !== "Tout" ? "&date="+filtreDate : "") + (filtreGenre !== "Tout" ? "&genre="+filtreGenre : "")
    ).then(((res) => {
          if (res.status === 200){
            const data = res.data;
            const listeArtistes : Groupe[] = [];
            data.forEach((artiste: Groupe) => {
              listeArtistes.push(artiste);
            })
            setArtistes(listeArtistes);
          }
        })).catch((err:any) => {
          console.log(err)
        })
  }

  const handleSearch = (searchText : string) => {
    if (searchText == ""){
      handleResetArtists();
      return;
    }
    // on ajoute les filtres dans la requete comme toute à l'heure
    const requete = "http://localhost:8080/searchUsersWithSave?recherche="+searchText+"&idUser="+getUserCookie().idUser + (filtreDate !== "Tout" ? "&date="+filtreDate : "") + (filtreGenre !== "Tout" ? "&genre="+filtreGenre : "");
    axios.get(requete).then((res) => {
      console.log(res)
      if (res.status === 200){
        const data = res.data as Groupe[];
        setArtistes(data);
      }
      else{
        console.log("erreur lors de la récupération des artistes")
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    console.log("filtreDate:", filtreDate);
    console.log("filtreGenre:", filtreGenre);
    if (currentMenu === "planification"){
      if (filtreDate !== "Tout" || filtreGenre !== "Tout"){
        const requete = "http://localhost:8080/getArtistesWithSave?idUser=" + getUserCookie().idUser + (filtreDate !== "Tout" ? "&date="+filtreDate : "") + (filtreGenre !== "Tout" ? "&genre="+filtreGenre : "");
        console.log(requete);
        axios.get(requete).then((res) => {
          if (res.status === 200){
            const data = res.data as Groupe[];
            setArtistes(data);
          }
          else{
            console.log("erreur lors de la récupération des artistes")
          }
        }).catch((err) => {
          console.log(err)
        })
      }
      else{
        handleResetArtists();
      }
    }
  }, [filtreDate, filtreGenre])

  useEffect(() => {
    if (codeVerification.length === 6){
      formCodeVerificationRef.current?.requestSubmit();
    }
  }, [codeVerification])
  
  useEffect(() => {   
    if (props.isOpen){
      
      if (currentMenu === "planification"){
        handleResetArtists();
      }

      if (currentMenu === "connecte"){
        axios.get("http://localhost:8080/getMesBillets?idUser="+getUserCookie().idUser).then((res) => {
          if (res.status === 200){
            const data = res.data as Billet[];
            console.log(data);
            setMesBillets([]);
            setMesBillets((oldBillets:Billet[]) => {
              let newBillets:Billet[] = [...oldBillets];
              // j'ai envie de faire en sorte que si l'on a deux billets pareils
              // (c'est à dire même durée et même date de début)
              // on les fusionne en un seul billet avec une quantité de 2

              data.forEach((billet:Billet) => {
                let found = false;
                newBillets.forEach((billet2:Billet) => {
                  if (billet.dateDebutB === billet2.dateDebutB && billet.duree === billet2.duree){
                    billet2.quantite++;
                    found = true;
                  }
                })
                if (found === false){
                  billet.quantite= 1;
                  newBillets.push(billet);
                }
              })

              return newBillets;
            });
          }
        }).catch((err:any) => {
          console.log(err)
        })
      }

      if (currentMenu === "affichage-planification"){
        axios.get("http://localhost:8080/getMonPlanning?idUser="+getUserCookie().idUser).then((res) => {
          if (res.status === 200){
            const data = res.data;
            for (let key in data){
              console.log(key);
              if (data.hasOwnProperty(key)){
                console.log(key,data[key])
                setTableauxArtistes((oldArtistes:any) => {
                  return { ...oldArtistes, [key] :data[key]}
                })
              }
            }
          }
        }).catch((err:any) => {
          console.log(err)
          alert("Une erreur est survenue, veuillez réessayer plus tard")
        })
      }
    }
    
  }, [props.isOpen, currentMenu])

  const handleDownload = () => {
    console.log(tableauxArtistes)
    let newTableauxArtistes = new Map();
    // on va refaire la même map sans l'entrée passageConcurrents
    Object.entries(tableauxArtistes).forEach(([key, value]) => {
      let newValue = value.map((groupe:Groupe) => {
        let newGroupe = groupe
        return newGroupe;
      })
      newTableauxArtistes.set(key, newValue);
    })
    console.log(Array.from(newTableauxArtistes.entries()));
    axios.post('http://localhost:8080/telecharger_planif',{
    responseType: 'blob',
    data: Array.from(newTableauxArtistes.entries()),
    })
    .then((response) => {
        console.log(response);
        // sur mon serveur j'ai fait send_file('billet.pdf, as_attachment=True)
        
        const blob = new Blob([response.data], { type: 'application/pdf' });

        const url = window.URL.createObjectURL(blob);
        
        window.open(url);

    })
}

  const goTo = (menu : menuConnexionTabs, e? : React.MouseEvent<HTMLAnchorElement>) => {
    if(e) {e.preventDefault();}
    //reset tous les champs
    setEmail("");
    setPassword("");
    setPseudo("");
    setOldPassword("");
    setVerifierPassword("");

    clearErrors();
    setIsLoading(false);
    setIsMenuChanging(true);

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
    setTimeout(() => {
      setIsMenuChanging(false);
    }, 500);
  }

  const clearErrors = () => {
    setErrorEmail("");
    setErrorPassword("");
    setErrorPseudo("");
    setErrorOldPassword("");
    setErrorVerifPassword("");
  }

  const setErreur = (type : typeErreur, message : string) => {
    setIsWrong(true);
    setIsLoading(false);
  
    switch (type){
      case "email":
        setErrorEmail(message);
        break;
      case "password":
        setErrorPassword(message);
        break;
      case "pseudo":
        setErrorPseudo(message);
        break;
      case "oldPassword":
        setErrorOldPassword(message);
        break;
      case "verifPassword":
        setErrorVerifPassword(message);
        break;
      case "codeVerification":
        setErrorCodeVerification(message);
        break;
    }


    setTimeout(() => {
      setIsWrong(false);
    }, 500);

  }

  const checkEmail = (email : string) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = regexEmail.test(email);

    if (!isEmail){
      setErreur("email", "L'email n'est pas valide");
      return false;
    }
    return true;
  }

  // regarde si le pseudo fait +4 caractères
  const checkPseudo = (pseudo : string) => {
    if (pseudo.length < 4){
      setErreur("pseudo", "Le pseudo doit faire au moins 4 caractères");
      return false;
    }
    return true;
  }

  // regarde si le mot de passe fait +4 caractères
  const checkPassword = (password : string) => {
    if (password.length < 4){
      setErreur("password", "Le mot de passe doit faire au moins 4 caractères");
      return false;
    }
    return true;
  }

  const CheckOldPassword = (oldPassword : string) => {
    if (oldPassword.length < 4){
      setErreur("oldPassword", "Le mot de passe doit faire au moins 4 caractères");
      return false;
    }
    return true;
  }
  
  const checkPasswordMatching = (password : string, verifierPassword : string) => {
    if (password !== verifierPassword){
      setErreur("verifPassword", "Les mots de passe ne correspondent pas");
      return false;
    }
    return true;
  }

  const handleConnexion = (e : React.FormEvent<HTMLFormElement>) => {
    clearErrors();
    e.preventDefault();
    setIsLoading(true);
    // verifie si les champs sont remplis
    // verifie si l'email est bien un email (regex)

    if (!checkEmail(email) || !checkPassword(password)){
      return;
    }

    // fais une requete post avec axios à localhost:8080/connecter

    const data = {
      email,
      password,
      statUser: "user"
    }

    axios.post("http://localhost:8080/connecter", data).then((res) => {
      const data = res.data;
      if (data.error){
        setErreur("email", data.error);
        setErreur("password", data.error);
        return;
      }
      const idUser = data.idUser;
      const pseudoUser = data.pseudoUser;
      const emailUser = data.emailUser;
      setUserCookie({idUser, pseudoUser, emailUser});
      goTo("connecte");
      setIsLoading(false);
    })
  }

  const handleDeconnexion = (e : React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    clearErrors();

    removeUserCookie();
    setCurrentMenu("connexion");
  }

  const handleInscription = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();
    setIsLoading(true);

    if (!checkEmail(email) || !checkPassword(password) || !checkPseudo(pseudo)){
      return;
    }
    
    const data = {
      pseudo,
      email,
      password
    }

    axios.post("http://localhost:8080/inscription", data).then((res) => {
      const data = res.data;

      if (data.error){
        setErreur("email", data.error);
        return;
      }

      const idUser = data.idUser;
      const pseudoUser = data.pseudoUser;
      const emailUser = data.emailUser;
      setUserCookie({idUser, pseudoUser, emailUser});
      goTo("connecte");
      setIsLoading(false);
    })

  }

  const handleResetMdp = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();
    setIsLoading(true);

    if (!checkEmail(email)){
      return;
    }

    const data = {
      email
    }

    axios.post("http://localhost:8080/envoyerCodeVerification", data).then((res) => {
      const dataRes = res.data;
      if (res.data.error){
        setErreur("email", dataRes.error);
        return;
      }

      if (res.data.success){
        goTo("codeVerification")
        setCodeVerification("");
        setEmail(data.email);
      }
      setIsLoading(false);

    })
  }

  const handleEnvoyerCode = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();
    setIsLoading(true);

    if (codeVerification.length !== 6){
      setErreur("codeVerification", "Le code doit faire 6 caractères");
      return;
    }

    const data = {
      email,
      code:codeVerification
    }

    axios.post("http://localhost:8080/testerCodeVerification", data).then((res) =>{
      const dataRes = res.data;
      if(dataRes.error){
        setErreur("codeVerification", dataRes.error);
        setCodeVerification("");
        return;
      }

      if(res.data.success){
        console.log("code correct");
        goTo("changerMdp")
        setEmail(data.email);
        setCodeVerification(data.code);
      }
      setIsLoading(false);
    })
  };

  const handleModifierInfos = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();
    setIsLoading(true);
    
    if (isConnected() === false){
      goTo("connexion");
      return;
    }

    const currentID = getUserCookie().idUser;

    if (!checkEmail(email) || !checkPassword(password) || !checkPseudo(pseudo) || !CheckOldPassword(oldPassword)){
      return;
    }

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
        setErreur("oldPassword", data.error);
        return;
      }

      const idUser = data.idUser;
      const pseudoUser = data.pseudoUser;
      const emailUser = data.emailUser;
      setUserCookie({idUser, pseudoUser, emailUser});
      goTo("connecte");
      setIsLoading(false);
    })
  }

  const handleModifierMdp = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();
    setIsLoading(true);

    if (!checkPassword(password) || !checkPasswordMatching(password, verifierPassword)){
      return;
    }

    const data = {
      email,
      password,
      code: codeVerification
    }

    axios.post("http://localhost:8080/modifierMdp", data).then((res) => {
      const dataRes = res.data;

      if (dataRes.error){
        alert(dataRes.error);
        
        return;
      }

      if (dataRes.success){
        removeUserCookie();
        goTo("connexion");
      }
      setIsLoading(false);
    })
  }

  const menuVariants = {
    hidden:{
      x: (currentMenu === "planification" || currentMenu === "affichage-planification") ? "80rem" : "42rem",
      width: (currentMenu === "planification" || currentMenu === "affichage-planification") ? "80rem" : "42rem",
      transition:{
        duration: 0.5,
        ease: [1, -0.02, 0,1]
      }
    },
    visible:{
      x: 0,
      width: (currentMenu === "planification" || currentMenu === "affichage-planification") ? "80rem" : "42rem",
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
    },
    wrong:{
      // fais remuer le menu de gauche à droite avant qu'il aille au centre
      x: [0, -20, 20, -20, 20, 0],
      transition:{
        duration: 0.4,
        ease: "linear"
      }
    }
    
  }

  return (
    <motion.div className={`side-menu connexion ${((currentMenu === "planification" || currentMenu === "affichage-planification") && !isMenuChanging) ? "large":""}`}
    variants={menuVariants}
    initial="hidden"
    animate={props.isOpen ? "visible" : "hidden"}>
        <div className="cross" onClick={() =>  {props.setIsOpen(false)}}>
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
              animate={isWrong ? "wrong" : "default"}
              exit={!props.isOpen ? "default" : "exit"}
              key={currentMenu}
              >  
              <h2>Me connecter</h2>
              <form onSubmit={handleConnexion} ref={formConnexionRef}>
                <TextField errorText={errorEmail} text="e-mail" textVar={email} setTextVar={setEmail}/>
                <TextField errorText={errorPassword} text="mot de passe" textVar={password} setTextVar={setPassword} isPassword/>
                <Button isLoading={isLoading} text="CONNEXION"/>
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
              <div className="mes-billets">
                {
                  mesBillets.length > 0 ? (
                    mesBillets.map((billet) => {
                      return (
                        <AfficheurMonBillet key={billet.idB} billet={billet}/>
                      )
                    })
                  ) : (
                    <p className="empty">Vous n'avez pas encore de billets</p>
                  )
                }
              </div>
              <div className="other">
                <a href="" onClick={(e) => goTo("modifierInfos",e)}>Modifier mes informations</a>
                <a href="" onClick={(e) => goTo("planification",e)}>Planifier mon festival</a>
                <a href="" onClick={handleDeconnexion} className='error'>Déconnexion</a>
              </div>
              
            </motion.div>
          )
        : currentMenu === "planification" ? (
          <motion.div className="container"
            variants={menuSwitchVariants}
              initial="appearing"
              animate="default"
              exit="exit"
              key={currentMenu}
            >  
            <main>
              <h2>Planifier mon festival</h2>
              
              <section className='planification'>
                <header className='filters-container'>
                  <div className="filters">
                      <Combo title="DATE" choices={["Tout", "21 Juin", "22 Juin", "23 Juin"]} currentChoice={filtreDate} setCurrentChoice={setFiltreDate} />
                      <Combo title="GENRE" choices={["Tout", "Rap", "Pop", "Disco", "Electro", "House", "Rock", "Métal"]} currentChoice={filtreGenre} setCurrentChoice={setFiltreGenre} />
                  </div>
                  <SearchBar onSearch={handleSearch} text="Rechercher un artiste"/>
                </header>

                <div className="liste-artistes">
                  {
                    artistes && artistes.length >0 && artistes.map((artiste) => {
                      return (
                        <SelectionneurArtiste key={artiste.idG + " " + artiste.isSaved} idArtiste={artiste.idG} nomArtiste={artiste.nomG} datePassage={Groupe.getJourPassage(artiste.datePassage)} isSaved={artiste.isSaved}/>
                      )
                    })
                  }
                </div>
              </section>
            </main>

              <div className="other">
                <a href="" onClick={(e) => goTo("connecte",e)}>Retour</a>

                <a href="" onClick={(e) => goTo("affichage-planification",e)} className="btn-link">
                  <Button text="Voir ma planification" />
                </a>
              </div>
              
            </motion.div>
        )
        : currentMenu === "affichage-planification" ? (
          <motion.div className="container"
            variants={menuSwitchVariants}
              initial="appearing"
              animate="default"
              exit="exit"
              key={currentMenu}
            >  
            <main>
              <h2>Ma planification</h2>
              
              <section className='liste-artistes liste-planification'>

                {
                  Object.entries(tableauxArtistes).map(([key, value]) => (
                    value.length > 0 && 
                    <TabArtiste doesntHaveTypes key={key} date={key} artistes={value} setArtistes={setTableauxArtistes} />
                  ))
                }

                {
                  // si tous les tableaux sont vides on affiche que c'est vide
                  Object.entries(tableauxArtistes).every(([key, value]) => value.length === 0) && (
                    <p className="empty">Votre planification est vide. <br></br> Ajoutez des artistes dans votre liste d'artistes à voir en allant dans le menu précédent (bouton "Retour").</p>
                  )
                }

              </section>
            </main>

              <div className="other">
                <a href="" onClick={(e) => goTo("planification",e)}>Retour</a>

                <a href="" onClick={(e) => goTo("affichage-planification",e)} className="btn-link">
                  <Button onClick={handleDownload} text="Télécharger" isDisabled={
                    // si tous les tableaux sont vides on affiche que c'est vide
                    Object.entries(tableauxArtistes).every(([key, value]) => value.length === 0)
                  
                  } />
                </a>
              </div>
              
            </motion.div>
        )
        : currentMenu === "inscription" ? (
          <motion.div className="container"
            variants={menuSwitchVariants}
              initial="appearing"
              animate={isWrong ? "wrong" : "default"}
              exit={!props.isOpen ? "default" : "exit"}
              key={currentMenu}
            >  
            <h2>Créer un compte</h2>
            <form onSubmit={handleInscription}
            ref={formInscriptionRef}
            >
                <TextField errorText={errorPseudo} text="pseudo" textVar={pseudo} setTextVar={setPseudo}/>
                <TextField errorText={errorEmail} text="e-mail" textVar={email} setTextVar={setEmail}/>
                <TextField errorText={errorPassword} text="mot de passe" textVar={password} setTextVar={setPassword} isPassword/>
                <Button isLoading={isLoading} text="M'INSCRIRE"/>
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
              animate={isWrong ? "wrong" : "default"}
              exit={!props.isOpen ? "default" : "exit"}
              key={currentMenu}
            >  
            <h2>Réinitialiser mon mot de passe</h2>
            <form onSubmit={handleResetMdp}
            ref={formResetMdpRef}
            >
                <TextField errorText={errorEmail} text="e-mail" textVar={email} setTextVar={setEmail}/>
                <Button isLoading={isLoading} text="REINITIALISER" />
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
              animate={isWrong ? "wrong" : "default"}
              exit={!props.isOpen ? "default" : "exit"}
              key={currentMenu}
            >  
            <h2>Modifier mes informations</h2>
            <form onSubmit={handleModifierInfos}
            ref={formModifierInfosRef}
            >
                <TextField errorText={errorPseudo} text="pseudo" textVar={pseudo} setTextVar={setPseudo}/>
                <TextField errorText={errorEmail} text="e-mail" textVar={email} setTextVar={setEmail}/>
                <TextField errorText={errorPassword} text="mot de passe" textVar={password} setTextVar={setPassword} isPassword/>
                <TextField errorText={errorOldPassword} text="ancien mot de passe" textVar={oldPassword} setTextVar={setOldPassword} isPassword/>
                <Button isLoading={isLoading} text="MODIFIER"/>
            </form>
            <div className="other">
                <a href="" onClick={(e) => goTo("connecte",e)}>Retour</a>
              </div>
          </motion.div>
        )
        : currentMenu === "mesBillets" ? (
          <></>
        )
        : currentMenu === "codeVerification" ? (
          <motion.div className="container"
            variants={menuSwitchVariants}
              initial="appearing"
              animate={isWrong ? "wrong" : "default"}
              exit={!props.isOpen ? "default" : "exit"}
              key={currentMenu}
            >  
            <h2>Entrez le code reçu par e-mail</h2>
            <form onSubmit={handleEnvoyerCode}
            ref={formCodeVerificationRef}
            >
                <ChampCode errorText={errorCodeVerification} codeVar={codeVerification} setCodeVar={setCodeVerification} nbChar={6}/>
                <Button isLoading={isLoading} text="VALIDER"/>
            </form>
            <div className="other">
                <a href="" onClick={(e) => goTo("connexion",e)}>Retour</a>
              </div>
          </motion.div>
        ) 
        : currentMenu === "changerMdp" && (
          <motion.div className="container"
            variants={menuSwitchVariants}
              initial="appearing"
              animate={isWrong ? "wrong" : "default"}
              exit={!props.isOpen ? "default" : "exit"}
              key={currentMenu}
            >  
            <h2>Choisissez un nouveau mot de passe</h2>
            <form onSubmit={handleModifierMdp}
            ref={formModifMdpRef}
            >
                 <TextField errorText={errorPassword} isPassword text="Mot de passe" textVar={password} setTextVar={setPassword}/>
                <TextField errorText={errorVerifPassword} isPassword text="Vérifiez votre mot de passe" textVar={verifierPassword} setTextVar={setVerifierPassword}/>
                <Button isLoading={isLoading} text="VALIDER" />
            </form>
          </motion.div>
        )
        }
          
        </AnimatePresence>
    </motion.div>
  )
}
