import React, {useState,useEffect} from 'react'
import Exercises from './Exercises'
import TimerComponent from './TimerComponent'
import CreateWorkout from './CreateWorkout'
import HomePage from './HomePage'
import Logout from './Logout'
import Stats from './Stats'
import ShowStatsButton from './ShowStatsButton'
import '../styles/exercises.css'
export default function App(props) {
    const[timeRemaining, setTimeRemaining] = useState()
    const[isActiveTimer, setIsActiveTimer] = useState(true)
    const[timerRunning, setTimerRunning] = useState(false)
    const [activePeriods,setActivePeriods] = useState([])
    const [restPeriods,setRestPeriods] = useState([])
    const [exerciseList, setExerciseList] = useState([])
    const[totalSets, setTotalSets] = useState(3)
    const[currentSet, setCurrentSet] = useState(1)
    const[currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const[showCreateWorkout,setShowCreateWorkout] = useState(false)
    const [exercises, setExercises] = useState([])
    const [startedRoutine, setStartedRoutine] = useState(false)
    const [firstLoad, setFirstLoad] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [users, setUsers] = useState([])
    const [showStats, setShowStats] = useState(false)
    const [activeUserId, setActiveUserId] = useState(-1)
    const [updateStats,setUpdateStats] = useState(false)
    const LOCAL_USERS_KEY = "_users"
    const myCoach = new SpeechSynthesisUtterance()
    myCoach.lang = 'en-GB'
    myCoach.pitch = 1
    myCoach.volume = .4
    myCoach.rate = 1.1
    

    function toggleActive(){
        setIsActiveTimer(!isActiveTimer)
    }
    //Will take in pitch, volume, rate, and text in that order as params.
    //If zero is passed for the first three it won't do anything and if "" is passed for the 
    // last one it won't do anything either but always want to pass all five in some form
    function updateCoach(pitch , volume, rate, text){
        if(pitch > 0 && pitch !== undefined){myCoach.pitch = pitch}
        if(volume > 0 && volume !== undefined){myCoach.volume = volume}
        if(rate > 0 && rate !== undefined){myCoach.rate = rate}
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
            alert("You don't have a routine made. Please go to the Workout Creation and make one first.")
        }
    }

    function createWorkout(){
        setShowCreateWorkout(true)
    }


    function goToWorkout(){
        setShowCreateWorkout(false)
    }

    function resetTimer(){
        //if we are active and have more exercises we go to rest mode and +1 the exercise index
        if(isActiveTimer && activePeriods.length > 1 && currentExerciseIndex < activePeriods.length-1){
            setTimeRemaining(restPeriods[currentExerciseIndex])//rest Time
            setCurrentExerciseIndex(prev => prev+1)
            updateCoach(0,0,0,"And Rest! Good Work! We have " + 
            restPeriods[currentExerciseIndex].toString() + " seconds to rest." + " The next exercise is " + 
            (exerciseList[currentExerciseIndex+1] ? exerciseList[currentExerciseIndex+1].toString() :
            exerciseList[0].toString()))
            CoachCancelPrevAndSpeak()
        }
        //if we are resting and there is another exericse we go to active
        else if(!isActiveTimer && currentExerciseIndex < activePeriods.length){
            setTimeRemaining(activePeriods[currentExerciseIndex])//exercise Time
            updateCoach(0,0,0,"Heeerre we go!" + exerciseList[currentExerciseIndex].toString() + " for" +
                activePeriods[currentExerciseIndex].toString() + " seconds!")
            CoachCancelPrevAndSpeak()
        }
        else{
            //we are done with the set and maybe the routine so dependingly we will reset the workout and +1 current set or just default everything because we are done
            if(currentSet < totalSets){
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
                setUpdateStats(true)
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

    //countdown timer logic for when the timer is running
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

    // logic for initial setup and greeting message when createworkout is shown or the actual workout is ready to run
    useEffect(()=>{
        if(showCreateWorkout){
            speechSynthesis.cancel()
            myCoach.text="Welcome " + users[activeUserId].props.userName + ", I'm excited to get started!"
            CoachSpeak()
            updateCoach(1,.4,1.1," What would you like to do today!")
            CoachSpeak()
            setTimerRunning(false)
            setCurrentSet(1)
            setTimeRemaining(activePeriods[0])//starting over so 0 index works
            setCurrentExerciseIndex(0)
        }
        else if(!showCreateWorkout && !startedRoutine && !firstLoad && loggedIn){
            updateCoach(0,0,0,"Get ready! We're about to get started. Make sure you are properly hydrated and warmed up!")
            CoachCancelPrevAndSpeak()
        }
    },[showCreateWorkout])

    //conditional rendering essentially
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
            <div className="workout-creation-body">>
                <div className = "nav-bar">
                    <ShowStatsButton setShowStats = {setShowStats} showStats = {showStats}/>
                    <Logout 
                        setActiveUserId = {setActiveUserId} 
                        setLoggedIn = {setLoggedIn}
                        setTimerRunning = {setTimerRunning}
                        setCurrentSet = {setCurrentSet}
                        setTimeRemaining = {setTimeRemaining}
                        setCurrentExerciseIndex = {setCurrentExerciseIndex}
                        setStartedRoutine = {setStartedRoutine}
                        setShowCreateWorkout = {setShowCreateWorkout}
                        activePeriods = {activePeriods}
                        updateCoach = {updateCoach}
                        CoachCancelPrevAndSpeak = {CoachCancelPrevAndSpeak} 
                    />
                </div>
                <Stats 
                        exerciseList = {exerciseList}
                        activePeriods = {activePeriods}
                        users = {users}
                        activeUserId = {activeUserId}
                        showStats = {showStats}
                        updateStats = {updateStats}
                        setUpdateStats = {setUpdateStats}
                        totalSets = {totalSets}
                        LOCAL_USERS_KEY = {LOCAL_USERS_KEY}
                />
                <div className="center-button">
                    <button onClick={startRoutine}>Start</button>
                    <button onClick={createWorkout}>Create Workout </button>
                </div>
                {/* <div className = "exercise-app-container"> */}
                    <Exercises 
                        exercisesCompleted = {currentExerciseIndex}
                        exercises = {exercises}
                        exerciseList = {exerciseList}
                        setExerciseList = {setExerciseList}
                        showCreateWorkout = {showCreateWorkout}
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
            // </div>
        )
    }
    else
    {
        return (
            <div className="workout-creation-body">
                <div className = "nav-bar">
                    <ShowStatsButton setShowStats = {setShowStats} showStats = {showStats}/>
                    <Logout 
                        setActiveUserId = {setActiveUserId} 
                        setLoggedIn = {setLoggedIn}
                        setTimerRunning = {setTimerRunning}
                        setCurrentSet = {setCurrentSet}
                        setTimeRemaining = {setTimeRemaining}
                        setCurrentExerciseIndex = {setCurrentExerciseIndex}
                        setStartedRoutine = {setStartedRoutine}
                        setShowCreateWorkout = {setShowCreateWorkout}
                        activePeriods = {activePeriods}
                        updateCoach = {updateCoach}
                        CoachCancelPrevAndSpeak = {CoachCancelPrevAndSpeak} 
                    />
                    
                </div>
                <Stats 
                    exerciseList = {exerciseList}
                    activePeriods = {activePeriods}
                    users = {users}
                    activeUserId = {activeUserId}
                    showStats = {showStats}
                    updateStats = {updateStats}
                    setUpdateStats = {setUpdateStats}
                    totalSets = {totalSets}
                    LOCAL_USERS_KEY = {LOCAL_USERS_KEY}
                />
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
                    activeUserId = {activeUserId}
                />
            </div>
        )
    }
}
