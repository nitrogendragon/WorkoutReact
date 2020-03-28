import React, { useState, useEffect } from "react"
import '../styles/workoutGenerator.css'
import TotalExercisesSetter from './TotalExercisesSetter'
export default function TotalExercises(props) {

    useEffect(()=>{
        console.log('updating our total exercises')
        let total = parseInt(props.chestTotalExercises) + parseInt(props.absTotalExercises) + 
            parseInt(props.backTotalExercises)
            + parseInt(props.armsTotalExercises) + parseInt(props.legsTotalExercises)
            console.log('the total is: ' + total)
        if(total > 1){
            props.setTotalExercises(()=> total)
        }
    },[props.chestTotalExercises, props.absTotalExercises,props.backTotalExercises,props.armsTotalExercises,
        props.legsTotalExercises])


    return (
        <div flex-container>
            <p>Total Exercises: {props.totalExercises}</p>
            {props.chestChecked ?
                <TotalExercisesSetter 
                    exerciseGroupName = {'Chest'}
                    exerciseGroupTotalExercises = {props.chestTotalExercises} 
                    setExerciseGroupTotalExercises = {props.setChestTotalExercises}
                /> :
                <></>
            }
            {props.armsChecked ?
                <TotalExercisesSetter 
                    exerciseGroupName = {'Arms'}
                    exerciseGroupTotalExercises = {props.armsTotalExercises} 
                    setExerciseGroupTotalExercises = {props.setArmsTotalExercises}
                /> :
                <></>
            }
            {props.legsChecked ?
                <TotalExercisesSetter 
                    exerciseGroupName = {'Legs'}
                    exerciseGroupTotalExercises = {props.legsTotalExercises} 
                    setExerciseGroupTotalExercises = {props.setLegsTotalExercises}
                /> :
                <></>
            }
            {props.absChecked ?
                <TotalExercisesSetter 
                    exerciseGroupName = {'Abs'}
                    exerciseGroupTotalExercises = {props.absTotalExercises}  
                    setExerciseGroupTotalExercises = {props.setAbsTotalExercises}
                /> :
                <></>
            }
            {props.backChecked ?
                <TotalExercisesSetter 
                    exerciseGroupName = {'Back'}
                    exerciseGroupTotalExercises = {props.backTotalExercises} 
                    setExerciseGroupTotalExercises = {props.setBackTotalExercises}
                /> :
                <></>
            }
        </div>
    )
}
