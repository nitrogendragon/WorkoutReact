import React, {useState,useEffect} from 'react'
import Exercise from './Exercise'
import '../styles/exercises.css'
export default function Exercises(props) {
    const [exercises, setExercises] = useState([])
    const [makeExercises, setMakeExercises] = useState(true)
    const exampleExercises = ["pushup", "situp", "planche", "crabwalk"]


    function createExerciseList(exercises){
        let i  = props.exercisesCompleted
        let tempArray = []
        while(i< exercises.length ){
            tempArray[i] = <Exercise highlighted = {false} exerciseName = {exercises[i]}/>
            i++
        }
        setExercises(tempArray)
    }

    useEffect(()=>{
        createExerciseList(exampleExercises)
    },[props.exercisesCompleted])


    if(makeExercises){
        setMakeExercises(false)
        createExerciseList(exampleExercises)
    }


    return (
        <div className ="exercises-container">
            {exercises}
        </div>
    )
}
