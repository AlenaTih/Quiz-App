import { useState } from "react"
import Start from "./components/Start.tsx"
import Questions from "./components/Questions.tsx"
import "./App.css"

function App() {
  const [questionsScreenOpened, setQuestionsScreenOpened] = useState(false)

  function openQuestionsScreen() {
    setQuestionsScreenOpened(prevScreen => !prevScreen)
  }

  return (
    <div className="app-container">
      {!questionsScreenOpened ? <Start startQuiz={openQuestionsScreen} /> :
      <Questions />}
    </div>
  )
}

export default App
