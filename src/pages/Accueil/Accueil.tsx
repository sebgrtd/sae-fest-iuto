import React from 'react'
import MarqueeScroll from '../../components/bandeau-effet-scroll-infini/MarqueeScroll'
import Button from '../../components/form/Button';
import { motion } from 'framer-motion';

type Props = {
  isNavInFocus : boolean;
  setIsNavTransparent: (isNavTransparent : boolean) => void;
}

export default function (props: Props) {
  const lesArtistes = ["VLADIMIR CAUCHEMAR", "BOOBA", "FREEZE CORLEONE", "DAMSO", "ASHE 22", "HEUSS L'ENFOIRE", "ZOLA", "SCH", "H JEUNECRACK", "LUTHER"];

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

  return (
    <main id="Accueil" className='page'>
        <div className="img-container">
            <img src="/images/bg.png" alt="background" />
        </div>

        <motion.div 
        className="content"
        variants={contentVariants}
        initial="visible"
        animate={props.isNavInFocus ? "hidden" : "visible"}>

          <div className="main-content">
            <div className="texts">
              <h2>Du 21 au 25 Août 2024</h2>
              <h1>Rendez vous pour la 3ème <br></br>édition du FEST IUT'O</h1>
            </div>

            <Button text='BILLETERIE' />
          </div>
          
          <MarqueeScroll artistes={lesArtistes} />
        </motion.div>
    </main>
  )
}
