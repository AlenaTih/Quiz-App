import { useState, ChangeEvent } from "react"
import { decode } from "html-entities"

interface QuestionProps {
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    showAnswers: boolean;
    onAnswer: (answer: string) => void;
}

function Question(props: QuestionProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const answer = event.target.value
        setSelectedAnswer(answer)
        props.onAnswer(answer) // Pass the selected answer to the parent component

        // if (answer === props.correctAnswer) {
        //     console.log("Yay!")
        // }
    }

    const answersArray = [...props.incorrectAnswers, props.correctAnswer].sort()

    const answerElements = answersArray.map((answer: string) => {
        let backgroundColor = ""
        let border = ""

        // If answers are shown (the checkAnswers button is clicked),
        // highlight correct and incorrect answers
        if (props.showAnswers) {
            if (answer === props.correctAnswer) {
                backgroundColor = "#94D7A2"
                border = "none"
            } else if (answer === selectedAnswer) {
                backgroundColor = "#F8BCBC"
                border = "none"
            } else {
                border = "1.4px solid #4D5B9E"
            }
        } else if (answer === selectedAnswer) {
            // Highlight selected answer before checking
            backgroundColor = "cornflowerblue"
            border = "none"
        } else {
            border = "1.4px solid #4D5B9E"
        }

        return (
            <label
                className="answer-label"
                key={answer}
                style={{ backgroundColor, border }}>
                {decode(answer)}
                <input
                    className="answer-option"
                    onChange={handleChange}
                    type="radio"
                    value={answer}
                    checked={selectedAnswer === answer}
                    name={props.question}
                    disabled={props.showAnswers} />
            </label>
        )
    })

    return (
        <div className="question">
            <h4 className="question-text">{decode(props.question)}</h4>
            <form className="answers">
                {answerElements}
            </form>
        </div>
    )
}

export default Question
