import React from 'react'

export default function TimerComponent(props) {
    return (
        <div>{props.timerRunning ? 
            <><p>TimeRemaining</p>
            <p>{props.timeRemaining}</p></> :
            <p>Time Left Will show up here</p>
        }
        </div>
    )
}
