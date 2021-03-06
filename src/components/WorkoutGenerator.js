import React,{useState, useEffect} from 'react'
import '../styles/workoutGenerator.css'
import ExerciseTypes from './ExerciseTypes'
import DurationRanges from './DurationRanges'
import TotalExercises from './TotalExercises'
import WorkoutBalance from './WorkoutBalance'
import GeneratorData from '../../src/generator-data.json'
export default function WorkoutGenerator(props) {
    const [showWorkoutGenerator, setShowWorkoutGenerator] = useState(false)
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
    const [chestModifier, setChestModifier] = useState(1)
    const [armsModifier, setArmsModifier] = useState(1)
    const [legsModifier, setLegsModifier] = useState(1)
    const [backModifier, setBackModifier] = useState(1)
    const [absModifier, setAbsModifier] = useState(1)
    const [restSliderValue, setRestSliderValue] = useState(1)
    const [finalRestSliderValue, setFinalRestSliderValue] = useState(1)
    const [activeSliderValue, setActiveSliderValue] = useState(15)
    const [totalExercises, setTotalExercises] = useState(5)
    const [genBool1, setGenBool1] = useState(true)
    const [genBool2, setGenBool2] = useState(false)
    const [genBool3, setGenBool3] = useState(false)
    const [genBool4, setGenBool4] = useState(false)
    const genData = [...GeneratorData]

    useEffect(() => {
        console.log(backModifier)
    }, [backModifier])

    function updateShowGenerator(){
        setShowWorkoutGenerator(() =>!showWorkoutGenerator)
    }


    function handleTab(i){
        i=== 1 ? setGenBool1(true) : setGenBool1(false)
        i=== 2 ? setGenBool2(true) : setGenBool2(false)
        i=== 3 ? setGenBool3(true) : setGenBool3(false)
        i=== 4 ? setGenBool4(true) : setGenBool4(false)
    }


    function getExerciseFromData(exerciseGroupDataIndex){
        let tempExerciseHolder = ""
        exerciseGroupDataIndex === 0 ?
        tempExerciseHolder = (genData[0].chest[0].exercises[Math.floor(Math.random() * 
            genData[0].chest[0].exercises.length)].toString())
        :
        exerciseGroupDataIndex === 1 ?
        tempExerciseHolder = (genData[0].arms[0].exercises[Math.floor(Math.random() * 
            genData[0].arms[0].exercises.length)].toString())
        :
        exerciseGroupDataIndex === 2 ?
        tempExerciseHolder = (genData[0].legs[0].exercises[Math.floor(Math.random() * 
            genData[0].legs[0].exercises.length)].toString())
        :
        exerciseGroupDataIndex === 3 ?
        tempExerciseHolder = (genData[0].back[0].exercises[Math.floor(Math.random() * 
            genData[0].back[0].exercises.length)].toString())
        :
        exerciseGroupDataIndex === 4 ?
        tempExerciseHolder = (genData[0].abs[0].exercises[Math.floor(Math.random() * 
            genData[0].abs[0].exercises.length)].toString())
        :
        console.log('Something probably just went wrong?')
        return tempExerciseHolder
    }


    function generateWorkout(){
        console.log('generator started running')
        let tempExercises = []
        let tempExercise = ""
        let tempActiveDurs = []
        let tempRestDurs = []
        let i = 0
        
        for(i; i<totalExercises;i++){
            if(chestChecked && i < chestTotalExercises) 
            {
                tempExercise = getExerciseFromData(0)
                
                tempExercises = [...tempExercises, tempExercise]
                tempActiveDurs = [...tempActiveDurs, activeSliderValue * chestModifier]
                tempRestDurs = [...tempRestDurs, restSliderValue]
            }
            if(armsChecked && i < armsTotalExercises) 
            {
                tempExercise = getExerciseFromData(1)
                tempExercises = [...tempExercises, tempExercise]
                tempActiveDurs = [...tempActiveDurs, activeSliderValue * armsModifier]
                tempRestDurs = [...tempRestDurs, restSliderValue]
            }
            if(legsChecked && i < legsTotalExercises) 
            {
                tempExercise = getExerciseFromData(2)
                tempExercises = [...tempExercises, tempExercise] 
                tempActiveDurs = [...tempActiveDurs, activeSliderValue * legsModifier]         
                tempRestDurs = [...tempRestDurs, restSliderValue]         
            }
            if(backChecked && i < backTotalExercises) 
            {
                tempExercise = getExerciseFromData(3)
                tempExercises = [...tempExercises, tempExercise]
                tempActiveDurs = [...tempActiveDurs, activeSliderValue * backModifier]
                tempRestDurs = [...tempRestDurs, restSliderValue]
            }
            if(absChecked && i < absTotalExercises) 
            {
                tempExercise = getExerciseFromData(4)
                tempExercises = [...tempExercises, tempExercise]
                tempActiveDurs = [...tempActiveDurs, activeSliderValue * absModifier]
                tempRestDurs = [...tempRestDurs, restSliderValue]
            }
        }
        tempRestDurs[tempRestDurs.length - 1] = parseInt(finalRestSliderValue)

        props.setActivePeriods(()=> tempActiveDurs)
        props.setRestPeriods(()=> tempRestDurs)
        props.setExerciseList(()=> tempExercises)
        updateShowGenerator()
    }




    return (
        <div>
            <button onClick={e => updateShowGenerator()}>Generate Workout</button>
            {
                showWorkoutGenerator? 
                    <div className="absolute-container">
                        <div className="inner-container">
                            <div className = "generator-nav">
                            <button onClick={e => handleTab(1)}>Types of exercises</button>
                            <button onClick={e => handleTab(2)}>Duration Ranges</button>
                            <button onClick={e => handleTab(3)}>Total Exercises</button>
                            <button onClick={e => handleTab(4)}> Workout Balance</button>
                            <button onClick={e => generateWorkout()}> Create </button>
                            </div>
                            <div className="content">
                                {
                                    genBool1 ? 
                                    <ExerciseTypes 
                                        chestChecked = {chestChecked} setChestChecked = {setChestChecked} 
                                        armsChecked = {armsChecked} setArmsChecked = {setArmsChecked}
                                        legsChecked = {legsChecked} setLegsChecked = {setLegsChecked}
                                        absChecked = {absChecked} setAbsChecked = {setAbsChecked}
                                        backChecked = {backChecked} setBackChecked = {setBackChecked} 
                                    />
                                    :
                                    genBool2 ? 
                                    <DurationRanges  
                                        activeSliderValue = {activeSliderValue} setActiveSliderValue = {setActiveSliderValue}
                                        restSliderValue = {restSliderValue} setRestSliderValue = {setRestSliderValue}
                                        finalRestSliderValue = {finalRestSliderValue} setFinalRestSliderValue = {setFinalRestSliderValue}/> :
                                    genBool3 ? 
                                    <TotalExercises
                                        totalExercises = {totalExercises} setTotalExercises = {setTotalExercises}
                                        chestChecked = {chestChecked} chestTotalExercises = {chestTotalExercises} setChestTotalExercises = {setChestTotalExercises}
                                        armsChecked = {armsChecked} armsTotalExercises = {armsTotalExercises} setArmsTotalExercises = {setArmsTotalExercises}
                                        legsChecked = {legsChecked} legsTotalExercises = {legsTotalExercises} setLegsTotalExercises = {setLegsTotalExercises}
                                        absChecked = {absChecked} absTotalExercises = {absTotalExercises} setAbsTotalExercises = {setAbsTotalExercises}
                                        backChecked = {backChecked} backTotalExercises = {backTotalExercises} setBackTotalExercises = {setBackTotalExercises}

                                    />
                                    :
                                    genBool4 ? 
                                    <WorkoutBalance
                                        absChecked = {absChecked} absModifier = {absModifier} setAbsModifier = {setAbsModifier}
                                        armsChecked = {armsChecked} armsModifier = {armsModifier} setArmsModifier = {setArmsModifier}
                                        legsChecked = {legsChecked} legsModifier = {legsModifier} setLegsModifier = {setLegsModifier}
                                        chestChecked = {chestChecked} chestModifier = {chestModifier} setChestModifier = {setChestModifier}
                                        backChecked = {backChecked} backModifier = {backModifier} setBackModifier = {setBackModifier}
                                    />
                                    :
                                    <p>Click an option to begin modifying your generated workout</p>
                                }
                            </div>
                                <button style = {{width:"50%", marginTop:'10px'}} onClick={e => updateShowGenerator()}>Back</button>
                        </div>
                    </div> 
                
                :
                <></>
            }
        </div>
    )
}
