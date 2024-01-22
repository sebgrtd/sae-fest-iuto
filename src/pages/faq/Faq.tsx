import { useEffect, useState } from 'react'
import FaqCard from '../../components/FaqCard';
import Footer from '../../components/Footer';
import axios from 'axios';

type Props = {
    isNavInFocus : boolean;
    setIsNavTransparent: (isNavTransparent : boolean) => void;
  }

type Faq = {
  idFaq: number;
  question: string;
  reponse: string;
}

export default function Faq(props: Props) {
  const[listeFaq, setListeFaq] = useState<Faq[]>([]); 

  useEffect(() => {
    window.scrollTo(0, 0)
    props.setIsNavTransparent(false);

    axios.get('https://www.api.festiuto.sebastien-gratade.fr:8080/getFaq').then((res) => {
      const data = res.data;
      const listeFaq : Faq[] = [];
      data.forEach((faq: Faq) => {
        listeFaq.push(faq);
      });
      setListeFaq(listeFaq);
    })
  }, [])

  return (
    <>
      <div className='page-defaut' id="Faq">
          <header>
              <div className="title">
                  <h2>FOIRE AUX QUESTIONS (FAQ)</h2>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M62.9991 27.739L42.1815 27.7675L56.8787 13.0286L50.7001 6.86056L36.0029 21.5994L35.9744 0.785744L27.2406 0.797718L27.2692 21.6114L12.5316 6.91288L6.36413 13.0979L21.1017 27.7964L0.289932 27.825L0.301899 36.5537L21.1137 36.5251L6.41646 51.2641L12.6009 57.4321L27.2981 42.6932L27.3266 63.5069L36.0603 63.4949L36.0318 42.6812L50.7694 57.3798L56.931 51.1948L42.1934 36.4962L63.011 36.4677L62.9991 27.739Z" fill="#FFD600"/>
                  </svg>
              </div>
          </header>
          <main className='les-faqs'>
              {
                listeFaq.map((faq : Faq) => {
                  return <FaqCard key={faq.idFaq} id={faq.idFaq} question={faq.question} reponse={faq.reponse} />
                })  
              }
          </main>
      </div>
      <Footer/>
    </>
  )
}
