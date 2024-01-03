import { motion } from 'framer-motion';
import { useState } from 'react';

type Props = {
  id: number;
  title: string;
  price: number;
  nbTicket: number;
};


export default function TicketCard(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [tickets, setTickets] = useState(props.nbTicket);
  const [rotation, setRotation] = useState(0);
  const handleTicketChange = (newTickets: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setTickets(newTickets);
  };

  const contentVariants = {
    closed: {
      opacity: 0,
      height: 0,
      overflow: 'hidden',
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      height: 80,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
        when: 'beforeChildren',
      }
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
      },
    },
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
        <div className='left-part'>
          <h4>{props.title}</h4>
          <p>Les tickets ne sont pas remboursables.</p>
          <p>Dernière entrée à 11H.</p>
        </div>
        <div className='right-part'>
          <p>{props.price}€</p>
          <motion.div className="svg-container" animate={{ rotate: rotation }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 13 20" fill="none">
              <path d="M2 18L10 10L2 2" stroke="#4E4E4E" strokeWidth="4" />
            </svg>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        className='sub-menu'
        variants={contentVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        exit="closed"
      >
        <div className='left-part-sub'>
          <div className ="rect">
            <img src="images/billet_pass1j.png" alt="Billet pass 1 jour" />
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
            <path d="M22 9.03848H14.6966L19.8599 4.10947L17.6953 2.04109L12.532 6.97007V0H9.46799V6.97007L4.30475 2.04109L2.13807 4.10947L7.30131 9.03848H0V11.9615H7.30131L2.13807 16.8906L4.30475 18.9589L9.46799 14.0299V21H12.532V14.0299L17.6953 18.9589L19.8599 16.8906L14.6966 11.9615H22V9.03848Z" fill="#FFD600"/>
          </svg>
          <p>x{tickets} Article(s) sélectionné(s)</p>
        </div>
        <div className="ticket-control">
          <button onClick={(event) => handleTicketChange(Math.max(tickets - 1, 0), event)}>-</button>
          <span>{tickets}</span>
          <button className='sommeButton' onClick={(event) => handleTicketChange(tickets + 1, event)}>+</button>
        </div>
      </motion.div>
    </motion.div>
  );
}