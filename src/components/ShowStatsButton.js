import React from 'react'

export default function ShowStatsButton(props) {
    function handleShowStats(){
        props.setShowStats(!props.showStats)
        console.log(props.showStats)
    }
    return (
        <button onClick={handleShowStats}>{props.showStats? 'Return' : 'Statistics'}</button>
    )
}