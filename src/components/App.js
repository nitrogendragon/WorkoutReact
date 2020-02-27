import React, {useState,useEffect} from 'react'
import Exercises from './Exercises'
import TimerComponent from './TimerComponent'
import '../styles/exercises.css'
export default function App(props) {
    const[timeRemaining, setTimeRemaining] = useState()
    const[isActiveTimer, setIsActiveTimer] = useState(true)
    const[timerRunning, setTimerRunning] = useState(false)
    const[exercisesRemaining, setExercisesRemaining] = useState()
    const activePeriods = [1]
    const restPeriods = [1]
    const[currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    function toggleActive(){
        setIsActiveTimer(!isActiveTimer)
    }

    function startRoutine(){
        setTimeRemaining(activePeriods[currentExerciseIndex])
        setTimerRunning(true)
    }

    function resetTimer(){
        //checking for what we are coming from and making sure we have more periods
        if(isActiveTimer && currentExerciseIndex < activePeriods.length){
            setTimeRemaining(restPeriods[currentExerciseIndex])//rest Time
            setCurrentExerciseIndex(prev => prev+1)
        }
        else if(!isActiveTimer && currentExerciseIndex < activePeriods.length){
            setTimeRemaining(activePeriods[currentExerciseIndex])//exercise Time
        }
        else{
            //we are done with the routine 
            console.log("We got to the end")
            setTimeRemaining(0)
            setTimerRunning(false)
        }
    }


    useEffect(() => {
        
        let interval = null
        if(timerRunning){
            interval = setInterval( () => {
                setTimeRemaining(timeLeft => Math.round((timeLeft -.1) * 100) / 100);
            }, 100)
        }
        else if(!timerRunning){
            clearInterval(interval)
        }
        if(timeRemaining <= 0){
            clearInterval(interval)
            resetTimer()
            isActiveTimer ? setIsActiveTimer(false) : setIsActiveTimer(true)
        }
        return () => clearInterval(interval);
    },[timerRunning, timeRemaining])




    return (
        <>
        <button onClick={startRoutine}>Start</button>
        <div className = "exercise-app-container">
            <Exercises/>
            <p>{timerRunning ? isActiveTimer ? "PUSH IT!!!" : "REST" : "Get Ready"}</p>
            <TimerComponent timeRemaining = {timeRemaining} timerRunning = {timerRunning}/>
            <p>The current Exercise number is: {currentExerciseIndex}</p>
        </div>
        </>
    )
}
