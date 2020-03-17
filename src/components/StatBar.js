import React, {useEffect} from 'react'
import '../styles/stats.css'
import { findRenderedComponentWithType } from 'react-dom/test-utils'
export default function StatBar(props) {
    

    const bar ={
        width : '98px',
        backgroundColor : 'green',
        backgroundImage: 'linear-gradient( rgb(35, 59, 35),darkgreen,green,lightgreen, whitesmoke)',
        transition : 'height 1000ms ease-in-out',
        borderRadius : '10px 10px 0px 0px',
        height : props.activePeriod >= 1 ? props.activePeriod.toString() + 'px' : '0px'
    }

    const barCount={
        color: 'white',

    }



    return (
        <>
            <div className = "bar-container">
                <div style = {bar}>
                    <div className = "bar-line b1"></div>
                    <div className = "bar-line b2"></div>
                    <div className = "bar-line b3"></div>
                    <div className = "bar-line b4"></div>
                    <div className = "bar-line b5"></div>
                </div>
            <div className = "bar-label">{props.exerciseName}</div>
            </div>
        </>
    )
}
