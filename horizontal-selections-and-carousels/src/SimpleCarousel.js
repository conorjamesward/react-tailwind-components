import {useState, useEffect, useRef} from 'react'

export const SimpleCarousel = ({sections, renderDots = false, dotFill, dotSize = 7, dotDuration = 300, touchSensativity = 100}) => {

  const handleDotAnimation = (on, off) => {
    on.classList.replace('scale-100', 'scale-150')
    on.classList.replace('-translate-y-0', '-translate-y-2')
    if(off){
      off.classList.replace('scale-150','scale-100')
      off.classList.replace('-translate-y-2', '-translate-y-0')
    }
  }

  const testWindowSize = () => window.innerWidth > 640

  const [windowTestResult, setWindowTestResult] = useState(testWindowSize)

  useEffect(()=>{
    window.addEventListener('resize', () => {
      setWindowTestResult(testWindowSize)
    })
  },[])

  const sectionsRef = useRef([])

  const [current, setCurrent] = useState(null)

  const handleCurrent = (newCurrent) => {
    let update = null
    if(newCurrent < 0){
      update = sections.length -1
    } else if(newCurrent > sections.length - 1){
      update = 0
    }else {
      update = newCurrent
    }
    handleDotAnimation(sectionsRef.current[update].dot, sectionsRef.current[current].dot)
    setCurrent(update)
  }

  const [startTouch, setStartTouch] = useState(null)

  const handleTouch = (e) => {
    if(!startTouch){
      setStartTouch(e.changedTouches[0].screenX)
    } else {
      const screenX = e.changedTouches[0].screenX
      if(Math.abs(screenX - startTouch) > touchSensativity){
        if(screenX < startTouch){
          handleCurrent(current + 1)
        } else {
          handleCurrent(current - 1)
        }
      }
      setStartTouch(null)
    }
  }

  useEffect(()=>{
    setCurrent(0)
    handleDotAnimation(sectionsRef.current[0].dot)
  },[])

  return (

      <div className="bg-red-400">
        <div className="flex justify-between">
          {windowTestResult && <button id="previous" onClick={() => {handleCurrent(current - 1)}}
          className="invisible md:visible text-8xl transition duration-300 transform hover:-translate-x-2 mx-3 z-30 mt-1/2">
            {`<`}
          </button>}
          <div onTouchStart={handleTouch} onTouchEnd={handleTouch}>
            {Boolean(current !== null) && sectionsRef.current[current].section}
          </div>
          {windowTestResult && <button id="next" onClick={()=>handleCurrent(current + 1)}
          className="invisible md:visible text-8xl transition duration-300 transform hover:translate-x-2 mx-3 z-30">
            {'>'}
          </button>}
        </div>
        <div className="flex justify-center">
          {renderDots && sections.map((section, i) => 
            <button key={`dot-${i}`} onClick={() => handleCurrent(i)}
            ref={dot => sectionsRef.current.push({dot:dot, section:section})}
            className={`inline-block p-2 m-2 cursor-pointer transition duration-${dotDuration} scale-100 -translate-y-0 transform hover:scale-150 hover:-translate-y-2`}>
            <svg height={`${dotSize}px`} width={`${dotSize}px`}>
              <circle
              cx={dotSize / 2}
              cy={dotSize / 2}
              r={dotSize / 2}
              fill={dotFill}
              />
            </svg>
          </button>)}
        </div>
      </div>
  )
}