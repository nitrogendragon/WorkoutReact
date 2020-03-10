import React, {useState,useEffect} from 'react'
import Exercise from './Exercise'
import '../styles/exercises.css'
export default function Exercises(props) {



    function createExerciseList(exercises){
        let i  = props.exercisesCompleted
        let tempArray = []
        while(i< exercises.length ){
            tempArray[i] = <Exercise key ={i} highlighted = {false} exerciseName = {exercises[i]}/>
            i++
        }
        props.setExercises(tempArray)
    }

    useEffect(()=>{
        createExerciseList(props.exerciseList)
    },[props.exercisesCompleted])


    useEffect(()=>{
        if(!props.showCreateWorkout){
            createExerciseList(props.exerciseList)
        }
    },[props.showCreateWorkout])


    return (
        <div className ="exercises-container">
            {props.exercises}
        </div>
    )
}
