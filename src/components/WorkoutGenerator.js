import React,{useState, useEffect} from 'react'
import '../styles/workoutGenerator.css'
import ExerciseTypes from './ExerciseTypes'
import DurationRanges from './DurationRanges'
import TotalExercises from './TotalExercises'
export default function WorkoutGenerator(props) {
    const [showWorkoutGenerator, setShowWorkoutGenerator] = useState(false)
    const [activeSliderValue, setActiveSliderValue] = useState(15)
    const [chestChecked, setChestChecked] = useState(true)
    const [armsChecked, setArmsChecked] = useState(true)
    const [legsChecked, setLegsChecked] = useState(true)
    const [backChecked, setBackChecked] = useState(true)
    const [absChecked, setAbsChecked] = useState(true)
    const [chestTotalExercises, setChestTotalExercises] = useState(1)
    const [armsTotalExercises, setArmsTotalExercises] = useState(1)
    const [legsTotalExercises, setLegsTotalExercises] = useState(1)
    const [backTotalExercises, setBackTotalExercises] = useState(1)
    const [absTotalExercises, setAbsTotalExercises] = useState(1)
    const [restSliderValue, setRestSliderValue] = useState(1)
    const [totalExercises, setTotalExercises] = useState(1)
    const GeneratorData = require('../../src/generator-data.json')
    const bool1 = false
    const bool2 = false
    const bool3 = true
    const bool4 = false

    function updateShowGenerator(){
        setShowWorkoutGenerator(() =>!showWorkoutGenerator)
    }



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
                                    bool2 ? 
                                    <DurationRanges  
                                        activeSliderValue = {activeSliderValue} setActiveSliderValue = {setActiveSliderValue}
                                        restSliderValue = {restSliderValue} setRestSliderValue = {setRestSliderValue}/> :
                                    bool3 ? 
                                    <TotalExercises
                                        totalExercises = {totalExercises} setTotalExercises = {setTotalExercises}
                                        chestChecked = {chestChecked} chestTotalExercises = {chestTotalExercises} setChestTotalExercises = {setChestTotalExercises}
                                        armsChecked = {armsChecked} armsTotalExercises = {armsTotalExercises} setArmsTotalExercises = {setArmsTotalExercises}
                                        legsChecked = {legsChecked} legsTotalExercises = {legsTotalExercises} setLegsTotalExercises = {setLegsTotalExercises}
                                        absChecked = {absChecked} absTotalExercises = {absTotalExercises} setAbsTotalExercises = {setAbsTotalExercises}
                                        backChecked = {backChecked} backTotalExercises = {backTotalExercises} setBackTotalExercises = {setBackTotalExercises}

                                    />
                                    :
                                    bool4 ? <p>bool2</p> :
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
