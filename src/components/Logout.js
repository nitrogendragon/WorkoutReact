import React from 'react'
import '../styles/logout.css'
export default function Logout(props) {


    function handleLogout(){
        props.updateCoach(0,0,0,"See you later!")
        props.CoachCancelPrevAndSpeak()
        props.setTimerRunning(false)
        props.setCurrentSet(1)
        props.setTimeRemaining(props.activePeriods[0])//starting over so 0 index works
        props.setCurrentExerciseIndex(0)
        props.setStartedRoutine(false)
        props.setActiveUserId(-1)
        props.setLoggedIn(false)
        props.setShowCreateWorkout(false)
    }


    return (
        <div className="workout-buttons-container">
            <button className="logout-button" onClick={ handleLogout}>Log Out</button>
        </div>
    )
}
