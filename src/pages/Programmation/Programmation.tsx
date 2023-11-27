import {useEffect, useState, useRef, useLayoutEffect} from 'react'
import SearchBar from '../../components/form/SearchBar';
import Combo from '../../components/form/Combo';
import CarteArtiste from '../../components/Artiste/CarteArtiste';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

type Props = {
    isNavInFocus: boolean;
    setIsNavTransparent: (isNavTransparent : boolean) => void;
}

type Groupe = {
  idG: number;
  nomG: string;
  descriptionG: string;
  datePassage: string;
  heurePassage: string;
}

export default function Programmation(props : Props) {
  const location = useLocation();
  const idArtistComingFrom = location.state?.comesFromPageArtist;
  const oldX = location.state?.oldX;
  const oldY = location.state?.oldY;

  const[lesGroupes, setLesGroupes] = useState<Groupe[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/getArtistes').then((res) => {
      const data = res.data;
      const listeGroupes : Groupe[] = [];
      console.log(data)
      data.forEach((groupe: Groupe) => {
        // la datepassage est sous forme 2021-05-20 pour 20 mai 2021
        // je veux la transformer en 20 mai (pas besoin de l'année)
        const lesMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet","Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        const date = groupe.datePassage.split("-");
        const datePassage = date[2] + " " + lesMois[parseInt(date[1])-1];
        groupe.datePassage = datePassage; 
        // l'heure est sous forme 20:00:00 pour 20h00 j'ai envie de la transformer en 20H00
        const heure = groupe.heurePassage.split(":");
        const heurePassage = heure[0] + "H" + heure[1];
        groupe.heurePassage = heurePassage;
        listeGroupes.push(groupe);
      });
      setLesGroupes(listeGroupes);
    })
  }, [])
  


  const[filtreDate, setFiltreDate] = useState("Tout");
  const[filtreAffichage, setFiltreAffichage] = useState("Grille");
  const[filtreGenre, setFiltreGenre] = useState("Tout");

  const pageRef = useRef<HTMLDivElement>(null);
  
  
  const contentVariants = {
    visible:{
      filter: "blur(0px)",
      scale:1,
      zIndex:1,
      transition:{
        duration:0.5,
        ease: [1, 0, 0,1]
      }
    },
    hidden:{
      filter:"blur(10px)",
      scale:0.8,
      zIndex:-1,
      transition:{
        duration:0.5,
        ease: [1, 0, 0,1]
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    props.setIsNavTransparent(false)
  }, [])

  return (
    <motion.div id="Programmation"
    variants={contentVariants}
    animate={props.isNavInFocus ? "hidden" : "visible"}
    ref={pageRef}
    >
        <header>
            <div className="title">
                <h2>PROGRAMMATION</h2>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M62.9991 27.739L42.1815 27.7675L56.8787 13.0286L50.7001 6.86056L36.0029 21.5994L35.9744 0.785744L27.2406 0.797718L27.2692 21.6114L12.5316 6.91288L6.36413 13.0979L21.1017 27.7964L0.289932 27.825L0.301899 36.5537L21.1137 36.5251L6.41646 51.2641L12.6009 57.4321L27.2981 42.6932L27.3266 63.5069L36.0603 63.4949L36.0318 42.6812L50.7694 57.3798L56.931 51.1948L42.1934 36.4962L63.011 36.4677L62.9991 27.739Z" fill="#FFD600"/>
                </svg>
            </div>
            <div className="filters-container">
                <div className="filters">
                    <Combo title="DATE" choices={["Tout", "21 Juillet", "22 Juillet", "23 Juillet"]} currentChoice={filtreDate} setCurrentChoice={setFiltreDate} />
                    <Combo title="AFFICHAGE" choices={["Grille", "Horaires"]} currentChoice={filtreAffichage} setCurrentChoice={setFiltreAffichage} />
                    <Combo title="GENRE" choices={["Tout", "Rap", "Rock", "Pop"]} currentChoice={filtreGenre} setCurrentChoice={setFiltreGenre} />
                </div>
                <SearchBar text="Rechercher un artiste"/>
            </div>
        </header>
        <main className='liste-artistes'>
            {
              lesGroupes.map((groupe, index) => {
                return(
                  <CarteArtiste key={groupe.idG} id={groupe.idG} oldX={idArtistComingFrom == groupe.idG ? oldX : null} oldY={idArtistComingFrom == groupe.idG ? oldY : null} comesFromPageArtist={idArtistComingFrom == groupe.idG} nomArtiste={groupe.nomG} date={groupe.datePassage} heure={groupe.heurePassage} setIsNavTransparent={props.setIsNavTransparent} />
                )
              })
            }
        </main>
    </motion.div>
  )
}
