import {useEffect, useState, useRef, useLayoutEffect} from 'react'
import SearchBar from '../../components/form/SearchBar';
import Combo from '../../components/form/Combo';
import CarteArtiste from '../../components/Artiste/CarteProgrammation';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/footer';

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

type Artiste = {
  descriptionA?: string;
  idMG?: number;
  idG: number;
  nomDeSceneMG: string;
  nomMG: string;
  prenomMG?: string;
  datePassage?: string;
  heurePassage?: string;
};

type Evenement = {
  dateDebutE: string;
  dateFinE: string;
  heureDebutE: string,
  heureFinE: string,
  idE: number;
  idG: number;
  idL: number | null;
  nomE: string;
};


type Programme = Groupe | Evenement | Artiste;

export default function Programmation(props : Props) {
  const location = useLocation();
  const idArtistComingFrom = location.state?.comesFromPageArtist;
  const oldX = location.state?.oldX;
  const oldY = location.state?.oldY;
  const oldGroupes = location.state?.oldGroupes;


  window.history.replaceState({}, document.title)
  const[lesGroupes, setLesGroupes] = useState<Groupe[]>(location.state? oldGroupes : []);
  const [lesArtistes, setLesArtistes] = useState<Artiste[]>([]);
  

  useEffect(() => {
    axios.get('http://localhost:8080/getGroupesWithEvenements').then((res) => {
      const groupedData = res.data as Programme[][];

      const listeGroupes: Groupe[] = [];
      const listeArtistes: Artiste[] = [];
      console.log(groupedData);
  
      groupedData.forEach((groupArray) => {
        let groupeObj: Partial<Groupe> = {};
        let artisteObj: Partial<Artiste> = {};
  
        groupArray.forEach((item) => {
          if ('nomG' in item) {
            groupeObj = { ...groupeObj, ...item }; // Copier les infos du groupe
          } else if ('nomDeSceneMG' in item) {
            artisteObj = { ...artisteObj, ...item }; // Copier les infos de l'artiste
          } else if ('dateDebutE' in item) {
            // S'assurer que l'évènement correspond au groupe ou à l'artiste actuellement traité
            const datePassage = item.dateDebutE; 
            const heurePassage = item.heureDebutE;
            if (groupeObj.idG === item.idG) {
              groupeObj.datePassage = datePassage;
              groupeObj.heurePassage = heurePassage;
            }
            if (artisteObj.idG === item.idG) {
              artisteObj.datePassage = datePassage;
              artisteObj.heurePassage = heurePassage;
            }
          }
        });
          if (groupeObj.idG != null) {
          listeGroupes.push(groupeObj as Groupe); 
        }
        if (artisteObj.nomDeSceneMG != null) {
          listeArtistes.push(artisteObj as Artiste); 
        }
      });
  
      setLesGroupes(listeGroupes);
      setLesArtistes(listeArtistes);
      console.log("listeArtistes : ")
      console.log(listeArtistes)
      console.log("listeGroupes : ")
      console.log(listeGroupes)

    });
  }, []);

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
    <>
    <motion.div id="Programmation"
    className='page-defaut'
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
                  <CarteArtiste oldGroupes={lesGroupes} key={groupe.idG} id={groupe.idG} oldX={idArtistComingFrom == groupe.idG ? oldX : null} oldY={idArtistComingFrom == groupe.idG ? oldY : null} comesFromPageArtist={idArtistComingFrom == groupe.idG} nomArtiste={groupe.nomG} date={groupe.datePassage} heure={groupe.heurePassage} setIsNavTransparent={props.setIsNavTransparent} />
                )
              })
            }
        </main>
    </motion.div>
    <Footer/>
    </>
  )
}


