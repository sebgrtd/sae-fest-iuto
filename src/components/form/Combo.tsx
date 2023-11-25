import { motion } from 'framer-motion'
import {useState, useRef, useEffect} from 'react'

type Props = {
    choices : string[],
    currentChoice : string,
    setCurrentChoice : (choice : string) => void,
    title: string,
}

export default function Combo(props: Props) {
  const[isOpen, setIsOpen] = useState(false)

  const menuVariants = {
    open:{
        y:0,
        transition:{
            duration:0.2,
            ease: [1, 0, 0,1]
        }
    },
    closed:{
        y:"-110%",
        transition:{
            duration:0.2,
            ease: [1, 0, 0,1]
        }
    }
  }

  const btnOpenVariants={
    open:{
        rotate:45,
        transition:{
            duration:0.3,
            ease: [1, 0, 0,1]
        }
    },
    closed:{
        rotate:0,
        transition:{
            duration:0.3,
            ease: [1, 0, 0,1]
        }
    }
  }

  return (
    <div className="combo">

        <div 
        className="always-visible" 
        onClick={() => {setIsOpen(!isOpen)}}
        > 
            <h4>{`${props.title}: ${props.currentChoice}`}</h4>

            <motion.div className="btn-open"
            variants={btnOpenVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            >

                <div className="bar"/>
                <div className="bar"/>
            
            </motion.div>

        </div>
        <div className="container-menu">
            <div className="menu-underline"/>
            <motion.div className="menu"
            variants={menuVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}>
                {
                    props.choices.map((choice, index) => {
                        return(
                            <h4 
                            key={index} 
                            className={`${choice == props.currentChoice ? "active" : ""}`}
                            onClick={() => {props.setCurrentChoice(choice); setIsOpen(false)}}
                            >{choice}
                            </h4>
                        )
                    })
                }
            </motion.div>
        </div>
    </div>
  )
}
