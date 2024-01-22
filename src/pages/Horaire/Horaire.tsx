import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Combo from "../../components/form/Combo";
import SearchBar from "../../components/form/SearchBar";
import axios from "axios";
import Groupe from "../../classes/Groupe";
import TabArtiste from "../../components/TabArtiste/TabArtiste";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';




type Props = {
  isNavInFocus: boolean;
  setIsNavTransparent: (isNavTransparent: boolean) => void;
};

export default function PageHoraire(props: Props) {
  const navigate = useNavigate();
  const [filtreAffichage, setFiltreAffichage] = useState("Horaires");
  const [filtreGenre, setFiltreGenre] = useState("Tout");
  const [filtreDate, setFiltreDate] = useState("Tout");
  const [searchTerm, setSearchTerm] = useState("");
  const [_, setTableauxArtistes] = useState<
    Map<string, Groupe[]>
  >(new Map());
  const [filteredArtistes, setFilteredArtistes] = useState<
    Map<string, Groupe[]>
  >(new Map());
  let termeRechercher = "Tout";

  if (filtreDate === "21 Juin") {
    termeRechercher = "06-21";
  } else if (filtreDate === "22 Juin") {
    termeRechercher = "06-22";
  } else if (filtreDate === "23 Juin") {
    termeRechercher = "06-23";
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    props.setIsNavTransparent(false);

    axios
      .get("https://www.festiuto.sebastien-gratade.fr:8080/getArtistesWithSaveHoraire")
      .then((res) => {
        const artistesData: Groupe[] = res.data; // Présumé que les données correspondent à la structure de la classe Artiste
        console.log(res.data);
        const artistesParDate = new Map<string, Groupe[]>();
        artistesData.forEach((artiste: Groupe) => {
          const datePassage = artiste.datePassage;
          if (!artistesParDate.has(datePassage)) {
            artistesParDate.set(datePassage, []);
          }
          artistesParDate.get(datePassage)?.push(artiste);
        });

        // Filtrage des artistes en fonction du terme de recherche
        const filteredArtistsData = new Map<string, Groupe[]>();
        artistesData.forEach((artiste: Groupe) => {
          const artisteNom = artiste.nomG.toLowerCase();
          if (artisteNom.includes(searchTerm.toLowerCase())) {
            const datePassage = artiste.datePassage;
            if (!filteredArtistsData.has(datePassage)) {
              filteredArtistsData.set(datePassage, []);
            }
            filteredArtistsData.get(datePassage)?.push(artiste);
          }
        });

        setTableauxArtistes(artistesParDate);
        setFilteredArtistes(filteredArtistsData);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des artistes:", err);
      });
  }, [searchTerm]);


  useEffect(() => {    if (filtreAffichage === "Grille") {
      navigate('/programmation');
    }
  }, [filtreAffichage, navigate]);

  return (
    <>
      <div className="page-defaut" id="Horaire">
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
                choices={["Tout", "21 Juin", "22 Juin", "23 Juin"]}
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
        <main className="les-horaires">
          <AnimatePresence mode="wait">
            {Array.from(filteredArtistes.entries()).map(([date, artistes]) =>
              filtreDate === "Tout" ||
              artistes.some((artist) =>
                artist.datePassage.includes(termeRechercher)
              ) ? (
                <motion.div
                  key={date}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <TabArtiste
                    date={date}
                    artistes={artistes.filter(
                      (artiste) =>
                        filtreGenre === "Tout" || artiste.nomSt === filtreGenre
                    )}
                    setArtistes={setTableauxArtistes}
                  />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </main>
      </div>
      <Footer />
    </>
  );
}
