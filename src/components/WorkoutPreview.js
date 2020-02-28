import React, {useState, useEffect} from 'react'
import'../styles/workoutPreview.css'
export default function WorkoutPreview(props) {
    const[preview, setPreview] = useState ([])
    function thePreview() {
        let arr = []
        for(let i =  0; i < props.exercisesPreview.length; i ++){
            arr[i] = 
            <>
                <div className = "grid-3" key = {i}>
                    <p className="grid-item">Exercise: {props.exercisesPreview[i]}</p>
                    <p className="grid-item">Active Time: {props.activePeriodsPreview[i]} seconds</p>
                    <p className="grid-item">Rest Time: {props.restPeriodsPreview[i]} seconds</p>
                </div>
            </>
        }
        setPreview(arr) 
    }


    useEffect(()=>{
        thePreview()
    },[props.exercisesPreview])


    return (
        <>{preview}</>
    )
}
