import { useEffect, useRef} from "react"
import React from "react"

const Letter = ({letter, duration, firstWord}) => {
  const opacity = firstWord ? 'opacity-100' : 'opacity-0'
  return(
    <span
    className={`text-techTextActive transition duration-${duration} ease-in ${opacity} hover:opacity-0 cursor-pointer`}>
      {letter}
    </span>
  )
}

const Word = ({word, wordArr, durationFast, durationSlow, fastRegex, fadeInStep, firstWord}) => {

  const letterData = (() => {
    let data = []

    for( let i = 0; i < word.length; i++){
      const fastDuration = fastRegex.test(word[i])
      const letterKey = `${word}-${wordArr.indexOf(word)}-${word[i]}-${i}`

      const newLetter = {
        letter:word[i],
        key:letterKey,
        fastDuration:fastDuration
      }
      data.push(newLetter)
    }
    return data
  })()

  return(
    <>
      <div
      className="inline-block py-1">
        {letterData.map(l => 
        <Letter 
        key={l.key}
        letter={l.letter}
        ref={fadeInStep && (l => fadeInStep.current.push({fast:l.fastDuration, step:l.letter}))}
        duration={l.fastDuration ? durationFast : durationSlow}
        firstWord={firstWord}/>)}
      </div>
      <span>{` `}</span>
    </>
  )
}
 
const FirstWord = React.forwardRef(({word, wordArr, durationFast, durationSlow, fastRegex}, fadeInStep) => (
    <>
      <div
      className={`inline-block text-techTextActive transition duration-${durationSlow} ease-in opacity-0`}>
        <Word
          word={word}
          wordArr={wordArr}
          durationFast={durationFast}
          durationSlow={durationSlow}
          fastRegex={fastRegex}
          ref={word => fadeInStep.current.push({fast:false, step:word})}
          firstWord={true}
        />
      </div>
      <span>{` `}</span>
    </>
  ))

export const ComplexFadeIn = ({inputText, fast, durationFast, slow, durationSlow, fastRegex, setDelay = null}) => {

  const fadeInStep = useRef([])

  useEffect(() => {
    let mount = true

    document.addEventListener('keydown',() => {
      if(mount){
        fadeInStep.current.forEach(ref => {
          ref.step.classList.replace('opacity-0', 'opacity-100')
        })
      }
    })

    setTimeout(()=>{
      let runningDelay = 0
      fadeInStep.current.forEach(ref => {
        runningDelay = ref.fast ? runningDelay + fast : runningDelay + slow

        setTimeout(()=>{
          if(mount) ref.step.classList.replace('opacity-0', 'opacity-100')
        }, runningDelay)

      })
      if(setDelay) setDelay(runningDelay)
    }, slow)

    return function cleanup () {
      mount = false
    }

  }, [fast, slow, setDelay])


  const wordArr = inputText.split(" ")
  const firstWord = wordArr.shift()
  return (
    <>
      <FirstWord 
      word={firstWord}
      wordArr={wordArr}
      durationFast={durationFast}
      durationSlow={durationSlow}
      fastRegex={fastRegex}
      fadeInStep={fadeInStep}
      />
      {wordArr.map(word => 
        <Word
        key={`${word}-${wordArr.indexOf(word)}`}
        word={word}
        wordArr={wordArr}
        durationFast={durationFast}
        durationSlow={durationSlow}
        fastRegex={fastRegex}
        fadeInStep={fadeInStep}
        />)}
    </>
  )
}