import React from 'react'

export default function TotalExercisesSetter(props) {
    return (
        <div>
            <p>{props.exerciseGroupName} exercises</p>
            <input 
                    type = "number" 
                    className="rounded-big-input"
                    value = {props.exerciseGroupTotalExercises}
                    onChange={e => props.setExerciseGroupTotalExercises(e.target.value >= 1 ? e.target.value : 1) 
                    }
            />
        </div>
    )
}
