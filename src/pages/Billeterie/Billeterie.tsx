import { useEffect } from "react";
import TicketCard from "../../components/TicketCard";
import Footer from "../../components/footer";
import axios from 'axios';
const videoSrc = "images/bgbilleterie.mp4"


type Props = {
  isNavInFocus: boolean;
  setIsNavTransparent: (isNavTransparent: boolean) => void;
};

type Billet = {
  idB: number;
  title: string;
  prix: number|string;
  nbTicket: number;
};



export default function Billeterie(props: Props) {
  const billets: Billet[] = [
    {
      idB: 1,
      title: "Accès Samedi 20 Juillet",
      prix: 60,
      nbTicket: 0,
    },
    {
      idB: 2,
      title: "Accès Dimanche 21 Juillet",
      prix: 80,
      nbTicket: 0,
    },
    {
      idB: 3,
      title: "Accès Lundi 22 Juillet",
      prix: 90,
      nbTicket: 0,
    },
    {
      idB: 4,
      title: "Forfait 2 jours",
      prix: "À partir de 140",
      nbTicket: 0,
    },
    {
      idB: 5,
      title: "Forfait 3 jours",
      prix: "180",
      nbTicket: 0,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    props.setIsNavTransparent(false);
  }, []);

  return (
    <>
      <div className="page-defaut" id="Billeterie">
        <header>
        <video className="bgbillet" autoPlay muted loop>
            <source src={videoSrc} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
          <div className="header">
            <h2>BILLETERIE</h2>
          </div>
          <img
            src="images/billet_pass1j.png"
            alt="bgbilleterie"
            className="billetExemple"
          ></img>
        </header>

        <main className="billets">
          <section className="header-billet">
            <div>
              <p>samedi 20 Juillet 2024 - lundi 22 Juillet 2024</p>
              <h2>FESTI'IUTO ÉDITION 2024</h2>
              <div className="lieu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="20"
                  viewBox="0 0 14 20"
                  fill="none"
                >
                  <path
                    d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C6.33696 9.5 5.70107 9.23661 5.23223 8.76777C4.76339 8.29893 4.5 7.66304 4.5 7C4.5 6.33696 4.76339 5.70107 5.23223 5.23223C5.70107 4.76339 6.33696 4.5 7 4.5C7.66304 4.5 8.29893 4.76339 8.76777 5.23223C9.23661 5.70107 9.5 6.33696 9.5 7C9.5 7.66304 9.23661 8.29893 8.76777 8.76777C8.29893 9.23661 7.66304 9.5 7 9.5Z"
                    fill="#4E4E4E"
                  />
                </svg>
                <p>3 rue Montorgueil, 45000, France</p>
              </div>
            </div>
            <div>
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
          </section>
          <section className="billets-content">
            <h3>Billets</h3>
            <div className="achat-billets">
            {billets.map((billet) => (
              <TicketCard
                key={billet.idB}
                id={billet.idB}
                title={billet.title}
                price={billet.prix}
                nbTicket={billet.nbTicket}
                isForfait={billet.idB === 4}
              />
            ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
