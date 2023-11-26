import { motion } from 'framer-motion';
import React, { useState } from 'react'

type Prop = {
    text:string;
    formRef?:React.RefObject<HTMLFormElement>;
}

export default function Button(props:Prop) {
  
  const[isHovered, setIsHovered] = useState(false);

  const animRectVariants = {
    hidden: {
      scale:0,
      rotate:45,
      transition:{
        duration: 0.25,
        ease: [1, -0.02, 0,1]
      }
    },
    visible:{
      scale: 12,
      rotate:45,
      transition:{
        duration:0.25,
        ease: [1, 0, 0,1]
      }
    }
  }

  const arrowVariants = {
    hidden:{
      opacity:0,
      x:"-0.75rem",
      y:"-50%",
      transition:{
        duration: 0.25,
        ease: [1, 0, 0,1]
      }
    },
    visible:{
      opacity:1,
      x: "0.75rem",
      y:"-57%",
      transition:{
        duration: 0.25,
        ease: [1, 0, 0,1]
      }
    }
  }

  const bgVariants={
    hidden:{
      padding:"0.875rem 2.25rem 0.875rem 2.25rem",
      transition:{
        duration: 0.25,
        ease: [1, 0, 0,1]
      }
    },
    visible:{
      padding:"0.875rem 5rem 0.875rem 2.25rem",
      transition:{
        duration: 0.25,
        ease: [1, 0, 0,1]
      }
    }
  }

  const inputVariants = {
    hidden:{
      color:"#FFFFFF",
      transition:{
        duration: 0.25,
        ease: [1, 0, 0,1]
      }
    },
    visible:{
      color:"#E45A3B",
      transition:{
        duration: 0.25,
        ease: [1, 0, 0,1]
      }
    }
  }

  return (
    <motion.div className='btn' 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    variants={bgVariants}
    initial="hidden"
    animate={isHovered ? "visible" : "hidden"}
    onClick={() => props.formRef? props.formRef.current?.requestSubmit(): {}}
    >

      <motion.input type="submit" value={props.text}
      variants={inputVariants}
      initial="hidden"
      animate={isHovered ? "visible":"hidden"}/>

      <motion.img 
      src="/icones/right-arrow.svg" 
      alt="fleche vers la droite"
      variants={arrowVariants}
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"} />
      
      <motion.div className='anim-rectangle' 
      variants={animRectVariants}
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      />

    </motion.div>
  )
}
