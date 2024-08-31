import { useState, useEffect } from "react"
import Question from "./Question.tsx"

interface QuestionType {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    userAnswer?: string;
}

function Questions() {
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [showAnswers, setShowAnswers] = useState(false)
    const [score, setScore] = useState<number | null>(null)
    const [newGame, setNewGame] = useState(false)

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
    }, [newGame])

    function checkAnswers() {
        let correctCount = 0

        questions.forEach((question: QuestionType) => {
            const userAnswer = question.userAnswer
            if (userAnswer === question.correct_answer) {
                correctCount += 1
            }
        })

        setScore(correctCount)
        setShowAnswers(true)
    }

    function startNewGame() {
        setShowAnswers(false)
        setScore(null)
        setNewGame(true)
    }

    const questionElements = questions?.map((question: any, index: number) => {
        return (
            <Question
                key={question.question}
                question={question.question}
                correctAnswer={question.correct_answer}
                incorrectAnswers={question.incorrect_answers}
                showAnswers={showAnswers}
                onAnswer={(userAnswer: string) => {
                    const updatedQuestions = [...questions]
                    updatedQuestions[index] = {...question, userAnswer}
                    setQuestions(updatedQuestions)
                }}
            />
        )
    })

    return (
        <div className="questions">
            <div className="questions-container">
                {questionElements}
            </div>
            {!showAnswers ?
                <button
                    className="check-button"
                    onClick={checkAnswers}>
                    Check answers
                </button> :
                <button
                    className="play-again-button"
                    onClick={startNewGame}>
                    Play again
                </button>
            }
            {score !== null && (
                <h4>You scored {score}/{questions.length} correct answers</h4>
            )}
        </div>
    )
}

export default Questions
