import { HorizontalSelection } from "./HorizontalSelection";
const App = () => {
  const test = ['one', 'two', 'three', 'four','five','six','seven']
  return(
    <HorizontalSelection
    titles={test}
    sections={test}
    currentColor='blue-200'
    normalColor='blue-600'
    highlightColor='purple-400'/>
  )
}

export default App;
