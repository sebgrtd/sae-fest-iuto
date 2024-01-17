import {useEffect, useState, useRef, useLayoutEffect} from 'react'
import SearchBar from '../../components/form/SearchBar';
import Combo from '../../components/form/Combo';
import CarteArtiste from '../../components/Artiste/CarteArtiste';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer';
import CarteProgrammation from '../../components/Artiste/CarteArtiste';

type Props = {
  isNavInFocus: boolean;
  setIsNavTransparent: (isNavTransparent: boolean) => void;
};

type Groupe = {
  idG: number;
  nomG: string;
  descriptionG: string;
  datePassage: string;
  heurePassage: string;
};

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
  heureDebutE: string;
  heureFinE: string;
  idE: number;
  idG: number;
  idL: number | null;
  nomE: string;
};

type Programme = Groupe | Evenement | Artiste;

export default function Programmation(props: Props) {
  const location = useLocation();
  const idArtistComingFrom = location.state?.comesFromPageArtist;
  const oldX = location.state?.oldX;
  const oldY = location.state?.oldY;
  const oldGroupes = location.state?.oldGroupes;
  const [searchTerm, setSearchTerm] = useState("");
  const pageRef = useRef<HTMLDivElement>(null);
  

  window.history.replaceState({}, document.title);
  const [lesGroupes, setLesGroupes] = useState<Groupe[]>(location.state ? oldGroupes : []);
  const [lesArtistes, setLesArtistes] = useState<Artiste[]>([]);
  const groupePassageMap = useRef<
    Map<number, { datePassage: string; heurePassage: string }>
  >(new Map());


useEffect(() => {
    axios.get('http://localhost:8080/getGroupesWithEvenements').then((res) => {

      const groupedData = res.data as Programme[][];
      // console.log("groupedData")
      // console.log(groupedData);

      const listeGroupes: Groupe[] = [];
      const groupSet = new Set<number>();
      const listeArtistes: Artiste[] = [];

      groupedData.forEach((groupArray) => {
        let groupeObj: Partial<Groupe> = {};
        let artisteObj: Partial<Artiste> = {};

        groupArray.forEach((item) => {
          if ("nomG" in item) {
            groupeObj = { ...groupeObj, ...item };
          } else if ("nomDeSceneMG" in item) {
            artisteObj = { ...artisteObj, ...item };
          } else if ("dateDebutE" in item) {
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

        // si l'id n'a pas encore était ajoutée à la liste on ajoute le groupe
        if (groupeObj.idG !== undefined && !groupSet.has(groupeObj.idG)) {
          listeGroupes.push(groupeObj as Groupe);
          groupSet.add(groupeObj.idG);
        }
        if (artisteObj.nomDeSceneMG !== undefined) {
          listeArtistes.push(artisteObj as Artiste);
        }
      });

      setLesGroupes(listeGroupes);
      // console.log(listeGroupes);
      groupePassageMap.current.clear();
      listeGroupes.forEach((groupe) => {
        groupePassageMap.current.set(groupe.idG, {
          datePassage: groupe.datePassage,
          heurePassage: groupe.heurePassage,
        });
      });

      setLesArtistes(listeArtistes);
    });
  }, []);


  const [filtreDate, setFiltreDate] = useState("Tout");
  console.log(filtreDate)
  let termeRechercher = 'Tout';
  
  if (filtreDate === '21 Juillet') {
    termeRechercher = '07-21';
  }
  else if (filtreDate === '22 Juillet') {
    termeRechercher = '07-22';
  }
  else if (filtreDate === '23 Juillet') {
    termeRechercher = '07-23';
  }
  

  let filteredGroupes = lesGroupes;
if (searchTerm) {
  filteredGroupes = filteredGroupes.filter((groupe) => {
    console.log(groupe.nomG);
    if (searchTerm.length > 5) {
      return groupe.nomG.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return groupe.nomG.toLowerCase().startsWith(searchTerm.toLowerCase());
    }
  });
}

if (filtreDate !== 'Tout') {
  console.log(termeRechercher)
  filteredGroupes = filteredGroupes.filter((groupe) => {
    return groupe.datePassage.includes(termeRechercher);
  });
}

let filteredArtistes = lesArtistes;
console.log("Les Artistes avant filtre:", lesArtistes);
if (searchTerm) {
  console.log("Filtered Artistes après searchTerm:", filteredArtistes);
  filteredArtistes = filteredArtistes.filter((artiste) => {
    if (searchTerm.length > 5) {
      return artiste.nomDeSceneMG.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return artiste.nomDeSceneMG.toLowerCase().startsWith(searchTerm.toLowerCase());
    }
  });
}
if (filtreDate !== 'Tout') {
  filteredArtistes = filteredArtistes.filter((artiste) => {
    console.log("Filtered Artistes après searchTerm:", filteredArtistes);
    const groupeInfo = groupePassageMap.current.get(artiste.idG);
    return groupeInfo?.datePassage.includes(termeRechercher);
  });
}
  console.log(filteredGroupes);
  console.log(filteredArtistes);
  const [filtreAffichage, setFiltreAffichage] = useState("Grille");
  const [filtreGenre, setFiltreGenre] = useState("Tout");


  const contentVariants = {
    visible: {
      filter: "blur(0px)",
      scale: 1,
      zIndex: 1,
      transition: {
        duration: 0.5,
        ease: [1, 0, 0, 1],
      },
    },
    hidden: {
      filter: "blur(10px)",
      scale: 0.8,
      zIndex: -1,
      transition: {
        duration: 0.5,
        ease: [1, 0, 0, 1],
      },
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    props.setIsNavTransparent(false);
  }, []);

  return (
    <>
      <motion.div
        id="Programmation"
        className="page-defaut"
        variants={contentVariants}
        animate={props.isNavInFocus ? "hidden" : "visible"}
        ref={pageRef}
      >
        <header>
          <div className="title">
            <h2>PROGRAMMATION</h2>
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M62.9991 27.739L42.1815 27.7675L56.8787 13.0286L50.7001 6.86056L36.0029 21.5994L35.9744 0.785744L27.2406 0.797718L27.2692 21.6114L12.5316 6.91288L6.36413 13.0979L21.1017 27.7964L0.289932 27.825L0.301899 36.5537L21.1137 36.5251L6.41646 51.2641L12.6009 57.4321L27.2981 42.6932L27.3266 63.5069L36.0603 63.4949L36.0318 42.6812L50.7694 57.3798L56.931 51.1948L42.1934 36.4962L63.011 36.4677L62.9991 27.739Z"
                fill="#FFD600"
              />
            </svg>
          </div>
          <div className="filters-container">
            <div className="filters">
              <Combo
                title="DATE"
                choices={["Tout", "21 Juillet", "22 Juillet", "23 Juillet"]}
                currentChoice={filtreDate}
                setCurrentChoice={setFiltreDate}
              />
              <Combo
                title="AFFICHAGE"
                choices={["Grille", "Horaires"]}
                currentChoice={filtreAffichage}
                setCurrentChoice={setFiltreAffichage}
              />
              <Combo
                title="GENRE"
                choices={["Tout", "Rap", "Rock", "Pop"]}
                currentChoice={filtreGenre}
                setCurrentChoice={setFiltreGenre}
              />
            </div>
            <SearchBar text="Rechercher un artiste" onSearch={setSearchTerm} />
          </div>
        </header>
        <main className="liste-artistes">
        <AnimatePresence>
  {filteredGroupes.map((groupe) => {
    console.log('idArtistComingFrom for groupe:', idArtistComingFrom);
    console.log("groupe.idG : ");
    console.log(groupe.idG);
    return (
      <CarteProgrammation
        key={groupe.idG}
        id={groupe.idG}
        nomArtiste={groupe.nomG}
        description={groupe.descriptionG}
        date={groupe.datePassage}
        heure={groupe.heurePassage}
        setIsNavTransparent={props.setIsNavTransparent}
        oldGroupes={lesGroupes}
        estArtiste={false}
        oldX={idArtistComingFrom == groupe.idG ? oldX : null} oldY={idArtistComingFrom == groupe.idG ? oldY : null} comesFromPageArtist={idArtistComingFrom == groupe.idG}
      />
    );
  })}
  
  {filteredArtistes.map((artiste) => {
    console.log('idArtistComingFrom for artiste:', idArtistComingFrom);
    const groupeInfo = groupePassageMap.current.get(artiste.idG);
    console.log("artiste.idMG : ");
    console.log(artiste.idMG);
    return (
      <CarteProgrammation
      
        key={artiste.idMG}
        id={artiste.idMG}
        nomArtiste={artiste.nomDeSceneMG}
        description={artiste.descriptionA}
        date={groupeInfo?.datePassage ?? "Date inconnue"}
        heure={groupeInfo?.heurePassage ?? "Heure inconnue"}
        setIsNavTransparent={props.setIsNavTransparent}
        
        oldGroupes={lesGroupes}
        estArtiste={true}
        oldX={idArtistComingFrom == artiste.idMG ? oldX : null} oldY={idArtistComingFrom == artiste.idMG ? oldY : null} comesFromPageArtist={idArtistComingFrom == artiste.idMG}

      />
    );
  })}
          </AnimatePresence>
        </main>
      </motion.div>
      <Footer />
    </>
  );
}
