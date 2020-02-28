import React, {useState,useEffect} from 'react'
import '../styles/workoutCreation.css'
import '../styles/workoutPreview.css'
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
    const[preview, setPreview] = useState ([])
    
    function thePreview() {
        let arr = []
        for(let i =  0; i < props.exerciseList.length; i ++){
            arr[i] = 
            <>
                <div className = "grid-3" key = {i}>
                    <p className="grid-item">Exercise: {props.exerciseList[i]}</p>
                    <p className="grid-item">Active Time: {props.activePeriods[i]} seconds</p>
                    <p className="grid-item">Rest Time: {props.restPeriods[i]} seconds</p>
                </div>
            </>
        }
        setPreview(arr) 
        console.log(arr)
    }


    useEffect(()=>{
        console.log("we should be updating our thingy")
        setTimeout(()=>{

            handleUpdateWorkout("")
        },50)
    },[props.exerciseList])
    
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
                tempArray = props.activePeriods
                tempArray.pop()
                props.setActivePeriods(tempArray)
                tempArray = props.restPeriods
                tempArray.pop()
                props.setRestPeriods(tempArray)

            }
            
        }
        else if(value==="clear"){
            props.setExerciseList([])
            props.setRestPeriods([])
            props.setActivePeriods([])
        }
        setTimeout(()=>{

            thePreview()
        },50)

    }


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
                <>{preview}</>
            </div>
        </>
    )
}
