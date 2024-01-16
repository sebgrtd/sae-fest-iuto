import {useEffect, useRef, useState} from 'react'
import MarqueeScroll from '../../components/bandeau-effet-scroll-infini/MarqueeScroll'
import Button from '../../components/form/Button';
import { motion, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';
import Footer from '../../components/Footer';
import SectionJournal from './SectionJournal';
import SectionBilleterie from './SectionBilleterie';

type Props = {
  isNavInFocus : boolean;
  setIsNavTransparent: (isNavTransparent : boolean) => void;
}

export default function (props: Props) {
  //const lesArtistes = ["VLADIMIR CAUCHEMAR", "BOOBA", "FREEZE CORLEONE", "DAMSO", "ASHE 22", "HEUSS L'ENFOIRE", "ZOLA", "SCH", "H JEUNECRACK", "LUTHER"];
  const [lesArtistes, setLesArtistes] = useState<string[]>([]);
  const targetRef = useRef(null);

  useEffect(() => {

    window.scrollTo(0,0)
    
    const fetchArtistes = async () => {
      const res = await axios.get('http://localhost:8080/getNomsArtistes')
      const data = res.data
      // data : ["Vladimir Cauchemar", "Booba", "Freeze Corleone", "Damso", "Ashe 22", "Heuss l'Enfoiré", "Zola", "Sch", "H Jeunecrack", "Luther"]
      const listeNomArtistes : string[] = []
      data.forEach((artiste: string) => 
        listeNomArtistes.push(artiste.toUpperCase())
      )
      console.log(listeNomArtistes)

      //double la liste des artistes pour avoir un effet de boucle
      listeNomArtistes.push(...listeNomArtistes)

      setLesArtistes(listeNomArtistes)
    }

    fetchArtistes()
    //setLesArtistes(["VLADIMIR CAUCHEMAR", "BOOBA", "FREEZE CORLEONE", "DAMSO", "ASHE 22", "HEUSS L'ENFOIRE", "ZOLA", "SCH", "H JEUNECRACK", "LUTHER","VLADIMIR CAUCHEMAR", "BOOBA", "FREEZE CORLEONE", "DAMSO", "ASHE 22", "HEUSS L'ENFOIRE", "ZOLA", "SCH", "H JEUNECRACK", "LUTHER"]);
  }, [])
  


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

  const exitVariants = (index: number) => {
    return{
      start:{
        y: 0,
        zIndex: 99-index,
        transition:{
          duration:0.5,
          delay: 0.5*(index+1),
          ease: [1, 0, 0,1]
        }
      },
      end:{
        y: "-100vh",
        zIndex: 99-index,
        transition:{
          duration:0.5,
          delay: 0.5*(index+1),
          ease: [1, 0, 0,1]
        }
      }
    }
  }

  const starVariants = {
    // l'étoile ne fait que tourner sur elle-même
    start:{
      rotate: 0,
      transition:{
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    },
    end:{
      rotate: 360,
      transition:{
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  const arrowVariants = {
    // la flèche indique qu'on peut scroll en bas
    animate:{
      y: 15,
      transition:{
        duration: 2,
        repeat: Infinity,
        type: "spring",
        stiffness: 50,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }

  const {scrollYProgress} = useScroll({target: targetRef, offset:["start center", "end start"]})
  const scale = useTransform(scrollYProgress, [0,0.9], [1.5, 0])

  return (
    <>
    <motion.div id="Accueil" className='page' ref={targetRef}>
        <div className="img-container">
            <img src="/images/bg.png" alt="background" />
        </div>

        <motion.div 
        className="content"
        variants={contentVariants}
        initial="visible"
        animate={props.isNavInFocus ? "hidden" : "visible"}>

          <div className="main-content">
            <h1>
              JUIN<br></br>
              21 - 23<br></br>
              2024
            </h1>
            <motion.svg
            variants={starVariants}
            initial="start"
            animate="end"
            width="230" height="255" viewBox="0 0 230 255" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M148.125 245.443L118.273 173.039L115.772 166.973L113.602 173.166L86.1159 251.622L60.6034 242.684L88.0899 164.228L90.2594 158.035L84.5192 161.214L16.0071 199.158L4.94981 172.34L73.9659 134.116L78.8451 131.414L73.5813 129.57L3.90181 105.158L14.1224 75.9849L83.8019 100.396L89.0657 102.24L86.9397 97.084L56.8677 24.1461L82.2445 10.0916L112.097 82.4967L114.598 88.563L116.768 82.3703L144.254 3.91345L169.767 12.8515L142.28 91.3083L140.111 97.501L145.851 94.3219L214.362 56.3785L225.401 83.189L156.384 121.413L151.505 124.115L156.768 125.959L226.468 150.378L216.248 179.551L146.548 155.133L141.284 153.289L143.41 158.445L173.482 231.384L148.125 245.443Z" stroke="#FFD600" stroke-width="5"/>
            </motion.svg>
          </div>
          
          <div className="bottom-content">
            <MarqueeScroll artistes={lesArtistes} />
            <motion.svg 
            variants={arrowVariants}
            animate="animate"
            style={{scale}}
            className='bottom-arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="48" d="M112 268l144 144 144-144M256 392V100"/></motion.svg>
          </div>
        </motion.div>

        <motion.div className="exit beige" variants={exitVariants(0)} initial="start" animate="end"/>
        <motion.div className="exit dark" variants={exitVariants(1)} initial="start" animate="end"/>

    </motion.div>
    <SectionJournal setIsNavTransparent={props.setIsNavTransparent}/>
    <SectionBilleterie/>
    <Footer/>
    </>
  )
}
