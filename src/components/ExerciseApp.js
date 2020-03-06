import React, {useState,useEffect} from 'react'
import Exercises from './Exercises'
import TimerComponent from './TimerComponent'
import CreateWorkout from './CreateWorkout'
import HomePage from './HomePage'
import User from './User'
import '../styles/exercises.css'
export default function App(props) {
    const[timeRemaining, setTimeRemaining] = useState()
    const[isActiveTimer, setIsActiveTimer] = useState(true)
    const[timerRunning, setTimerRunning] = useState(false)
    const [activePeriods,setActivePeriods] = useState([5,5,5,5])
    const [restPeriods,setRestPeriods] = useState([5,5,5,5])
    const [exerciseList, setExerciseList] = useState(["pushup", "situp", "planche", "crabwalk"])
    const[totalSets, setTotalSets] = useState(3)
    const[currentSet, setCurrentSet] = useState(1)
    const[currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const[showCreateWorkout,setShowCreateWorkout] = useState(false)
    const [exercises, setExercises] = useState([])
    const [makeExercises, setMakeExercises] = useState(true)
    const [startedRoutine, setStartedRoutine] = useState(false)
    const [firstLoad, setFirstLoad] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [users, setUsers] = useState([])
    const [activeUserId, setActiveUserId] = useState(-1)
    const LOCAL_USERS_KEY = "_users"
    const myCoach = new SpeechSynthesisUtterance()
    myCoach.pitch = 1
    myCoach.volume = .4
    myCoach.rate = 1.1
    myCoach.text="Welcome Corey, I'm excited to get started!"
    myCoach.lang = 'en-GB'

    function toggleActive(){
        setIsActiveTimer(!isActiveTimer)
    }
    //Will take in pitch, volume, rate, text, and lang in that order as params.
    //If zero is passed for the first three it won't do anything and if "" is passed for the 
    // last two it won't do anything to them either but always want to pass all five in some form
    function updateCoach(pitch, volume, rate, text, lang){
        if(pitch !== 0 && pitch !== undefined){myCoach.pitch = pitch}
        if(volume !== 0 && volume !== undefined){myCoach.volume = volume}
        if(rate !== 0 && rate !== undefined){myCoach.rate = rate}
        if(text !== "" && text !== undefined){myCoach.text = text} 
    }

    //stop previous if necessary and then speak something new
    function CoachCancelPrevAndSpeak(){
        speechSynthesis.cancel()
        speechSynthesis.speak(myCoach)
    }
    
    
    //speak after all other speak calls have ran
    function CoachSpeak(){
        speechSynthesis.speak(myCoach)
    }


    function startRoutine(){
        if(exerciseList.length > 0){
            setIsActiveTimer(true)
            updateCoach(0,0,0,"Here we go!" + exerciseList[currentExerciseIndex].toString() + " for" +
                activePeriods[currentExerciseIndex].toString() + " seconds!")
            CoachCancelPrevAndSpeak()
            setTimeRemaining(activePeriods[currentExerciseIndex])
            setStartedRoutine(true)
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
        if(isActiveTimer && activePeriods.length > 1 && currentExerciseIndex < activePeriods.length-1){
            console.log("going to rest")
            setTimeRemaining(restPeriods[currentExerciseIndex])//rest Time
            setCurrentExerciseIndex(prev => prev+1)
            updateCoach(0,0,0,"And Rest! Good Work! We have " + 
                restPeriods[currentExerciseIndex].toString() + " seconds to rest." + " The next exercise is " + 
                (exerciseList[currentExerciseIndex+1] ? exerciseList[currentExerciseIndex+1].toString() :
                exerciseList[0].toString()))
            CoachCancelPrevAndSpeak()
        }
        else if(!isActiveTimer && currentExerciseIndex < activePeriods.length){
            console.log("going to active")
            setTimeRemaining(activePeriods[currentExerciseIndex])//exercise Time
            updateCoach(0,0,0,"Heeerre we go!" + exerciseList[currentExerciseIndex].toString() + " for" +
                activePeriods[currentExerciseIndex].toString() + " seconds!")
            CoachCancelPrevAndSpeak()
        }
        else{
            //we are done with the set and maybe the routine 
            if(currentSet < totalSets){
                console.log("new set")
                updateCoach(0,0,0,"And Rest! Great Job! you got through set " + currentSet.toString() + " We've got " +
                (restPeriods[currentExerciseIndex] ? 
                    restPeriods[currentExerciseIndex].toString() : 
                    restPeriods[0].toString()) 
                + " seconds to rest." +
                " Make sure you are keeping hydrated and keep moving to keep your body loose!"
                )
                CoachCancelPrevAndSpeak()
                setCurrentSet(prev=> prev + 1)
                setTimeRemaining(restPeriods[currentExerciseIndex] ? 
                    restPeriods[currentExerciseIndex] :
                    restPeriods[0]
                    )//starting over so 0 index works
                setCurrentExerciseIndex(0)
                setTimerRunning(true) 
            }
            else{
                console.log("final destination")
                setTimerRunning(false)
                setCurrentSet(1)
                setTimeRemaining(activePeriods[0])//starting over so 0 index works
                setCurrentExerciseIndex(0)
                setStartedRoutine(false)
                updateCoach(0,0,0,"And Rest! Great Job! you got through your workout! I'm really proud of you! Make sure to get a drink and then start cooling down. Great work again and I can't wait for our next workout.")
                CoachCancelPrevAndSpeak()
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


    useEffect(()=>{
        if(activeUserId != -1)
        console.log("active id is : " + activeUserId)
    },[activeUserId])
    
    useEffect(()=>{
        if(showCreateWorkout){
            speechSynthesis.cancel()
            myCoach.text="Welcome Corey, I'm excited to get started!"
            CoachSpeak()
            updateCoach(1,.4,1.1," What would you like to do today!")
            CoachSpeak()
            setTimerRunning(false)
            setCurrentSet(1)
            setTimeRemaining(activePeriods[0])//starting over so 0 index works
            setCurrentExerciseIndex(0)
        }
        else if(!showCreateWorkout && !startedRoutine && !firstLoad){
            updateCoach(0,0,0,"Get ready! We're about to get started. Make sure you are properly hydrated and warmed up!")
            CoachCancelPrevAndSpeak()
        }
    },[showCreateWorkout])


    if(firstLoad || !loggedIn){
        return(
            <>
                <HomePage 
                    setLoggedIn = {setLoggedIn}
                    setFirstLoad = {setFirstLoad}
                    setShowCreateWorkout = {setShowCreateWorkout}
                    users = {users}
                    setUsers = {setUsers}
                    activeUserId = {activeUserId}
                    setActiveUserId = {setActiveUserId}
                    LOCAL_USERS_KEY = {LOCAL_USERS_KEY}
                />
            </>
        )
        
    }


    else if(!showCreateWorkout){
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
                <p className = "p-bold">The current Exercise number is: {currentExerciseIndex}</p>
                <p className = "p-bold">Set {currentSet}</p>
                <p className = "p-bold">Sets Remaining {totalSets - currentSet}</p>
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
