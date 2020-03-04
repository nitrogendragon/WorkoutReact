import React, {useState, useEffect} from 'react'
import '../styles/workoutCreation.css'
export default function WorkoutSaver(props) {
    const exercisesKey = "_exercises"
    const activePeriodsKey = "_activePeriods"
    const restPeriodsKey = "_restPeriods"
    const [chooseWorkoutToSaveTo,setChooseWorkoutToSaveTo] = useState(true)
    const [chooseWorkoutToLoad,setChooseWorkoutToLoad] = useState(false)
    // const LOCAL_STORAGE_KEY = 'savedWorkouts'

    const workoutButtonsContainer = {
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    }


    function handleLoadWorkout(LOCAL_STORAGE_KEY){
        const exercises = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY+ exercisesKey))
        props.setExerciseList(exercises)
        const restPeriods = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY + restPeriodsKey))
        props.setRestPeriods(restPeriods)    
        const activePeriods = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY + activePeriodsKey))
        props.setActivePeriods(activePeriods)
        
    }


    function handleSaveWorkout(LOCAL_STORAGE_KEY) {
        localStorage.setItem(LOCAL_STORAGE_KEY + exercisesKey, JSON.stringify(props.exerciseList))
        localStorage.setItem(LOCAL_STORAGE_KEY + restPeriodsKey, JSON.stringify(props.restPeriods))
        localStorage.setItem(LOCAL_STORAGE_KEY + activePeriodsKey, JSON.stringify(props.activePeriods))
    }


    if(chooseWorkoutToSaveTo)
        return (
            <div style={workoutButtonsContainer} >
                <button value = {props.workoutValue} onClick={e => handleLoadWorkout(e.target.value)}>
                    Load {props.workoutValue}
                </button>
                <button value = {props.workoutValue} onClick={e => handleSaveWorkout(e.target.value)}>
                    Save {props.workoutValue}
                </button>
            </div>
        )
}
