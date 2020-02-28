import React, {useState,useEffect} from 'react'
import Exercises from './Exercises'
import TimerComponent from './TimerComponent'
import CreateWorkout from './CreateWorkout'
import '../styles/exercises.css'
export default function App(props) {
    const[timeRemaining, setTimeRemaining] = useState()
    const[isActiveTimer, setIsActiveTimer] = useState(true)
    const[timerRunning, setTimerRunning] = useState(false)
    const [activePeriods,setActivePeriods] = useState([2,2,2,2])
    const [restPeriods,setRestPeriods] = useState([1,1,1,1])
    const [exerciseList, setExerciseList] = useState(["pushup", "situp", "planche", "crabwalk"])
    const[totalSets, setTotalSets] = useState(3)
    const[currentSet, setCurrentSet] = useState(1)
    const[currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const[showCreateWorkout,setShowCreateWorkout] = useState(true)
    const [exercises, setExercises] = useState([])
    const [makeExercises, setMakeExercises] = useState(true)
    


    function toggleActive(){
        setIsActiveTimer(!isActiveTimer)
    }

    function startRoutine(){
        if(exerciseList.length > 0){
        setTimeRemaining(activePeriods[currentExerciseIndex])
        setTimerRunning(true)
        }
        else{
            alert("You don't have a routine made. Please go to the Workout Creation Station and make one first.")
        }
    }

    function createWorkout(){
        setShowCreateWorkout(true)
    }


    function goToWorkout(){
        setShowCreateWorkout(false)
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


    


    if(!showCreateWorkout){
    return (
        <>
        <div className="center-button">
            <button onClick={startRoutine}>Start</button>
            <button onClick={createWorkout}>Create Workout </button>
        </div>
        <div className = "exercise-app-container">
            <Exercises 
                exercisesCompleted = {currentExerciseIndex}
                exercises = {exercises}
                exerciseList = {exerciseList}
                makeExercises = {makeExercises}
                setExerciseList = {setExerciseList}
                setMakeExercises = {setMakeExercises}
                setExercises = {setExercises}
            
            />
            <p className="directions">{timerRunning ? isActiveTimer ? "PUSH IT!!!" : "REST" : "Get Ready"}</p>
            <TimerComponent timeRemaining = {timeRemaining} timerRunning = {timerRunning}/>
            <div>
                <p>The current Exercise number is: {currentExerciseIndex}</p>
                <p>Set {currentSet}</p>
                <p>Sets Remaining {totalSets - currentSet}</p>
            </div>
        </div>
        </>
    )
    }
    else
    {
        return (
            <div className="workout-creation-body">
            <div className="center-button">
                <button onClick={goToWorkout} className="to-workout-btn">Go to Workout </button>
            </div>
            <CreateWorkout
                setExerciseList = {setExerciseList}
                setRestPeriods = {setRestPeriods}
                setActivePeriods = {setActivePeriods}
                setTotalSets = {setTotalSets}
                exerciseList = {exerciseList}
                restPeriods = {restPeriods}
                activePeriods = {activePeriods}
                totalSets = {totalSets}
            />
            </div>
        )
    }
}
