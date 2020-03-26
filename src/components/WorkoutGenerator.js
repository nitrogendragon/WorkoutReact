import React,{useState, useEffect} from 'react'

export default function WorkoutGenerator(props) {
    const [showWorkoutGenerator, setShowWorkoutGenerator] = useState(false)
    const GeneratorData = require('../../src/generator-data.json')
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
                showWorkoutGenerator? <div>it's working</div> :
                <></>
            }
        </div>
    )
}
