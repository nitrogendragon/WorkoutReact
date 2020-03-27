import React,{useState, useEffect} from 'react'
import '../styles/workoutGenerator.css'
import ExerciseTypes from './ExerciseTypes'
import DurationRanges from './DurationRanges'
export default function WorkoutGenerator(props) {
    const [showWorkoutGenerator, setShowWorkoutGenerator] = useState(false)
    const [chestChecked, setChestChecked] = useState(false)
    const [armsChecked, setArmsChecked] = useState(false)
    const [legsChecked, setLegsChecked] = useState(false)
    const [backChecked, setBackChecked] = useState(false)
    const [absChecked, setAbsChecked] = useState(false)
    const GeneratorData = require('../../src/generator-data.json')
    const bool1 = true
    const bool2 = false
    const bool3 = false
    const bool4 = false
    const bool5 = false
    function updateShowGenerator(){
        setShowWorkoutGenerator(() =>!showWorkoutGenerator)
    }

    useEffect(()=>{
        console.log(showWorkoutGenerator)
    },[showWorkoutGenerator])


    return (
        <div>
            <button onClick={e => updateShowGenerator()}>Generate Workout</button>
            {
                showWorkoutGenerator? 
                    <div className="absolute-container">
                        <div className="inner-container">
                            <div className = "generator-nav">
                            <button>Types of exercises</button>
                            <button>Duration Ranges</button>
                            <button>Total Exercises</button>
                            <button> Workout Balance</button>
                            <button> Create </button>
                            </div>
                            <div className="content">
                                {
                                    bool1 ? 
                                    <ExerciseTypes 
                                        chestChecked = {chestChecked} setChestChecked = {setChestChecked} 
                                        armsChecked = {armsChecked} setArmsChecked = {setArmsChecked}
                                        legsChecked = {legsChecked} setLegsChecked = {setLegsChecked}
                                        absChecked = {absChecked} setAbsChecked = {setAbsChecked}
                                        backChecked = {backChecked} setBackChecked = {setBackChecked} 
                                    />
                                    :
                                    bool2 ? <DurationRanges /> :
                                    bool2 ? <p>bool2</p> :
                                    bool2 ? <p>bool2</p> :
                                    <p>Click an option to begin modifying your generated workout</p>
                                }
                            </div>
                                <button onClick={e => updateShowGenerator()}>Back</button>
                        </div>
                    </div> 
                
                :
                <></>
            }
        </div>
    )
}
