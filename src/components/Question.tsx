function Question(props: any) {

    const incorrectAnswers = props.incorrectAnswers.map((answer: any) => (
        <p key={answer}>{answer}</p>
    ))

    return (
        <div className="question">
            <h4>{props.question}</h4>
            <div className="answers">
                    <p>{props.correctAnswer}</p>
                    {incorrectAnswers}
            </div>
        </div>
    )
}

export default Question
