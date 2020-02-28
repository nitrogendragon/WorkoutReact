import React, {useState,useEffect} from 'react'
import WorkoutPreview from './WorkoutPreview'
import '../styles/workoutCreation.css'
// setExerciseList = {setExerciseList}
// setRestPeriods = {setRestPeriods}
// setActivePeriods = {setActivePeriods}
// setTotalSets = {setTotalSets}
// exerciseList = {exerciseList}
// restPeriods = {restPeriods}
// activePeriods = {activePeriods}
// totalSets = {totalSets}
export default function CreateWorkout(props) {
    const [restPeriodTemp,setRestPeriodTemp] = useState()
    const [activePeriodTemp,setActivePeriodTemp] = useState()
    const [exerciseTemp,setExerciseTemp] = useState("")
    const [exercisesPreview, setExercisesPreview] = useState([])
    const [restPeriodsPreview, setRestPeriodsPreview] = useState([])
    const [activePeriodsPreview, setActivePeriodsPreview] = useState([])
    
    const workoutContainer = {
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    }


    const workoutButtonsContainer = {
        display: "flex",
        marginTop: "10px",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    }


    useEffect(()=>{
        console.log(props.totalSets)
    },[props.totalSets])


    function handleKeyDown(e, val){
        if(e.key === "Enter" && val === "add"){
            handleUpdateWorkout(val)
            
        }
    }
    function handleUpdateWorkout(value){
        if(value==="add"){
            if(restPeriodTemp !== 0 && activePeriodTemp !== 0 && exerciseTemp !== ""
                && exerciseTemp && restPeriodTemp && activePeriodTemp 
            ){
                props.setRestPeriods((prev)=> [...prev, restPeriodTemp])
                props.setActivePeriods((prev)=> [...prev, activePeriodTemp])
                props.setExerciseList((prev)=> [...prev, exerciseTemp])
                setRestPeriodTemp(1)
                setActivePeriodTemp(1)
            }
        }
        else if(value==="remove"){
            if(props.exerciseList.length>0)
            {
                let tempArray = props.exerciseList
                tempArray.pop()
                props.setExerciseList(tempArray)
            }
            
        }
        else if(value==="clear"){
            props.setExerciseList([])
            props.setRestPeriods([])
            props.setActivePeriods([])
        }

    }


    useEffect(()=>{
        setExercisesPreview(props.exerciseList.map((val)=> val + " "))
        setRestPeriodsPreview(props.restPeriods.map((val)=> val + " "))
        setActivePeriodsPreview(props.activePeriods.map((val)=> val + " "))
    },[props.exerciseList])


    return (
        <>
            <div style={workoutContainer}>
                <h1>Workout Creation Station</h1>
                <p className="bigger-text">Set the number of sets you want to do</p>
                <input 
                    type = "number" 
                    className="rounded-big-input"
                    value = {props.totalSets}
                    onChange={e => e.target.value > 0 ? 
                        props.setTotalSets(e.target.value) : 
                        props.setTotalSets(1)    
                    }
                />
                <p className="bigger-text">Set the name of the exercise</p>
                <input 
                    type = "text" 
                    className="rounded-big-input"
                    value = {exerciseTemp}
                    onChange={e => setExerciseTemp(e.target.value)
                    }
                    onKeyDown={e => handleKeyDown(e,"add")}
                />
                <p className="bigger-text">Set the rest period</p>
                <input 
                    type = "number" 
                    className="rounded-big-input"
                    value = {restPeriodTemp}
                    onChange={e => e.target.value > 0 ? 
                        setRestPeriodTemp(e.target.value) : 
                        setRestPeriodTemp(1)    
                    }
                    onKeyDown={e => handleKeyDown(e,"add")}
                />
                <p className="bigger-text">Set the active period</p>
                <input 
                    type = "number" 
                    className="rounded-big-input"
                    value = {activePeriodTemp}
                    onChange={e => e.target.value > 0 ? 
                        setActivePeriodTemp(e.target.value) : 
                        setActivePeriodTemp(1) 
                        
                    }
                    onKeyDown={e => handleKeyDown(e,"add")}
                />
            
                <div style={workoutButtonsContainer}>
                    <button onClick={e => handleUpdateWorkout(e.target.value)} value = "add">Add Exercise</button>
                    <button onClick={e => handleUpdateWorkout(e.target.value)} value= "remove">Remove Last</button>
                    <button onClick={e => handleUpdateWorkout(e.target.value)} value = "clear">Clear All</button>
                </div>     
                <WorkoutPreview 
                    exercisesPreview = {exercisesPreview}
                    restPeriodsPreview = {restPeriodsPreview}
                    activePeriodsPreview = {activePeriodsPreview}
                />
            </div>
        </>
    )
}
