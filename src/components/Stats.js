import React from 'react'
import StatBar from './StatBar'
export default function Stats(props) {
    return (
        <div className="divider" style={{display: props.showStats ? 'grid' : 'none'}}>
            <StatBar 
                exerciseList = {props.exerciseList}
                activePeriods = {props.activePeriods}
                index = {1}
            />
        </div>
    )
}
