import { useEffect, useRef,useState } from 'react'

type Props = {
    codeVar: string;
    setCodeVar: (codeVar: string) => void;
    nbChar: number;
    errorText: string;
}

export default function ChampCode(props : Props) {
  const champCodeRef = useRef<HTMLDivElement>(null)

  const firstCharRef = useRef<HTMLInputElement>(null)
  const secondCharRef = useRef<HTMLInputElement>(null)
  const thirdCharRef = useRef<HTMLInputElement>(null)
    const fourthCharRef = useRef<HTMLInputElement>(null)
    const fifthCharRef = useRef<HTMLInputElement>(null)
    const sixthCharRef = useRef<HTMLInputElement>(null)
 
  const[hasLoaded, setHasLoaded] = useState(false)
     
  const setNextInFocus = (index: number) => {
    const nextInput = champCodeRef.current?.querySelectorAll("input")[index]
    if(nextInput){
      nextInput.focus()
    }
  }

  useEffect(() => {
    // change le texte dans les input
    if (props.codeVar == "") {
        firstCharRef.current?.setAttribute("value", "")
        secondCharRef.current?.setAttribute("value", "")
        thirdCharRef.current?.setAttribute("value", "")
        fourthCharRef.current?.setAttribute("value", "")
        fifthCharRef.current?.setAttribute("value", "")
        sixthCharRef.current?.setAttribute("value", "")
    }
  }, [props.codeVar])

  useEffect(() => {
    // mets le premier input en focus
    if (!hasLoaded) {
        firstCharRef.current?.focus()
        setHasLoaded(true)
    }
  }, [sixthCharRef.current])
  

  return (
    <div className="container-champ-code">
        <div className="champ-code" ref={champCodeRef}>

            {
                Array.from(Array(props.nbChar).keys()).map((index) => {
                    return(
                        <input 
                            key={index}
                            type="text" 
                            ref={index == 0 ? firstCharRef : index == 1 ? secondCharRef : index == 2 ? thirdCharRef : index == 3 ? fourthCharRef : index == 4 ? fifthCharRef : sixthCharRef}
                            maxLength={1} 
                            value={props.codeVar[index]} 
                            onChange={(e) => {
                                const newCode = [...props.codeVar]
                                newCode[index] = e.target.value
                                props.setCodeVar(newCode.join(""))
                                setNextInFocus(index+(e.target.value.length == 0 ? -1 : 1))
                            }}
                        />
                    )
                })
            }

        </div>

        {
            props.errorText !== "" &&
                <p className="error">{props.errorText}</p>
        }

    </div>
  )
}
