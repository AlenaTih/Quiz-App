import { useState, useEffect } from "react"

function Questions() {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=17&type=multiple")
            .then(response => response.json())
            .then(data => setQuestions(data.results))

        // console.log(questions)

        return () => {
            setQuestions([])
        }

    }, [])

    const questionElements = questions.map((question: any) => {
        return (
            <div className="question" key={question.question}>
                <h4>{question.question}</h4>
                <p>{question.correct_answer}</p>
                <p>{question.incorrect_answers.join(", ")}</p>
            </div>
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
