function Start(props: any) {

    return (
        <div className="start">
            <h1 className="start-title">Quizzical</h1>
            <p className="start-text">Are you ready to challenge yourself?</p>
            <button className="start-button" onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}

export default Start
