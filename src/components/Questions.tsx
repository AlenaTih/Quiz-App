import { useState, useEffect } from "react"

function Questions() {
    const [questions, setQuestions] = useState([])

    return (
        <div className="questions">
            <h1>Questions</h1>
            <button className="check-button">Check answers</button>
        </div>
    )
}

export default Questions
