import React from 'react'
import '../styles/exercises.css'
export default function Exercise(props) {

        return (
            <div className="exercise-card">
                <p>{props.exerciseName}</p>
            </div>
        )

}
