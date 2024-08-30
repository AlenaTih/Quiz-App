// import { useState } from "react"

function Question(props: any) {
    // const [formData, setFormData] = useState({
    //     answer: ""
    // })

    // const id = React.useId()

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

        if (event.target.value === props.correctAnswer) {
            console.log("Yay!")
        }
    }

    const answersArray = [...props.incorrectAnswers, props.correctAnswer]

    const answerElements = answersArray.map((answer: any) => (
        <label key={answer}>
            {answer}
            <input
                className="answer-option"
                onChange={handleChange}
                // id={`${id}-answer`}
                type="radio"
                value={answer}
                // checked={formData.answer === answer}
                // checked={answer}
                name="answer" />
        </label>
    ))

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
