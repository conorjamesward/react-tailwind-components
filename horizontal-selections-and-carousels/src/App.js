import { HorizontalSelection } from "./HorizontalSelection";
import { SimpleCarousel } from "./SimpleCarousel";
import { ComplexFadeIn } from "./ComplexFadeIn";
const App = () => {

  const range = (end) => {
    let output =  []
    for(let i = 1; i <= end; i++){
      output.push(<div className={`w-full h-full bg-purple-${i * 100}`}></div>)
    }
    return output
  }

  // <HorizontalSelection
  // titles={test}
  // sections={test}
  // currentColor='blue-200'
  // normalColor='blue-600'
  // highlightColor='purple-400'/>
  // <div className="h-64"></div>

  // <SimpleCarousel
  // sections={test}
  // width={'screen'}
  // height={'32'}
  // renderDots={true}/>

  const text = "Hello, I'm an aspiring web developer, and I'd like to help you build something awesome."
  const fastRegex = new RegExp("[a-zA-Z ']")
  const fast = 70
  const slow = 500
  const durationFast = 150
  const durationSlow = 250


  const test = range(4)
  return(
          <ComplexFadeIn
          inputText={text}
          fast={fast}
          durationFast={durationFast}
          slow={slow}
          durationSlow={durationSlow}
          fastRegex={fastRegex}
          />
  )
}

export default App;
