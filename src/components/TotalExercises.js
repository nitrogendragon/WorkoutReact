import React, { useState, useEffect } from "react"
import '../styles/workoutGenerator.css'
import TotalExercisesSetter from './TotalExercisesSetter'
export default function TotalExercises(props) {
    const [updateTotalExercises, setUpdateTotalExercises] = useState(false)

    function handleUpdateTotalExercises(){
        console.log('updating our total exercises')
        let total = parseInt(props.chestTotalExercises) + parseInt(props.absTotalExercises) + 
            parseInt(props.backTotalExercises)
            + parseInt(props.armsTotalExercises) + parseInt(props.legsTotalExercises)
            console.log('the total is: ' + total)
        if(total >= 0){
            props.setTotalExercises(()=> total)
        }
    }


    useEffect(()=>{
        !props.chestChecked ? props.setChestTotalExercises(0) : props.setChestTotalExercises(1)
        !props.armsChecked ? props.setArmsTotalExercises(0) : props.setArmsTotalExercises(1)
        !props.absChecked ? props.setAbsTotalExercises(0) : props.setAbsTotalExercises(1)
        !props.legsChecked ? props.setLegsTotalExercises(0) : props.setLegsTotalExercises(1)
        !props.backChecked ? props.setBackTotalExercises(0) : props.setBackTotalExercises(1)
        setUpdateTotalExercises(true)
    },[props.chestChecked, props.absChecked, props.armsChecked, props.legsChecked, props.backChecked])


    useEffect(()=>{
        if(updateTotalExercises){
            setUpdateTotalExercises(false)
            handleUpdateTotalExercises()
        }
    },[updateTotalExercises])

    useEffect(()=>{
        handleUpdateTotalExercises()
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
