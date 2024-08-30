import { useState } from "react"

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
        console.log(event.target.value)

        setSelectedAnswer(event.target.value)

        if (event.target.value === props.correctAnswer) {
            console.log("Yay!")
        }
    }

    const answersArray = [...props.incorrectAnswers, props.correctAnswer].sort(() => {
        return Math.random() - 0.5
    })

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

        return (<label
            key={answer}
            style={{ backgroundColor }}>
            {answer}
            <input
                className="answer-option"
                onChange={handleChange}
                type="radio"
                value={answer}
                checked={selectedAnswer === answer}
                name={props.question} />
        </label>
        )
    })

    return (
        <div className="question">
            <h4>{props.question}</h4>
            <form className="answers">
                {answerElements}
            </form>
        </div>
    )
}

export default Question
