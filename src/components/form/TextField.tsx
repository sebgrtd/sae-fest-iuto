import { motion } from 'framer-motion';
import {useState, useRef} from 'react'

type Props = {
    text:string;
    textVar:string;
    setTextVar: (newText: string) => void;
    isPassword? : boolean;
}

export default function TextField(props: Props) {
  const[currentText, setCurrentText] = useState("");
  const[isFocused, setIsFocused] = useState(false);
  const labelRef = useRef<HTMLLabelElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const leTexte = e.target.value;
    setCurrentText(leTexte);
    console.log(leTexte);
  }

  const labelVariants = {
    default:{
        top:"50%",
        y:"-50%",
        scale:1,
        transition:{
            duration: 0.5,
            ease: [1, -0.02, 0,1]
        }
    },
    animate:{
        top:"-1rem",
        y:"0%",
        scale: 0.8,
        transition:{
            duration: 0.5,
            ease: [1, -0.02, 0,1]
        }
    }
  }

  const bgVariants = {
    hidden:{
        opacity:0,
        transition:{
            duration: 0.5,
            ease: [1, -0.02, 0,1]
        }
    },
    visible:{
        opacity:1,
        transition:{
            duration: 0.5,
            ease: [1, -0.02, 0,1]
        }
    }
  }
  
  const maskVariants = {
    hidden:{
        opacity:0,
        height: "1rem",
        width: labelRef.current?.offsetWidth,
        transition:{
            duration: 0.5,
            ease: [1, -0.02, 0,1]
        }
    },
    visible:{
        opacity:1,
        height: "1rem",
        width: labelRef.current?.offsetWidth,
        transition:{
            duration: 0.5,
            ease: [1, -0.02, 0,1]
        }
    }
  }
  return (  
    <div className='textfield-container'>
        
        <motion.label 
        ref={labelRef}
        htmlFor="text"
        variants={labelVariants}
        initial="default"
        animate={isFocused || currentText !== "" ? "animate" : "default"}
        >{props.text}</motion.label>

        <input name="text" 
        type="text" 
        defaultValue=""
        onChange={handleTextChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        />

        <motion.div 
        aria-hidden 
        className="bg"
        variants={bgVariants}
        initial="hidden"
        animate={isFocused || currentText !== "" ? "visible" : "hidden"}
        />

        <motion.div 
        aria-hidden 
        className="mask"
        variants={maskVariants}
        initial="hidden"
        animate={isFocused || currentText !== "" ? "visible" : "hidden"}
        />

    </div>
  )
}
