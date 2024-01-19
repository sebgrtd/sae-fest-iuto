import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import Button from '../../components/form/Button';
import { Link } from 'react-router-dom';

type Props = {
    setIsNavTransparent: (isNavTransparent : boolean) => void;
}

export default function SectionJournal(props : Props) {
    const targetRef = useRef(null);
  const{ scrollYProgress } = useScroll({target:targetRef, offset:["start end", "end start"]});
  const scrollYProgressForBlur = useScroll({target:targetRef, offset:["end end", "start end"]}).scrollYProgress;
  const scrollYProgressForScale = useScroll({target:targetRef, offset:["end end", "start start"]}).scrollYProgress;

  const blur = useTransform(scrollYProgressForBlur, [0, 0.7, 0.9], ["blur(0px)", "blur(0px)", "blur(10px)"]); 

  // le 0.0000000000001 permet de fix un bug d'overflow sur mobile car avec le scale ça dépassait
  // mais du coup fix ghetto c'est de réduire la valeur de départ du scale pendant une toute petite portion de scroll
  const scale = useTransform(scrollYProgress, [0, 0.000000001, 0.25, 0.7], [0.5, 1.5, 1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.4, 0.5], ["0%", "-25%", "-52%", "-52%"]);
  const x = useTransform(scrollYProgress, [0, 0.5, 0.7], ["0%", "0%", "20%"]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 0.7], ["0deg", "0deg", "-25deg"]);
  const imagePosition = useTransform(scrollYProgress, (latest) => latest > 0.5 ? "fixed" : "sticky")

  const contentX = useTransform(scrollYProgress, [0, 0.5, 0.7], ["-50%", "-50%", "-110%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.49,0.5], [0, 1]);

    // fais en sorte que si le scrollYpROGRESS  est > 0.85 alors on met le nav en transparent

  useTransform(scrollYProgress, (latest) => {
    if (latest > 0.7)
      props.setIsNavTransparent(false);
    else
        props.setIsNavTransparent(true);
  });

  return (
    <section id="SectionJournal" ref={targetRef}>
        <motion.img 
        style={{scale:scale, y: y, x:x, rotate, position: imagePosition, filter: blur}}
        src="images/journal.png" alt="Section Journal" />

        <motion.section className='content'
        style={{x:contentX, y:"-50%", opacity:contentOpacity, filter: blur}}
        >
            <div className="infos">
                <div className="text-etoile">
                    <h2>ENCORE PLUS D'ARTISTES! </h2>
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M62.9991 27.739L42.1815 27.7675L56.8787 13.0286L50.7001 6.86056L36.0029 21.5994L35.9744 0.785744L27.2406 0.797718L27.2692 21.6114L12.5316 6.91288L6.36413 13.0979L21.1017 27.7964L0.289932 27.825L0.301899 36.5537L21.1137 36.5251L6.41646 51.2641L12.6009 57.4321L27.2981 42.6932L27.3266 63.5069L36.0603 63.4949L36.0318 42.6812L50.7694 57.3798L56.931 51.1948L42.1934 36.4962L63.011 36.4677L62.9991 27.739Z" fill="#FFD600"/>
                    </svg>
                </div>
                <p>
                    Que vous soyez fan de rap, d’éléctro ou de POP vous trouverez forcément votre bonheur parmis notre sélection d’artistes pour cette édition!
                    <br></br>
                    <br></br>
                    Explorez la programmation complète pour découvrir la richesse de notre lineup et préparez vous à une expérience inoubliable!
                </p>
            </div>
            <Link to="/programmation" className='btn-link'>
                <Button text="PROGRAMMATION"/>
            </Link>
        </motion.section>
    </section>
  )
}