[
  [
    {
      "descriptionG": "Desc",
      "idG": 1,
      "idH": null,
      "nomG": "Vladimir Cauchemar"
    },
    {
      "dateDebutE": "2023-07-21",
      "dateFinE": "2023-07-21",
      "heureDebutE": "09:00:00",
      "heureFinE": "10:00:00",
      "idE": 1,
      "idG": 1,
      "idL": null,
      "nomE": "Concert Groupe 1"
    },
    {
      "descriptionA": "Description pour Vladimir Cauchemar",
      "idG": 1,
      "idMG": null,
      "nomDeSceneMG": "Vladimir Cauchemar",
      "nomMG": "Vlad",
      "prenomMG": "Cauchemar"
    }
  ],
  [
    {
      "descriptionG": "Desc",
      "idG": 2,
      "idH": null,
      "nomG": "Booba"
    },
    {
      "dateDebutE": "2023-07-21",
      "dateFinE": "2023-07-21",
      "heureDebutE": "13:00:00",
      "heureFinE": "14:00:00",
      "idE": 2,
      "idG": 2,
      "idL": null,
      "nomE": "Concert Groupe 2"
    },
    {
      "descriptionA": "Description pour Booba",
      "idG": 2,
      "idMG": null,
      "nomDeSceneMG": "Booba",
      "nomMG": "Booba",
      "prenomMG": "Elie"
    }
  ],
  [
    {
      "descriptionG": "Desc",
      "idG": 3,
      "idH": null,
      "nomG": "Freeze Corleone"
    },
    {
      "dateDebutE": "2023-07-21",
      "dateFinE": "2023-07-21",
      "heureDebutE": "17:00:00",
      "heureFinE": "18:00:00",
      "idE": 3,
      "idG": 3,
      "idL": null,
      "nomE": "Concert Groupe 3"
    },
    {
      "descriptionA": "Description pour Freeze Corleone",
      "idG": 3,
      "idMG": null,
      "nomDeSceneMG": "Freeze Corleone",
      "nomMG": "Freeze",
      "prenomMG": "Hugo"
    }
  ],
  [
    {
      "descriptionG": "Desc",
      "idG": 4,
      "idH": null,
      "nomG": "Damso"
    },
    {
      "dateDebutE": "2023-07-22",
      "dateFinE": "2023-07-22",
      "heureDebutE": "09:00:00",
      "heureFinE": "10:00:00",
      "idE": 4,
      "idG": 4,
      "idL": null,
      "nomE": "Concert Groupe 4"
    },
    {
      "descriptionA": "Description pour Damso",
      "idG": 4,
      "idMG": null,
      "nomDeSceneMG": "Damso",
      "nomMG": "Damso",
      "prenomMG": "William"
    }
  ],
  [
    {
      "descriptionG": "Desc",
      "idG": 5,
      "idH": null,
      "nomG": "Ashe 22"
    },
    {
      "dateDebutE": "2023-07-22",
      "dateFinE": "2023-07-22",
      "heureDebutE": "13:00:00",
      "heureFinE": "14:00:00",
      "idE": 5,
      "idG": 5,
      "idL": null,
      "nomE": "Concert Groupe 5"
    },
    {
      "descriptionA": "Description pour Ashe 22",
      "idG": 5,
      "idMG": null,
      "nomDeSceneMG": "Ashe 22",
      "nomMG": "Ashe",
      "prenomMG": "Achille"
    }
  ],
  [
    {
      "descriptionG": "Desc",
      "idG": 6,
      "idH": null,
      "nomG": "Heuss l'Enfoiré"
    },
    {
      "dateDebutE": "2023-07-22",
      "dateFinE": "2023-07-22",
      "heureDebutE": "17:00:00",
      "heureFinE": "18:00:00",
      "idE": 6,
      "idG": 6,
      "idL": null,
      "nomE": "Concert Groupe 6"
    },
    {
      "descriptionA": "Description pour Heuss lEnfoiré",
      "idG": 6,
      "idMG": null,
      "nomDeSceneMG": "Heuss l'Enfoiré",
      "nomMG": "Heuss",
      "prenomMG": "Karim"
    }
  ],
  [
    {
      "descriptionG": "Desc",
      "idG": 7,
      "idH": null,
      "nomG": "Zola"
    },
    {
      "dateDebutE": "2023-07-23",
      "dateFinE": "2023-07-23",
      "heureDebutE": "08:00:00",
      "heureFinE": "09:00:00",
      "idE": 7,
      "idG": 7,
      "idL": null,
      "nomE": "Concert Groupe 7"
    },
    {
      "descriptionA": "Description pour Zola",
      "idG": 7,
      "idMG": null,
      "nomDeSceneMG": "Zola",
      "nomMG": "Zola",
      "prenomMG": "Evans"
    }
  ],
  [
    {
      "descriptionG": "Desc",
      "idG": 8,
      "idH": null,
      "nomG": "Sch"
    },
    {
      "dateDebutE": "2023-07-23",
      "dateFinE": "2023-07-23",
      "heureDebutE": "11:00:00",
      "heureFinE": "12:00:00",
      "idE": 8,
      "idG": 8,
      "idL": null,
      "nomE": "Concert Groupe 8"
    },
    {
      "descriptionA": "Description pour Sch",
      "idG": 8,
      "idMG": null,
      "nomDeSceneMG": "Sch",
      "nomMG": "Sch",
      "prenomMG": "Julien"
    }
  ],
  [
    {
      "descriptionG": "Desc",
      "idG": 9,
      "idH": null,
      "nomG": "H Jeunecrack"
    },
    {
      "dateDebutE": "2023-07-23",
      "dateFinE": "2023-07-23",
      "heureDebutE": "14:00:00",
      "heureFinE": "15:00:00",
      "idE": 9,
      "idG": 9,
      "idL": null,
      "nomE": "Concert Groupe 9"
    },
    {
      "descriptionA": "Description pour H Jeunecrack",
      "idG": 9,
      "idMG": null,
      "nomDeSceneMG": "H Jeunecrack",
      "nomMG": "H",
      "prenomMG": "Hugo"
    }
  ],
  [
    {
      "descriptionG": "Desc",
      "idG": 10,
      "idH": null,
      "nomG": "Luther"
    },
    {
      "dateDebutE": "2023-07-23",
      "dateFinE": "2023-07-23",
      "heureDebutE": "17:00:00",
      "heureFinE": "18:00:00",
      "idE": 10,
      "idG": 10,
      "idL": null,
      "nomE": "Concert Groupe 10"
    },
    {
      "descriptionA": "Description pour Luther",
      "idG": 10,
      "idMG": null,
      "nomDeSceneMG": "Luther",
      "nomMG": "Luther",
      "prenomMG": "Luther"
    }
  ]
]