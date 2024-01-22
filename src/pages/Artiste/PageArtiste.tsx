import {useEffect, useState, useRef} from 'react'
import { Link, useLocation } from 'react-router-dom'
import BoutonReseau from '../../components/Artiste/BoutonReseau'
import { motion } from 'framer-motion'
import axios from 'axios';
import Groupe, { Evenement, Reseaux } from '../../classes/Groupe';


export default function PageArtiste() {
  
    const location = useLocation();
    const oldX = location.state?.oldX;
    const oldY = location.state?.oldY;
    const oldGroupes = location.state?.oldGroupes;
    const[nomArtiste, setNomArtiste] = useState(location.state?.nomArtiste)
    const[date, setDate] = useState(location.state?.date)
    const[heure, setHeure] = useState(location.state?.heure)
    const[description, setDescription] = useState("Tame Impala est un projet musical australien originaire de Perth, créé en 2007 et dirigé par le musicien multi-instrumentiste Kevin Parker. Parker écrit, joue, produit et enregistre la musique seul en studio d'enregistrement. En tournée, il est accompagné de différents musiciens. Tame Impala est né du précédent groupe de Kevin Parker, Dee Dee Dums, qui mêlait des influences blues, jazz et rock psychédélique. Ce groupe était formé de Parker à la guitare et de Luke Epstein à la batterie. Ils remportent la deuxième place au AmpFest de 20051, et terminent troisième la même année au cours de la finale nationale de The Next Big Thing2. En octobre 2006, les Dee Dee Dums remportent la finale nationale de la National Campus Band Competition3.")
    const[lienReseaux, setLienReseaux] = useState<Reseaux>();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const[membresGroupe, setMembresGroupe] = useState<string[]>([])
    const[styles, setStyles] = useState<string[]>([])
    const[evenements, setEvenements] = useState<Evenement[]>([])
    const[nomScene, setNomScene] = useState<string>("")

    const params = new URLSearchParams(window.location.search)
    const idArtiste = params.get('id')

    const[windowWidth, setWindowWidth] = useState(window.innerWidth)
    const[infosGridPosition, setInfosGridPosition] = useState<"top" | "bottom">("top")

    useEffect(() => {
      console.log(location.state)
      if (location.state && location != null){
        axios.get('http://51.178.46.205:8080/getInfosSupplementairesArtiste?idGroupe='+idArtiste).then((res) => {
          const data = res.data as Groupe;
          if (res.status === 200){
            setDescription(data.descriptionG)
            setLienReseaux(data.reseaux)
            setStyles(data.genresMusicaux)
            setMembresGroupe(data.membresGroupe)
            setEvenements(data.evenementsAnnexes)
            setNomScene(data.scene)
          }
          else{
            alert("erreur lors de la récupération des infos supplémentaires de l'artiste")
          }
        }).catch((_) => {
          alert("erreur lors de la récupération des infos supplémentaires de l'artiste")
        })
      }
      else{
        axios.get("http://51.178.46.205:8080/getInfosArtiste?idGroupe="+idArtiste).then((res) => {
          console.log(res.data)
          if (res.status === 200){
            const data = res.data as Groupe;
            setNomArtiste(data.nomG)
            setDate(Groupe.getJourPassage(data.datePassage))
            setHeure(Groupe.getHeurePassage(data.heurePassage))
            setDescription(data.descriptionG)
            setLienReseaux(data.reseaux)
            setStyles(data.genresMusicaux)
            setMembresGroupe(data.membresGroupe)
            setEvenements(data.evenementsAnnexes)
            setNomScene(data.scene)
          }
          else
          {
            console.log("erreur lors de la récupération des infos de l'artiste")
          }
        })
        .catch((_) => {
          console.log("erreur lors de la récupération des infos de l'artiste")
        })
      }
    }, [])

    useEffect(() => {
      
      const handleResize = () => {
        setWindowWidth(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)
    
      return () => {    
        window.removeEventListener('resize', handleResize)
      }
    }, [])
    
    useEffect(() => {
      if(titleRef.current){
        // regarde si la width du titre est plus grande que 25% de la width de la fenetre - 2*3rem
        if(titleRef.current.offsetWidth > windowWidth/4 - 2*3*16){
          setInfosGridPosition("top")
        }
        else{
            setInfosGridPosition("bottom")
        }
      }
    }, [titleRef, windowWidth])
    

    const infosVariants = {
        initial:{
            opacity:0,
            transition:{
                duration:0.1,
                ease: "easeInOut"
            }
        },
        visible:{
            opacity:1,
            transition:{
                delay: 0.8,
                duration:0.6,
                ease: "easeInOut"
            }
        }
    }
  
    const overlayVariants = {
        initial:{
            background:"linear-gradient(to top, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0) 60%)",
            transition:{
                duration:0.1,
                ease: "easeInOut"
            }
        },
        extended:{
            background:"linear-gradient(to top, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0) 100%)",
            transition:{
                delay: 0.6,
                duration:0.6,
                ease: "easeInOut"
            }
        }
    }

    return (
    <div id='PageArtiste'>
      <motion.div className="overlay"
      variants={overlayVariants}
    initial="initial"
    animate={infosGridPosition === "top" ? "extended" : "initial"}
      />

        <Link to="/programmation"
            state={{
                comesFromPageArtist:idArtiste,
                oldX: oldX,
                oldY: oldY,
                oldGroupes: oldGroupes
            }}
            className='btn-retour'>
                <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="20.1737" y1="1.73036" x2="4.73082" y2="17.1733" stroke="currentColor" stroke-width="4.89419"/>
                  <line x1="20.1251" y1="34.7304" x2="1.92662" y2="16.5319" stroke="currentColor" stroke-width="4.89419"/>
                  <line x1="40.0459" y1="17.4837" x2="3.64892" y2="17.4837" stroke="currentColor" stroke-width="4.89419"/>
                </svg>

                RETOUR
        </Link>

      <img src={"http://51.178.46.205:8080/getImageArtiste/"+idArtiste} alt="image de fond" />
      <div className="content"
      style={{
        columnGap: infosGridPosition === "top" ? "0" : "5rem",
        rowGap: windowWidth > 991 ? "0" : "5rem",
    }}
      >
        <h3 ref={titleRef}>
        {
        nomArtiste && nomArtiste.toUpperCase().split(" ").map((mot : string, index:number) => {
            return(
                <span key={index}>{mot}<br/></span>
            )
        })
    }
        </h3>
        <motion.div className="infos"
        variants={infosVariants}
        initial="initial"
        animate="visible"
        exit="initial"
        style={{gridArea : infosGridPosition}}
        >
            <section className="paragraphes">
              <p className='description'>{description}</p>
              <section className='infos-sup'>
                {
                  evenements && evenements.length > 0 &&(
                  <div className="container-info act-annexe">
                    <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.3779 5.09619H5.19043C3.76657 5.09619 2.6123 6.25046 2.6123 7.67432V23.1431C2.6123 24.567 3.76657 25.7212 5.19043 25.7212H22.3779C23.8018 25.7212 24.956 24.567 24.956 23.1431V7.67432C24.956 6.25046 23.8018 5.09619 22.3779 5.09619Z" stroke="#FFD600" stroke-width="1.71875" stroke-linejoin="round"/>
                      <path d="M15.9326 14.5493C16.6445 14.5493 17.2217 13.9722 17.2217 13.2603C17.2217 12.5483 16.6445 11.9712 15.9326 11.9712C15.2207 11.9712 14.6436 12.5483 14.6436 13.2603C14.6436 13.9722 15.2207 14.5493 15.9326 14.5493Z" fill="#FFD600"/>
                      <path d="M20.2305 14.5491C20.9424 14.5491 21.5195 13.9719 21.5195 13.26C21.5195 12.5481 20.9424 11.9709 20.2305 11.9709C19.5185 11.9709 18.9414 12.5481 18.9414 13.26C18.9414 13.9719 19.5185 14.5491 20.2305 14.5491Z" fill="#FFD600"/>
                      <path d="M15.9326 18.8462C16.6445 18.8462 17.2217 18.2691 17.2217 17.5571C17.2217 16.8452 16.6445 16.2681 15.9326 16.2681C15.2207 16.2681 14.6436 16.8452 14.6436 17.5571C14.6436 18.2691 15.2207 18.8462 15.9326 18.8462Z" fill="#FFD600"/>
                      <path d="M20.2305 18.846C20.9424 18.846 21.5195 18.2688 21.5195 17.5569C21.5195 16.845 20.9424 16.2678 20.2305 16.2678C19.5185 16.2678 18.9414 16.845 18.9414 17.5569C18.9414 18.2688 19.5185 18.846 20.2305 18.846Z" fill="#FFD600"/>
                      <path d="M7.33887 18.8462C8.0508 18.8462 8.62793 18.2691 8.62793 17.5571C8.62793 16.8452 8.0508 16.2681 7.33887 16.2681C6.62694 16.2681 6.0498 16.8452 6.0498 17.5571C6.0498 18.2691 6.62694 18.8462 7.33887 18.8462Z" fill="#FFD600"/>
                      <path d="M11.6357 18.8462C12.3477 18.8462 12.9248 18.2691 12.9248 17.5571C12.9248 16.8452 12.3477 16.2681 11.6357 16.2681C10.9238 16.2681 10.3467 16.8452 10.3467 17.5571C10.3467 18.2691 10.9238 18.8462 11.6357 18.8462Z" fill="#FFD600"/>
                      <path d="M7.33887 23.1431C8.0508 23.1431 8.62793 22.5659 8.62793 21.854C8.62793 21.1421 8.0508 20.5649 7.33887 20.5649C6.62694 20.5649 6.0498 21.1421 6.0498 21.854C6.0498 22.5659 6.62694 23.1431 7.33887 23.1431Z" fill="#FFD600"/>
                      <path d="M11.6357 23.1431C12.3477 23.1431 12.9248 22.5659 12.9248 21.854C12.9248 21.1421 12.3477 20.5649 11.6357 20.5649C10.9238 20.5649 10.3467 21.1421 10.3467 21.854C10.3467 22.5659 10.9238 23.1431 11.6357 23.1431Z" fill="#FFD600"/>
                      <path d="M15.9326 23.1431C16.6445 23.1431 17.2217 22.5659 17.2217 21.854C17.2217 21.1421 16.6445 20.5649 15.9326 20.5649C15.2207 20.5649 14.6436 21.1421 14.6436 21.854C14.6436 22.5659 15.2207 23.1431 15.9326 23.1431Z" fill="#FFD600"/>
                      <path d="M6.90918 3.37744V5.09619M20.6592 3.37744V5.09619" stroke="#FFD600" stroke-width="1.71875" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M24.956 9.39307H2.6123" stroke="#FFD600" stroke-width="1.71875" stroke-linejoin="round"/>
                    </svg>
                    <p>Evenements annexe: {
                        evenements.map((evenement, index) => {
                          return evenement.nomE + " - " + Groupe.getJourPassage(evenement.dateDebutE) + " - " + Groupe.getHeurePassage(evenement.heureDebutE) + (index < evenements.length - 1 ? ", " : "")
                        })
                      }</p>
                  </div>
                  )
                }
                {
                  membresGroupe && membresGroupe.length > 1 && (
                  <div className="container-info">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.8785 8.50244C19.7354 10.4883 18.2622 12.0181 16.6558 12.0181C15.0494 12.0181 13.5738 10.4888 13.4331 8.50244C13.2867 6.43652 14.7207 4.98682 16.6558 4.98682C18.5909 4.98682 20.0249 6.47412 19.8785 8.50244Z" stroke="#ED785B" stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16.6561 15.1431C13.4739 15.1431 10.4139 16.7236 9.64727 19.8018C9.5457 20.209 9.80108 20.6118 10.2195 20.6118H23.0931C23.5115 20.6118 23.7654 20.209 23.6653 19.8018C22.8987 16.6743 19.8387 15.1431 16.6561 15.1431Z" stroke="#ED785B" stroke-width="1.5625" stroke-miterlimit="10"/>
                      <path d="M10.0159 9.37842C9.90165 10.9644 8.71122 12.2134 7.42802 12.2134C6.14481 12.2134 4.95243 10.9648 4.84013 9.37842C4.72343 7.72852 5.88212 6.54932 7.42802 6.54932C8.97392 6.54932 10.1326 7.75879 10.0159 9.37842Z" stroke="#ED785B" stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10.3091 15.2407C9.42772 14.8369 8.45702 14.6816 7.42821 14.6816C4.88915 14.6816 2.44286 15.9438 1.83007 18.4023C1.7495 18.7275 1.9536 19.0493 2.28759 19.0493H7.77001" stroke="#ED785B" stroke-width="1.5625" stroke-miterlimit="10" stroke-linecap="round"/>
                    </svg>
                    <p>Membres du groupe : {membresGroupe.map((nomMembre, index) => nomMembre + (index < membresGroupe.length -1 ? ", " : ""))}</p>
                  </div>
                  )
                }
                {
                  styles && styles.length > 0 && (
                  <div className="container-info">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.6279 12.0083V11.686C10.6279 10.889 11.165 10.2358 11.9299 10.043L21.3073 7.53578C21.4662 7.49325 21.6328 7.48779 21.7941 7.51983C21.9555 7.55186 22.1073 7.62053 22.238 7.72054C22.3686 7.82055 22.4745 7.94922 22.5475 8.09664C22.6206 8.24406 22.6588 8.40628 22.6592 8.57079V9.75243" stroke="#ED785B" stroke-width="1.71875" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M22.6582 16.1948V20.4917C22.6582 21.2388 22.1786 21.8661 21.4766 22.103L20.2949 22.5327C18.9038 23.001 17.5019 21.973 17.5019 20.4917C17.4987 20.1111 17.6167 19.7394 17.8388 19.4304C18.0609 19.1214 18.3756 18.8911 18.7373 18.7729L21.4766 17.798C22.1786 17.5617 22.6582 16.9419 22.6582 16.1948ZM22.6582 16.1948V3.41476C22.6578 3.33253 22.6386 3.25148 22.6019 3.17787C22.5653 3.10425 22.5122 3.04004 22.4468 2.99017C22.3814 2.9403 22.3055 2.90611 22.2248 2.89023C22.1441 2.87436 22.0608 2.87722 21.9814 2.8986L11.2715 5.77805C11.0847 5.83081 10.9204 5.9435 10.8039 6.09879C10.6875 6.25407 10.6253 6.44333 10.6269 6.63743V18.7761M10.6269 18.7761C10.6269 19.5232 10.1473 20.1511 9.44531 20.3875L6.65234 21.3543C5.90684 21.6056 5.4707 22.2792 5.4707 23.073C5.4707 24.5544 6.89512 25.5733 8.26367 25.114L9.44531 24.6843C10.1473 24.448 10.6269 23.8207 10.6269 23.073V18.7761Z" stroke="#ED785B" stroke-width="1.71875" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>Style: {styles.map((style, index) => style + (index < styles.length -1 ? " - " : ""))}</p>
                  </div>
                  )
                }
                {
                  nomScene && (
                    <div className="container-info">
                      <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1289 9.04932C16.0619 9.04932 17.6289 7.48231 17.6289 5.54932C17.6289 3.61632 16.0619 2.04932 14.1289 2.04932C12.1959 2.04932 10.6289 3.61632 10.6289 5.54932C10.6289 7.48231 12.1959 9.04932 14.1289 9.04932Z" stroke="#E45A3B" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.0039 9.26807C15.0039 9.13753 14.9521 9.01234 14.8597 8.92004C14.7674 8.82773 14.6423 8.77588 14.5117 8.77588H13.7461C13.6156 8.77588 13.4904 8.82773 13.3981 8.92004C13.3058 9.01234 13.2539 9.13753 13.2539 9.26807V25.3221C13.254 25.5546 13.3003 25.7847 13.3901 25.9992L13.9408 27.3117C13.9592 27.3454 13.9864 27.3736 14.0195 27.3933C14.0526 27.4129 14.0904 27.4232 14.1289 27.4232C14.1674 27.4232 14.2052 27.4129 14.2383 27.3933C14.2714 27.3736 14.2986 27.3454 14.317 27.3117L14.8677 25.9992C14.9575 25.7847 15.0038 25.5546 15.0039 25.3221V9.26807Z" fill="#E45A3B"/>
                        <path d="M15.4414 5.54932C16.1663 5.54932 16.7539 4.96169 16.7539 4.23682C16.7539 3.51194 16.1663 2.92432 15.4414 2.92432C14.7165 2.92432 14.1289 3.51194 14.1289 4.23682C14.1289 4.96169 14.7165 5.54932 15.4414 5.54932Z" fill="#E45A3B"/>
                      </svg>
                      <p>{nomScene}</p>
                    </div>
                  )
                }
              </section>
            </section>
            <div className="les-reseaux">
                {lienReseaux?.soundcloud && <BoutonReseau href={lienReseaux.soundcloud} type='soundcloud' />}
                {lienReseaux?.spotify && <BoutonReseau href={lienReseaux.spotify} type='spotify' />}
                {lienReseaux?.instagram && <BoutonReseau href={lienReseaux.instagram} type='instagram' />}
                {lienReseaux?.twitter && <BoutonReseau href={lienReseaux.twitter} type='twitter' />}
                {lienReseaux?.youtube && <BoutonReseau href={lienReseaux.youtube} type='youtube' />}
            </div>

        </motion.div>
        <div className="date-heure">
            <h4>{date}</h4>
            <h4>{heure}</h4>
        </div>
      </div>
    </div>
  )
}