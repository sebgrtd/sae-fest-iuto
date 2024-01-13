import { motion } from 'framer-motion';
import React, { useState } from 'react'

type Prop = {
    text:string;
    isLoading?:boolean;
    isDark?:boolean;
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

  const spinnerVariants = {
    hidden:{
      opacity:0,
      y: "-50%",
      scale:1.3,
    },
    loading:{
      opacity:1,
      rotate: 360,
      y: "-50%",
      scale:1,
      transition:{
        rotate:{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 2,
          ease: 'linear'
        },
        scale:{
          duration: 0.25,
          ease: [1, 0, 0,1]
        },
        opacity:{
          duration: 0.25,
          ease: [1, 0, 0,1]
        }
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
    },
    hiddenFromLoading:{
      x:"0.75rem",
      scale:0,
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
      color:props.isDark ? "#19212C" : "#FFFFFF",
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
    <motion.button className='btn' 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    variants={bgVariants}
    initial="hidden"
    animate={props.isLoading || isHovered ? "visible" : "hidden"}
    >

      <motion.p
      variants={inputVariants}
      initial="hidden"
      animate={props.isLoading || isHovered ? "visible":"hidden"}
      >
      {props.text}
      </motion.p>

      <motion.img 
      src="/icones/right-arrow.svg" 
      alt="fleche vers la droite"
      variants={arrowVariants}
      initial="hidden"
      animate={props.isLoading ? "hiddenFromLoading" : isHovered ? "visible" : "hidden"} />

      <motion.svg
      variants={spinnerVariants}
      initial="hidden"
      animate={props.isLoading ? "loading" : "hidden"}
      width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1_1177_1978" fill="white">
      <path d="M8.22035 16.4431C7.61939 16.2224 6.9487 16.5299 6.77511 17.1461C5.97128 19.9994 6.0288 23.0366 6.95464 25.8709C8.00083 29.0736 10.0948 31.8309 12.8992 33.6984C15.7036 35.5658 19.0551 36.4348 22.4136 36.1652C25.772 35.8955 28.942 34.503 31.4125 32.2121C33.8831 29.9211 35.5104 26.8651 36.0322 23.5365C36.554 20.2079 35.94 16.8005 34.2891 13.8634C32.6382 10.9263 30.0465 8.63052 26.9316 7.34605C24.1751 6.20934 21.1509 5.92321 18.2452 6.50981C17.6176 6.63649 17.2605 7.28212 17.4353 7.898C17.61 8.51387 18.2505 8.86588 18.8797 8.74808C21.2823 8.29828 23.7729 8.55116 26.0478 9.48928C28.6813 10.5752 30.8724 12.5162 32.2682 14.9993C33.6639 17.4825 34.1831 20.3632 33.7419 23.1774C33.3007 25.9916 31.9249 28.5753 29.8362 30.5122C27.7474 32.4491 25.0675 33.6263 22.228 33.8543C19.3886 34.0822 16.5551 33.3476 14.1842 31.7687C11.8132 30.1899 10.0429 27.8588 9.15836 25.151C8.39427 22.8119 8.32972 20.3094 8.95921 17.9475C9.12408 17.3289 8.82131 16.6637 8.22035 16.4431Z"/>
      </mask>
      <path d="M8.22035 16.4431C7.61939 16.2224 6.9487 16.5299 6.77511 17.1461C5.97128 19.9994 6.0288 23.0366 6.95464 25.8709C8.00083 29.0736 10.0948 31.8309 12.8992 33.6984C15.7036 35.5658 19.0551 36.4348 22.4136 36.1652C25.772 35.8955 28.942 34.503 31.4125 32.2121C33.8831 29.9211 35.5104 26.8651 36.0322 23.5365C36.554 20.2079 35.94 16.8005 34.2891 13.8634C32.6382 10.9263 30.0465 8.63052 26.9316 7.34605C24.1751 6.20934 21.1509 5.92321 18.2452 6.50981C17.6176 6.63649 17.2605 7.28212 17.4353 7.898C17.61 8.51387 18.2505 8.86588 18.8797 8.74808C21.2823 8.29828 23.7729 8.55116 26.0478 9.48928C28.6813 10.5752 30.8724 12.5162 32.2682 14.9993C33.6639 17.4825 34.1831 20.3632 33.7419 23.1774C33.3007 25.9916 31.9249 28.5753 29.8362 30.5122C27.7474 32.4491 25.0675 33.6263 22.228 33.8543C19.3886 34.0822 16.5551 33.3476 14.1842 31.7687C11.8132 30.1899 10.0429 27.8588 9.15836 25.151C8.39427 22.8119 8.32972 20.3094 8.95921 17.9475C9.12408 17.3289 8.82131 16.6637 8.22035 16.4431Z" fill="#D9D9D9" stroke="#D9D9D9" stroke-width="8" mask="url(#path-1-inside-1_1177_1978)"/>
      </motion.svg>

      
      <motion.div className={`anim-rectangle ${props.isDark ? "dark" : ""}`} 
      variants={animRectVariants}
      initial="hidden"
      animate={props.isLoading || isHovered ? "visible" : "hidden"}
      />

    </motion.button>
  )
}
