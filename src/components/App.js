import React, {useState,useEffect} from 'react'
import Exercises from './Exercises'
import TimerComponent from './TimerComponent'
import '../styles/exercises.css'
export default function App(props) {
    const[timeRemaining, setTimeRemaining] = useState()
    const[isActiveTimer, setIsActiveTimer] = useState(true)
    const[timerRunning, setTimerRunning] = useState(false)
    const activePeriods = [2,2,2,2]
    const restPeriods = [1,1,1,1]
    const[totalSets, setTotalSets] = useState(3)
    const[currentSet, setCurrentSet] = useState(1)
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
            console.log("going to rest")
            setTimeRemaining(restPeriods[currentExerciseIndex])//rest Time
            setCurrentExerciseIndex(prev => prev+1)
        }
        else if(!isActiveTimer && currentExerciseIndex < activePeriods.length){
            console.log("going to active")
            setTimeRemaining(activePeriods[currentExerciseIndex])//exercise Time
        }
        else{
            //we are done with the set and maybe the routine 
            if(currentSet < totalSets){
                console.log("new set")
                setCurrentSet(prev=> prev + 1)
                setTimeRemaining(activePeriods[0])//starting over so 0 index works
                setCurrentExerciseIndex(0)
                setTimerRunning(true) 
            }
            else{
                console.log("final destination")
                setTimerRunning(false)
                setCurrentSet(1)
                setTimeRemaining(activePeriods[0])//starting over so 0 index works
                setCurrentExerciseIndex(0)
            }
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
            <Exercises exercisesCompleted = {currentExerciseIndex}/>
            <p className="directions">{timerRunning ? isActiveTimer ? "PUSH IT!!!" : "REST" : "Get Ready"}</p>
            <TimerComponent timeRemaining = {timeRemaining} timerRunning = {timerRunning}/>
            <div>
                <p>The current Exercise number is: {currentExerciseIndex}</p>
                <p>Set {currentSet}</p>
                <p>Sets Remaining {totalSets+1 - currentSet}</p>
            </div>
        </div>
        </>
    )
}
