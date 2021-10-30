import { HorizontalSelection } from "./HorizontalSelection";
import { SimpleCarousel } from "./SimpleCarousel";
const App = () => {

  const range = (end) => {
    let output =  []
    for(let i = 1; i <= end; i++){
      output.push(<div className={`h-full w-full bg-purple-${i * 100}`}></div>)
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

  const test = range(9)
  return(
    <div>
      <SimpleCarousel
      sections={test}
      width={'1/3'}
      height={'32'}
      renderDots={true}/>
    </div>
  )
}

export default App;
