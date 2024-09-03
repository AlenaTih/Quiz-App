import { useState, useEffect } from "react"
import Question from "./Question.tsx"
import CongratulationsCat from "../assets/congratulations-cat.webp"
import YouCanDoItCat from "../assets/you-can-do-it-cat.webp"

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

            <div className="buttons-score-container">
                {score !== null && (
                        <h4
                            className="score-text">
                            You scored {score}/{questions.length} correct answers
                        </h4>
                    )}
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
            </div>

            <div className="reaction-container">
                {score === 5 &&
                    (<img className="congratulations-cat-gif" src={CongratulationsCat}></img>)
                }
                {score === 0 &&
                    (<img className="you-can-do-it-cat-gif" src={YouCanDoItCat}></img>)
                }
            </div>
        </div>
    )
}

export default Questions
