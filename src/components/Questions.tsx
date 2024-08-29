import { useState, useEffect } from "react"
import Question from "./Question.tsx"

interface QuestionType {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

function Questions() {
    const [questions, setQuestions] = useState<QuestionType[]>([])

    useEffect(() => {
        const controller = new AbortController()

        fetch("https://opentdb.com/api.php?amount=5&category=17&type=multiple", { signal: controller.signal })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not okay")
                }
                return response.json()
            })
            .then(data => setQuestions(data.results))
            .catch(error => {
                if (error.name !== "AbortError") {
                    console.error("Fetch errror:", error)
                }
            })

        return () => {
            controller.abort()
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
