import { useState, useEffect } from "react"
export const HorizontalSelection = ({titles, sections, normalColor, currentColor, highlightColor = currentColor, id =' horizontalSelection'}) => {

  const deriveId = (index) => `${id}-${index}-title`
  const deriveIndex = (id) => id.split("-")[1]

  const [current, setCurrent] = useState(deriveId(0))

  const handleSelection = (e) => {
    const currentSection = document.getElementById(current)
    currentSection.classList.replace(`text-${currentColor}`, `text-${normalColor}`)
    currentSection.classList.replace(`border-${currentColor}`, `border-${normalColor}`)
    setCurrent(e.target.id)
    const newSection = document.getElementById(e.target.id)
    newSection.classList.replace(`text-${normalColor}`, `text-${currentColor}`)
    newSection.classList.replace(`border-${normalColor}`, `border-${currentColor}`)
  }

  useEffect(()=>{
    document.getElementById(`${id}-${0}-title`).click()
  },[id])

  return(
    <>
      <ul className="flex flex-wrap">
        {titles.map(title => (
          <li onClick={handleSelection}
          id={deriveId(titles.indexOf(title))}
          className={`text-center cursor-pointer py-2 px-5 border-b-2 flex-grow text-${normalColor} border-${normalColor} hover:text-${highlightColor} hover:border-${highlightColor}`}
          key={title}>
            {title}
          </li>
        ))}
      </ul>
      {sections[deriveIndex(current)]}
    </>
  )
}