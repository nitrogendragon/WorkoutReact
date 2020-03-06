import React, {useState, useEffect} from 'react'
import '../styles/workoutSaver.css'
export default function WorkoutSaver(props) {
    const exercisesKey = "_exercises"
    const activePeriodsKey = "_activePeriods"
    const restPeriodsKey = "_restPeriods"
    const LOCAL_workoutNamesKey = "_workoutNames"
    const [choosingWorkoutToSaveTo,setChoosingWorkoutToSaveTo] = useState(false)
    const [choosingWorkoutToLoad,setChoosingWorkoutToLoad] = useState(false)
    const [theLoadButtons, setTheLoadButtons] = useState([])
    const [theSaveButtons, setTheSaveButtons] = useState([])
    const [workoutName, setWorkoutName] = useState("")
    const maxWorkoutsCount = 50
    // const LOCAL_STORAGE_KEY = 'savedWorkouts'
    let i
    const workoutButtonsContainer = {
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",

    }


    const saveLoadBackButton = {
        position: 'absolute',
        top: '0',
        right: '10px',
        margin: '0',
        marginTop:'10px',
        borderRadius:'50px'
    }


    function handleLoadWorkout(LOCAL_STORAGE_KEY){
        const exercises = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY+ exercisesKey))
        const restPeriods = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY + restPeriodsKey))
        const activePeriods = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY + activePeriodsKey))
        if(exercises && restPeriods && activePeriods){
            props.setExerciseList(exercises)
            props.setRestPeriods(restPeriods)    
            props.setActivePeriods(activePeriods)
            alert(LOCAL_STORAGE_KEY + " was loaded")
            setChoosingWorkoutToLoad(false)
        }
        else{alert("There is no workout stored here. Please make and save one first")}
        
        
    }


    function handleSaveWorkout(LOCAL_STORAGE_KEY, id) {
        if(props.exerciseList && props.restPeriods && props.activePeriods){
            updateWorkoutName(id)
            localStorage.setItem(LOCAL_STORAGE_KEY + exercisesKey, JSON.stringify(props.exerciseList))
            localStorage.setItem(LOCAL_STORAGE_KEY + restPeriodsKey, JSON.stringify(props.restPeriods))
            localStorage.setItem(LOCAL_STORAGE_KEY + activePeriodsKey, JSON.stringify(props.activePeriods))
            localStorage.setItem(LOCAL_workoutNamesKey, JSON.stringify(props.workoutNames))
            alert(LOCAL_STORAGE_KEY + " was saved to")
            setChoosingWorkoutToSaveTo(false)
        } else{ alert("Please create a workout before trying to save")}
        
        
    }


    function createTheLoadButtons(){
        i = 0
        let tempButtons = []
        let val
        while(i != maxWorkoutsCount){
            val = "workout_" + i.toString()
            tempButtons[i] = 
                <button value = {val} onClick={e => handleLoadWorkout(e.target.value)}>
                    {props.workoutNames[i] ? props.workoutNames[i]: val}
                </button>
                ++i
            }
            setTheLoadButtons(tempButtons)
    }
    
    
    function createTheSaveButtons(){
        i = 0
        let tempButtons = []
        let val
        while(i != maxWorkoutsCount){
            val = "workout_" + i.toString()
            tempButtons[i] =
                <button value = {val} id = {i} onClick={e => handleSaveWorkout(e.target.value, e.target.id)}>
                    {props.workoutNames[i] ? props.workoutNames[i]: val}
                </button>
                ++i
            }
            setTheSaveButtons(tempButtons)
    }


    function updateWorkoutName(id){
        let temp = []
        temp = props.workoutNames
        if(workoutName != ""){ temp[id] = workoutName}
        console.log(temp[id])
        props.setWorkoutNames(temp)
        let val = "workout_" + id.toString()
        temp = theSaveButtons
        temp[id] = 
            <button value = {val} id = {i} onClick={e => handleSaveWorkout(e.target.value, e.target.id)}>
                    {props.workoutNames[i] ? props.workoutNames[i]: val}
            </button>
        setTheSaveButtons(temp)
        temp = theLoadButtons
        temp[id] = 
            <button value = {val} id = {i} onClick={e => handleLoadWorkout(e.target.value, e.target.id)}>
                    {props.workoutNames[i] ? props.workoutNames[i]: val}
            </button>
        setTheLoadButtons(temp)
        setWorkoutName("")
    }


    useEffect(()=>{
        // console.log(props.workoutNames)
    },[props.workoutNames])

    useEffect(()=>{
        let storedNames = JSON.parse(localStorage.getItem(LOCAL_workoutNamesKey))
        if(storedNames){
            props.setWorkoutNames(storedNames)
        }
    },[])

    useEffect(()=>{
        if(choosingWorkoutToLoad){
            createTheLoadButtons()
        }
        else if(choosingWorkoutToSaveTo){
            createTheSaveButtons()
        }
    },[choosingWorkoutToLoad,choosingWorkoutToSaveTo, workoutName])


    if(!choosingWorkoutToSaveTo && !choosingWorkoutToLoad)
        return (
            <div style={workoutButtonsContainer} >
                <button value = "true" onClick={e => setChoosingWorkoutToLoad(e.target.value)}>
                    Load {props.workoutValue}
                </button>
                <button value = "true" onClick={e =>setChoosingWorkoutToSaveTo(e.target.value)}>
                    Save {props.workoutValue}
                </button>
            </div>
        )
    else if(choosingWorkoutToLoad)
        return (
            <div className = 'save-load-container'>
                <div className='save-load-inner'>
                    <button style = {saveLoadBackButton} value = 'false' 
                        onClick = {() => setChoosingWorkoutToLoad(false)}>Back
                    </button>
                    {theLoadButtons}
                </div>
            </div>
            
        )
    else if(choosingWorkoutToSaveTo){
        return(
            <div className ='save-load-container'>
                <div className='save-load-inner'>
                    <input className = 'workout-name-input' placeholder="Enter the name of the workout"
                        type="text" value={workoutName} onChange = {(e)=> setWorkoutName(e.target.value)}>
                    </input>
                    <button style = {saveLoadBackButton} value = 'false' 
                        onClick = {() => setChoosingWorkoutToSaveTo(false)}>Back
                    </button>
                    {theSaveButtons}
                </div>
            </div>
        )
    }
}
