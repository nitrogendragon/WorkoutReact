import React from 'react'
import '../styles/workoutPreview.css'
export default function PreviewButtons(props) {
    return(
        <div className = "flex-item-container">
                    <div className = "flex-item">
                        <p >Exercise: {props.exerciseList[props.i]}</p>
                        <p >Active Time: {props.activePeriods[props.i]} seconds</p>
                        <p >Rest Time: {props.restPeriods[props.i]} seconds</p>
                        <div className ="preview-buttons-container">
                            <button 
                                onClick ={e => props.handleUpdateWorkout(e.target.value, e.target.id)} 
                                value ="replaceAtIndex" 
                                id = {props.i}>
                                Replace
                            </button>
                            <button 
                                onClick ={e => props.handleUpdateWorkout(e.target.value, e.target.id)} 
                                value ="removeAtIndex" 
                                id = {props.i}>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
    )
    
}
