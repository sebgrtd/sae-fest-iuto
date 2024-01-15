import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import BoutonReseau from "../../components/Artiste/BoutonReseau";
import { motion } from "framer-motion";
import axios from "axios";

export default function PageEvenement() {
  const location = useLocation();
  const oldX = location.state?.oldX;
  const oldY = location.state?.oldY;
  const oldGroupes = location.state?.oldGroupes;
  const [nomArtiste, setNomArtiste] = useState(location.state?.nomArtiste);
  const [date, setDate] = useState(location.state?.date);
  const [heure, setHeure] = useState(location.state?.heure);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [description, setDescription] = useState(
    location.state?.description ||
      "Description par défaut si aucune description n'est passée."
  );
  const [socialLinks, setSocialLinks] = useState<{ reseau: string }[]>([]);
  const params = new URLSearchParams(window.location.search);
  const idArtiste = params.get("id");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [infosGridPosition, setInfosGridPosition] = useState<"top" | "bottom">(
    "top"
  );

  function getSocialNetworkType(
    url: string
  ):
    | "soundcloud"
    | "spotify"
    | "instagram"
    | "twitter"
    | "youtube"
    | "inconnu" {
    if (url.includes("soundcloud")) {
      return "soundcloud";
    } else if (url.includes("spotify")) {
      return "spotify";
    } else if (url.includes("instagram")) {
      return "instagram";
    } else if (url.includes("twitter")) {
      return "twitter";
    } else if (url.includes("youtube")) {
      return "youtube";
    } else {
      return "inconnu";
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/getSocialLinks/" + idArtiste)
      .then((response) => {
        setSocialLinks(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des liens de réseaux sociaux",
          error
        );
      });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      // regarde si la width du titre est plus grande que 25% de la width de la fenetre - 2*3rem
      if (titleRef.current.offsetWidth > windowWidth / 4 - 2 * 3 * 16) {
        setInfosGridPosition("top");
      } else {
        setInfosGridPosition("bottom");
      }
    }
  }, [titleRef, windowWidth]);

  const infosVariants = {
    initial: {
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.8,
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const overlayVariants = {
    initial: {
      background:
        "linear-gradient(to top, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0) 60%)",
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
    extended: {
      background:
        "linear-gradient(to top, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0) 100%)",
      transition: {
        delay: 0.6,
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div id="PageArtiste">
      <motion.div
        className="overlay"
        variants={overlayVariants}
        initial="initial"
        animate={infosGridPosition === "top" ? "extended" : "initial"}
      />

      <img
        src={"http://localhost:8080/getImageArtiste/" + idArtiste}
        alt="image de fond"
      />
      <div
        className="content"
        style={{
          columnGap: infosGridPosition === "top" ? "0" : "5rem",
          rowGap: windowWidth > 991 ? "0" : "5rem",
        }}
      >
        <h3 ref={titleRef}>
          {nomArtiste
            .toUpperCase()
            .split(" ")
            .map((mot: string, index: number) => {
              return (
                <span key={index}>
                  {mot}
                  <br />
                </span>
              );
            })}
        </h3>
        <motion.div
          className="infos"
          variants={infosVariants}
          initial="initial"
          animate="visible"
          exit="initial"
          style={{ gridArea: infosGridPosition }}
        >
          <p className="description">{description}</p>
          <div className="les-reseaux">
            {socialLinks.map((link, index) => {
              const type = getSocialNetworkType(link.reseau);
              if (type) {
                return (
                  <BoutonReseau key={index} href={link.reseau} type={type} />
                );
              }
              return null;
            })}
          </div>
          <Link
            to="/programmation"
            state={{
              comesFromPageArtist: idArtiste,
              oldX: oldX,
              oldY: oldY,
              oldGroupes: oldGroupes,
            }}
            className="btn-retour"
          >
            <svg
              width="36"
              height="28"
              viewBox="0 0 36 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="6.52539"
                y="0.321533"
                width="35.8974"
                height="3.58974"
                rx="1.79487"
                transform="rotate(45 6.52539 0.321533)"
              />
              <rect
                x="3.87891"
                y="25.5957"
                width="35.8974"
                height="3.58974"
                rx="1.79487"
                transform="rotate(-45 3.87891 25.5957)"
              />
            </svg>
          </Link>
        </motion.div>
        <div className="date-heure">
          <h4>{date}</h4>
          <h4>{heure}</h4>
        </div>
      </div>
    </div>
  );
}
