import { useState } from "react"
import { decode } from "html-entities"

function Question(props: any) {
    // const [formData, setFormData] = useState({
    //     answer: ""
    // })
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

    // function handleChange(event: any) {
    //     setFormData(prevFormData => {
    //         return {
    //             ...prevFormData,
    //             [event.target.name]: event.target.value
    //         }
    //     })
    // }

    function handleChange(event: any) {
        const answer = event.target.value
        setSelectedAnswer(answer)
        props.onAnswer(answer) // Pass the selected answer to the parent component

        if (answer === props.correctAnswer) {
            console.log("Yay!")
        }
    }

    const answersArray = [...props.incorrectAnswers, props.correctAnswer].sort()

    const answerElements = answersArray.map((answer: string) => {
        let backgroundColor = ""

        // If answers are shown (the checkAnswers button is clicked),
        // highlight correct and incorrect answers
        if (props.showAnswers) {
            if (answer === props.correctAnswer) {
                backgroundColor = "green"
            } else if (answer === selectedAnswer) {
                backgroundColor = "red"
            }
        } else if (answer === selectedAnswer) {
            // Highlight selected answer before checking
            backgroundColor = "cornflowerblue"
        }

        return (
            <label
                key={answer}
                style={{ backgroundColor }}>
                {decode(answer)}
                <input
                    className="answer-option"
                    onChange={handleChange}
                    type="radio"
                    value={decode(answer)}
                    checked={selectedAnswer === answer}
                    name={props.question} />
            </label>
        )
    })

    return (
        <div className="question">
            <h4>{decode(props.question)}</h4>
            <form className="answers">
                {answerElements}
            </form>
        </div>
    )
}

export default Question
