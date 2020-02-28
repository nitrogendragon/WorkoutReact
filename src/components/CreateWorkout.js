import React, {useState,useEffect} from 'react'
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
    const [exerciseTemp,setExerciseTemp] = useState()
    
    
    const workoutContainer = {
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        
       
    }
    const workoutPreviewContainer = {

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
        console.log(value)
        console.log("exerciseTemp is: " + exerciseTemp)
        console.log("activePeriodTemp is: " + activePeriodTemp)
        console.log("restPeriodTemp is: " + restPeriodTemp)
        if(value==="add"){
            if(restPeriodTemp !== 0 && activePeriodTemp !== 0 && exerciseTemp !== ""
                && exerciseTemp && restPeriodTemp && activePeriodTemp 
            ){
                props.setRestPeriods((prev)=> [...prev, restPeriodTemp])
                props.setActivePeriods((prev)=> [...prev, activePeriodTemp])
                props.setExerciseList((prev)=> [...prev, exerciseTemp])
                setRestPeriodTemp(1)
                setActivePeriodTemp(1)
                setExerciseTemp("")
                console.log("We succcesfully added an exercise")
            }
            else{
                console.log("We did not clear the requirements to add")
            }
        }
        else if(value==="remove"){
            if(props.exerciseList.length>0)
            {
                let tempArray = props.exerciseList
                tempArray.pop()
                props.setExerciseList(tempArray)

            console.log("we tried removing")
            }
            else{
                console.log("There isn't anything left to remove")
            }
        }
        else if(value==="clear"){
            console.log("we tried clearing")
            props.setExerciseList([])
            props.setRestPeriods([])
            props.setActivePeriods([])
        }
        else{
            console.log("We did nothing")
        }
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
                    onChange={e => e.target.value !== "" ? 
                        setExerciseTemp(e.target.value) : 
                        setExerciseTemp("")  
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
            </div>
            <div style={workoutButtonsContainer}>
                <button onClick={e => handleUpdateWorkout(e.target.value)} value = "add">Add Exercise</button>
                <button onClick={e => handleUpdateWorkout(e.target.value)} value= "remove">Remove Last</button>
                <button onClick={e => handleUpdateWorkout(e.target.value)} value = "clear">Clear All</button>
            </div>
            <div style={workoutPreviewContainer}>
                <p>{props.exerciseList}</p>
                <p>{props.activePeriods}</p>
                <p>{props.restPeriods}</p>
            </div>
        </>
    )
}
