import React, {useState,useEffect} from 'react'
import Exercise from './Exercise'
import '../styles/exercises.css'
export default function Exercises(props) {



    function createExerciseList(exercises){
        let i  = props.exercisesCompleted
        let tempArray = []
        while(i< exercises.length ){
            tempArray[i] = <Exercise highlighted = {false} exerciseName = {exercises[i]}/>
            i++
        }
        props.setExercises(tempArray)
    }

    useEffect(()=>{
        createExerciseList(props.exerciseList)
    },[props.exercisesCompleted])


    if(props.makeExercises){
        props.setMakeExercises(false)
        createExerciseList(props.exerciseList)
    }


    return (
        <div className ="exercises-container">
            {props.exercises}
        </div>
    )
}
