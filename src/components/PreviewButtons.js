import React from 'react'
import '../styles/workoutPreview.css'
export default function PreviewButtons(props) {
    return(
        <div className = {props.isHidden ? "preview-buttons-container" : "preview-buttons-container hide"}>
            <button 
                onClick ={e => props.handleUpdateWorkout(e.target.value, e.target.id)} 
                value ="replaceAtIndex" 
                id = {props.i}>
                Replace {props.isHidden.toString()}
            </button>
            <button 
                onClick ={e => props.handleUpdateWorkout(e.target.value, e.target.id)} 
                value ="removeAtIndex" 
                id = {props.i}>
                Remove
            </button>
        </div>
    )
    
}
