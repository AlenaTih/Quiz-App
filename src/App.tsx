import Start from "./components/Start.tsx"
import Questions from "./components/Questions.tsx"
import "./App.css"

function App() {
  return (
    <div className="app-container">
      <h1>Quiz App</h1>
      <Start />
      <Questions />
    </div>
  )
}

export default App
