import { HorizontalSelection } from "./HorizontalSelection";
import { SimpleCarousel } from "./SimpleCarousel";
const App = () => {

  const range = (end) => {
    let output =  []
    for(let i = 0; i <= end; i++){
      output.push(i)
    }
    return output
  }

  const test = range(100)
  return(
    <>
      <HorizontalSelection
      titles={test}
      sections={test}
      currentColor='blue-200'
      normalColor='blue-600'
      highlightColor='purple-400'/>
      <div className="h-64"></div>
      <SimpleCarousel
      sections={test}
      renderDots={true}/>
    </>
  )
}

export default App;
