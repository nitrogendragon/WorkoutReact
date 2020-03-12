import React, {useEffect} from 'react'
import '../styles/stats.css'
export default function StatBar(props) {
    

    const bar ={
        width : '30px',
        backgroundColor : 'green',
        transition : 'height 1000ms ease-in-out',
        height : props.activePeriods[props.index] >= 1 ? props.activePeriods[props.index].toString() + 'px' : '0px'
    }


    return (
        <div className = "bar-container">
            <div style = {bar}></div>
        </div>
    )
}
