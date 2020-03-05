import React from 'react'
import '../styles/homePage.css'
export default function HomePage(props) {


    function handleEnterApp(){
        props.setloggedIn(true)
        props.setFirstLoad(false)
        props.setShowCreateWorkout(true)
    }


    return (
        <div className="home-page">
            <button onClick={handleEnterApp} >Start App</button>
            <button onClick={handleEnterApp} >Start App</button>
            <button onClick={handleEnterApp} >Start App</button>
        </div>
    )
}
