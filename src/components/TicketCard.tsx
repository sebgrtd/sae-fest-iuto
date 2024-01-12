import { TargetAndTransition, motion } from "framer-motion";
import { useContext, useState } from "react";
import Button from "../components/form/Button";
import { getCookie, setCookie } from "../cookies/CookiesLib.tsx";
import { CartContext } from "../App";

const initialDays = {
  "20 Jui": false,
  "21 Jui": false,
  "22 Jui": false,
};

type Props = {
  id: number;
  title: string;
  price: number | string;
  nbTicket: number;
  isForfait?: boolean;
};

export default function TicketCard({
  id,
  title,
  price,
  nbTicket,
  isForfait,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [tickets, setTickets] = useState(nbTicket);
  const [rotation, setRotation] = useState(0);
  const [days, setDays] = useState(initialDays);
  const { cart, setCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleTicketChange = (newTickets: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setTickets(newTickets);
  };
  const addToCartHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setIsLoading(true);

    // Longueur actuelle du panier dans les cookies
    const selectedDays = isForfait
    ? Object.entries(days)
    .filter(([_, isChosen]) => isChosen)
    .map(([day, _]) => day)
    : [];


    const itemForCart = {
      id,
      title,
      price: typeof price === "number" ? price : 0,
      quantity: tickets,
      selectedDays,
    };
    
    
    // const currentCartLength = (getCookie("cart") || []).length;
    // condition non valide car si on ajoute un typê billet déjà présent dans le panier, 
    // l'ajout des nouveaux billets ne ferons que changer la valeur de quantité dans le tableau et 
    // donc la longueur du tableau ne changera pas
     // Initialise la vérification de l’ajout
  let previousQuantity = 0;
  let expectedNewQuantity = itemForCart.quantity;
  let newCart = [...cart];


  const billetIndex = newCart.findIndex(
    (billet) => billet.id === itemForCart.id
  );

  // Si l’article existait déjà dans le panier, on garde la quantité précédente et on détermine la nouvelle quantité attendue
  if (billetIndex > -1) {
    previousQuantity = newCart[billetIndex].quantity;
    expectedNewQuantity += previousQuantity;
    newCart[billetIndex].quantity = expectedNewQuantity; 
  } else {
    newCart.push(itemForCart);
  }

  // Met à jour le panier
  setCart(newCart);
  setCookie("cart", newCart, { expires: 7, sameSite: "None", secure: true });

  // Vérification finale si l’ajout est correct en quantité
  const newBilletIndex = newCart.findIndex(
    (billet) => billet.id === itemForCart.id
  );
  const hasCorrectQuantity = billetIndex > -1 ?
    newCart[newBilletIndex].quantity === expectedNewQuantity :
    newCart.some(billet => billet.id === itemForCart.id && billet.quantity === itemForCart.quantity);

    if (hasCorrectQuantity) {
      setTimeout(() => {
        setIsAdded(true);
        setIsLoading(false);  //arrete l'animation de chargement une fois l’article ajouté + le timeout
  
        // fixe un autre délai pour afficher “ARTICLE AJOUTÉ” pendant un moment
        setTimeout(() => {
          setIsAdded(false);
        }, 2000);  // Temps pendant lequel “ARTICLE AJOUTÉ” est visible
  
      }, 400);  // Temps simulant le processus de chargement
    } else {
      // ssi l'article a pas été ajouté correctement, j'arrete l’animation de chargement.
      setTimeout(() => {
        setIsLoading(false);
      }, 500); 
    }
  };
  
  const displayDay = (day: string) => day.replace("Juillet", "Juillet");

  const buttonVariants: { [key: string]: TargetAndTransition } = {
    tap: { scale: 0.95 },
    selected: { scale: 1.1, backgroundColor: "#E45A3B" },
    unselected: { scale: 1, backgroundColor: "#FFFFFF" },
  };

  const contentVariants = {
    closed: {
      opacity: 0,
      height: 0,
      overflow: "hidden",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: title === "Forfait 2 jours" ? 160 : 140,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        when: "beforeChildren",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const maxSelectedDays = 2;

  const selectedDayCount = () => {
    return Object.values(days).filter(Boolean).length;
  };

  const toggleDaySelection = (day: keyof typeof initialDays) => {
    setDays((prevDays) => {
      const isSelected = prevDays[day];
      const count = selectedDayCount();

      if (!isSelected && count >= maxSelectedDays) {
        return prevDays;
      }

      return { ...prevDays, [day]: !prevDays[day] };
    });
  };

  return (
    <motion.div
      className="ticket-card"
      layout
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      onClick={() => {
        setIsOpen(!isOpen);
        setRotation(rotation === 0 ? 90 : 0);
      }}
    >
      <div className="content">
        <div className="left-part">
          <h4>{title}</h4>
          <p>Les tickets ne sont pas remboursables.</p>
          <p>Dernière entrée à 11H.</p>
        </div>
        <div className="right-part">
          <p>{price}€</p>
          <motion.div className="svg-container" animate={{ rotate: rotation }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="20"
              viewBox="0 0 13 20"
              fill="none"
            >
              <path d="M2 18L10 10L2 2" stroke="#4E4E4E" strokeWidth="4" />
            </svg>
          </motion.div>
        </div>
      </div>
      <motion.div
        className={`sub-menu ${
          title === "Forfait 2 jours" ? "forfait-2j" : ""
        }`}
        variants={contentVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        exit="closed"
      >
        <div className="top-partsubmenu">
          <div className="left-part-sub">
            <div className="sub-menu-left-part">
              <div className="rect">
                <img
                  className=""
                  src="images/billet_pass1j.png"
                  alt="Billet pass 1 jour"
                />
              </div>
              <div className="container"></div>
              <div className="article-select">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                >
                  <path
                    d="M22 9.03848H14.6966L19.8599 4.10947L17.6953 2.04109L12.532 6.97007V0H9.46799V6.97007L4.30475 2.04109L2.13807 4.10947L7.30131 9.03848H0V11.9615H7.30131L2.13807 16.8906L4.30475 18.9589L9.46799 14.0299V21H12.532V14.0299L17.6953 18.9589L19.8599 16.8906L14.6966 11.9615H22V9.03848Z"
                    fill="#FFD600"
                  />
                </svg>
                <p>x{tickets} Article(s) sélectionné(s)</p>
              </div>

            </div>

            <div className="ticket-control">
              <button
                className="minusButton"
                onClick={(event) =>
                  handleTicketChange(Math.max(tickets - 1, 0), event)
                }
              >
                -
              </button>
              <span>{tickets}</span>
              <button
                className="sommeButton"
                onClick={(event) => handleTicketChange(tickets + 1, event)}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="delimiter-submenu"></div>
        <div className="bottom-partsubmenu">
          <div className="bottom-part-left">
              <div className="day-checkbox-container">
                {isForfait &&
                  (Object.keys(days) as Array<keyof typeof initialDays>).map(
                    (day) => (
                      <motion.label
                        key={day}
                        className="day-checkbox"
                        whileTap="tap"
                      >
                        <input
                          type="checkbox"
                          checked={days[day]}
                          onChange={() => toggleDaySelection(day)}
                          style={{ display: "none" }}
                        />
                        <motion.div
                          className="day-button"
                          variants={buttonVariants}
                          animate={days[day] ? "selected" : "unselected"}
                        >
                          {displayDay(day)}
                        </motion.div>
                      </motion.label>
                    )
                  )}
              </div>
            <p>Sous-total</p>
            <p>{tickets * (typeof price === "number" ? price : 0)}€</p>
          </div>
          <Button
            text={
              isLoading
                ? "Chargement…"
                : isAdded
                ? "ARTICLE AJOUTÉ"
                : "AJOUT PANIER"
            }
            isLoading={isLoading}
            onClick={(event: React.MouseEvent<HTMLElement>) =>
              addToCartHandler(event as React.MouseEvent<HTMLButtonElement>)
            }
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
