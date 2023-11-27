import React from 'react'

type Props = {
    codeVar: string;
    setCodeVar: (codeVar: string) => void;
    nbChar: number;
}

export default function ChampCode(props : Props) {
  const champCodeRef = React.useRef<HTMLDivElement>(null)

  const setNextInFocus = (index: number) => {
    const nextInput = champCodeRef.current?.querySelectorAll("input")[index]
    if(nextInput){
      nextInput.focus()
    }
  }

  return (
    <div className="champ-code" ref={champCodeRef}>

        {
            Array.from(Array(props.nbChar).keys()).map((index) => {
                return(
                    <input 
                        key={index}
                        type="text" 
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
  )
}
