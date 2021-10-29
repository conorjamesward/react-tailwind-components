import { useState, useEffect, useRef, useCallback } from "react"

export const HorizontalSelection = ({titles, sections, normalColor, currentColor, highlightColor = currentColor, id =' horizontalSelection'}) => {

  const setPair = (title, section) => ({title:title, section:section})

  const flipColor = useCallback((title, selected) => {
    if(selected){
      title.classList.replace(`text-${normalColor}`, `text-${currentColor}`)
      title.classList.replace(`border-${normalColor}`, `border-${currentColor}`)
    } else {
      title.classList.replace(`text-${currentColor}`, `text-${normalColor}`)
      title.classList.replace(`border-${currentColor}`, `border-${normalColor}`)
    }
  },[currentColor, normalColor])

  const sectionPairs = useRef([])

  const [currentPair, setCurrentPair] = useState(null)

  const handleSelection = (e) => {
    sectionPairs.current.forEach(pair => {
      if(pair.title === currentPair.title){
        flipColor(pair.title)
      }
    })
    flipColor(e.target, true)
    setCurrentPair(sectionPairs.current.find(pair => (pair.title === e.target)))
  }

  useEffect(() => {
    setCurrentPair(sectionPairs.current[0])
    flipColor(sectionPairs.current[0].title, true)
  }, [flipColor])

  return(
    <>
      <ul className="flex flex-wrap">
        {titles.map((title, i) => {
          return(
            <li 
            ref={li => sectionPairs.current.push(setPair(li, sections[i]))}
            onClick={handleSelection}
            className={`text-center cursor-pointer py-2 px-5 border-b-2 flex-grow text-${normalColor} border-${normalColor} hover:text-${highlightColor} hover:border-${highlightColor}`}
            key={`${title}-${i}`}>
              {title}
            </li>
          )
        })}
      </ul>
      {currentPair && currentPair.section}
    </>
  )
}