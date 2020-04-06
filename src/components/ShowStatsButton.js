import React from 'react'

export default function ShowStatsButton(props) {
    function handleShowStats(){
        props.setShowStats(!props.showStats)
    }
    return (
        <button style={{zIndex:"1"}} onClick={handleShowStats}>{props.showStats? 'Return' : 'Statistics'}</button>
    )
}
