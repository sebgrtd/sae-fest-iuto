import { motion } from 'framer-motion';
import {useState,useRef, useEffect} from 'react'

type Props = {
    id: number;
    question: string;
    reponse: string;
}

export default function FaqCard(props:Props) {
  const[isOpen, setIsOpen] = useState(false);
  // le rem est présent sur le fontSize du HTML
  const[tailleDuRem, setTailleDuRem] = useState(parseFloat(getComputedStyle(document.documentElement).fontSize));
  const reponseRef = useRef<HTMLParagraphElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);
  const[topContentHeight, setTopContentHeight] = useState(topContentRef.current? topContentRef.current.offsetHeight : 0);
  const[reponseHeight, setReponseHeight] = useState(reponseRef.current? reponseRef.current.offsetHeight : 0);

  useEffect(() => {

    const handleResize = () => {
        setTailleDuRem(parseFloat(getComputedStyle(document.documentElement).fontSize));
    }

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    }
  }, [])

  useEffect(()=>{
    setTopContentHeight(topContentRef.current? topContentRef.current.offsetHeight : 0);
    setReponseHeight(reponseRef.current? reponseRef.current.offsetHeight : 0);
  }, [topContentRef.current, reponseRef.current])

  const cardVariants = {
    hidden:{
        height:(topContentHeight + 2.5*tailleDuRem) + "px",
        borderColor:"#E45A3B",
        transition:{
            duration:0.5,
            ease: [1, 0, 0,1]
        }
    },
    visible:{
        height: (topContentHeight + reponseHeight + 1.5*(2.5*tailleDuRem)) + "px",
        borderColor:"#FFD600",
        transition:{
            duration:0.5,
            ease: [1, 0, 0,1]
        }
    }
  }

  const reponseVariants = {
    hidden:{
        opacity:0,
        zIndex:-1,
        transition:{
            duration:0.5,
            ease: [1, 0, 0,1]
        }
    },
    visible:{
        opacity:1,
        zIndex:1,
        transition:{
            duration:0.5,
            ease: [1, 0, 0,1]
        }
    }
  }

  const crossVariants = {
    closed:{
        rotate:45,
        transition:{
            duration:0.5,
            ease: [1, 0, 0,1]
        }
    },
    open:{
        rotate:0,
        transition:{
            duration:0.5,
            ease: [1, 0, 0,1]
        }
    }
  }

  return (
    <motion.div 
    className="faq-card" 
    onClick={()=>setIsOpen(!isOpen)}
    variants={cardVariants}
    initial="hidden"
    animate={isOpen ? "visible" : "hidden"}>
        <div className="top-content" ref={topContentRef}>
            <div className="title">
                <h4 className='index'>{props.id.toString().length == 1 ? "0" : ""}{props.id}.</h4>
                <h3 className='question'>{props.question}</h3>
            </div>
            <motion.svg
            variants={crossVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            className='cross' width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6.52539" y="0.321533" width="35.8974" height="3.58974" rx="1.79487" transform="rotate(45 6.52539 0.321533)" fill="#E45A3B"/>
                <rect x="3.87891" y="25.5957" width="35.8974" height="3.58974" rx="1.79487" transform="rotate(-45 3.87891 25.5957)" fill="#E45A3B"/>
            </motion.svg>
        </div> 
        <motion.p 
        className='reponse' 
        ref={reponseRef}
        variants={reponseVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        >
            {props.reponse}
        </motion.p>
    </motion.div>
  )
}
