import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

type Props = {
    artistes: string[]
}

export default function MarqueeScroll(props: Props) {
    
    const lesArtistesRef = useRef<HTMLDivElement>(null)

    const[tailleDuREM, setTailleDuREM] = useState(0);
    
    // mets la taille de 1rem dans tailleDuREM
    useEffect(() => {
        
        setTailleDuREM(parseFloat(getComputedStyle(document.documentElement).fontSize))

    }, [])

    const[tailleArtistes, setTailleArtistes] = useState(lesArtistesRef.current?.offsetWidth || 0)

    const handleChildUpdate = () => {
        if(lesArtistesRef.current){
            console.log(lesArtistesRef.current.offsetWidth)
            const enfants = lesArtistesRef.current.children;
            let sommeTailles = 0;

            for(let i = 0; i < enfants.length; i++){
                sommeTailles += enfants[i].clientWidth;
            }

            sommeTailles /= 2;
            sommeTailles += (enfants.length/2)*tailleDuREM;
            console.log(sommeTailles)
            setTailleArtistes(sommeTailles)
        }
    }


    useEffect(() => {

        console.log(props.artistes.length)

        if (props.artistes.length > 1){

            handleChildUpdate()
            
        }
        

    }, [props.artistes])

    const infiniteMarqueeVariants = {
        animate: {
            x: -tailleArtistes,
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 100,
                    ease: 'linear'
                }
            }
        },
    }


    return (
    <div className='marquee'>

        <motion.div className="les-artistes"
        ref={lesArtistesRef}
        variants={infiniteMarqueeVariants}
        animate="animate"
        >

            {props.artistes.map((artiste, index) => {
                    return (
                        <div 
                        key={index}
                        className='container'>

                            <span className='nom-artiste'>{artiste}</span>

                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M62.9991 27.739L42.1815 27.7675L56.8787 13.0286L50.7001 6.86056L36.0029 21.5994L35.9744 0.785744L27.2406 0.797718L27.2692 21.6114L12.5316 6.91288L6.36413 13.0979L21.1017 27.7964L0.289932 27.825L0.301899 36.5537L21.1137 36.5251L6.41646 51.2641L12.6009 57.4321L27.2981 42.6932L27.3266 63.5069L36.0603 63.4949L36.0318 42.6812L50.7694 57.3798L56.931 51.1948L42.1934 36.4962L63.011 36.4677L62.9991 27.739Z" fill="#FFD600"/>
                            </svg>

                        </div>
                    )
                })
            }

        </motion.div>

    </div>
  )
}
