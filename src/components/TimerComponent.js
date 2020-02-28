import React from 'react'
import '../styles/exercises.css'
export default function TimerComponent(props) {
    return (
        <div>{props.timerRunning ? 
            <><p> className = "p-bold"TimeRemaining</p>
            <p className = "p-bold">{props.timeRemaining}</p></> :
            <p className = "p-bold">Time Left Will show up here</p>
        }
        </div>
    )
}
