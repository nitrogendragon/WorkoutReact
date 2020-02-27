import React, {useState,useEffect} from 'react'
import Exercise from './Exercise'
import '../styles/exercises.css'
export default function Exercises(props) {
    const [exercises, setExercises] = useState([])
    const [makeExercises, setMakeExercises] = useState(true)
    const exampleExercises = ["pushup", "situp", "planche", "crabwalk"]


    function createExerciseList(exercises){
        let i  = 0
        let tempArray = []
        while(i< exercises.length ){
            tempArray[i] = <Exercise exerciseName = {exercises[i]}/>
            i++
        }
        setExercises(tempArray)
    }


    if(makeExercises){
        setMakeExercises(false)
        createExerciseList(exampleExercises)
    }


    useEffect(()=>{
        console.log(exercises)
    },[exercises])

    return (
        <div className ="exercises-container">
            {exercises}
        </div>
    )
}
