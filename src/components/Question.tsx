function Question(props: any) {

    const answersArray = [...props.incorrectAnswers, props.correctAnswer]

    const answerElements = answersArray.map((answer: any) => (
        <label key={answer}>
            {answer}
            <input className="answer-option" type="radio" value={answer} name="answer"/>
        </label>
    ))

    return (
        <div className="question">
            <h4>{props.question}</h4>
            <div className="answers">
                {answerElements}
            </div>
        </div>
    )
}

export default Question
