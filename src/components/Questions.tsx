import { useState, useEffect } from "react"
import Question from "./Question.tsx"

function Questions() {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=17&type=multiple")
            .then(response => response.json())
            .then(data => setQuestions(data.results))

        return () => {
            setQuestions([])
        }

    }, [])

    const questionElements = questions?.map((question: any) => {
        return (
            <Question
                key={question.question}
                question={question.question}
                correctAnswer={question.correct_answer}
                incorrectAnswers={question.incorrect_answers}
            />
        )
    })

    return (
        <div className="questions">
            <h1>Questions</h1>
            <div className="questions-container">
                {questionElements}
            </div>
            <button className="check-button">Check answers</button>
        </div>
    )
}

export default Questions
