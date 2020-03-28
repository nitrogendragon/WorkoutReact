import React from 'react'
import '../styles/workoutGenerator.css'
export default function ModifierSlider(props) {


    function handleChange(e){
            props.setModifierSliderValue(e.target.value)
    }


    return (
        <div className = "flex-container">
        <p>{props.modifierExerciseGroupName} Modifier: {props.modifierSliderValue}</p>
        <div className = "slider">
            <input 
                id="activeSliderValue" 
                type="range" 
                min=".1" max="5" 
                value={props.modifierSliderValue} 
                onChange={e =>handleChange(e)}
                step=".1"
            />
        </div>
        </div>
    )
}
