import React from 'react'
import '../styles/exercises.css'
export default function Exercise(props) {
    if(props.highlighted)
    {
    return (
        <div className="exercise-card">
            <p>{props.exerciseName}</p>
        </div>
    )
    }
    else{
        return (
            <div className="exercise-card">
                <p>{props.exerciseName}</p>
            </div>
        )
    }
}
