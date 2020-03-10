import React from 'react'
import StatBar from './StatBar'
export default function Stats(props) {
    return (
        <div className="divider">
            <StatBar 
                exerciseList = {props.exerciseList}
                activePeriods = {props.activePeriods}
            />
        </div>
    )
}
