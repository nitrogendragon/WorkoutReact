import React,{useState, useEffect} from 'react'
import '../styles/workoutGenerator.css'
export default function WorkoutGenerator(props) {
    const [showWorkoutGenerator, setShowWorkoutGenerator] = useState(false)
    const GeneratorData = require('../../src/generator-data.json')
    const bool1 = false
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
                                    bool1 ? <p>bool1</p> :
                                    bool2 ? <p>bool2</p> :
                                    bool2 ? <p>bool2</p> :
                                    bool2 ? <p>bool2</p> :
                                    <p>Click an option to begin modifying your generated workout</p>
                                }
                            </div>
                        </div>
                    </div> 
                
                :
                <></>
            }
        </div>
    )
}
