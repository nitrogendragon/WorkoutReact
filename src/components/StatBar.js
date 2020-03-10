import React from 'react'
import '../styles/stats.css'
export default function StatBar(props) {
    return (
        <div className = "bar-container">
            <div className = "bar" style={{height: props.activePeriods[props.index]}}></div>
        </div>
    )
}
