import React, {useState,useEffect} from 'react'
import '../styles/workoutCreation.css'
import '../styles/workoutPreview.css'
import WorkoutSaver from './WorkoutSaver'
export default function CreateWorkout(props) {
    const [restPeriodTemp,setRestPeriodTemp] = useState(1)
    const [activePeriodTemp,setActivePeriodTemp] = useState(1)
    const [exerciseTemp,setExerciseTemp] = useState("")
    const [preview, setPreview] = useState ([])
    const [workoutNames, setWorkoutNames] = useState ([])

    function thePreview() {
        let arr = []
        for(let i =  0; i < props.exerciseList.length; i ++){
            arr[i] = 
            <div key = {i}>
                <div>
                    <div className = "flex-item">
                        <p >Exercise: {props.exerciseList[i]}</p>
                        <p >Active Time: {props.activePeriods[i]} seconds</p>
                        <p >Rest Time: {props.restPeriods[i]} seconds</p>
                        <div className ="preview-buttons-container">
                            <button 
                                onClick ={e => handleUpdateWorkout(e.target.value, e.target.id)} 
                                value ="replaceAtIndex" 
                                id = {i}>
                                Replace
                            </button>
                            <button 
                                onClick ={e => handleUpdateWorkout(e.target.value, e.target.id)} 
                                value ="removeAtIndex" 
                                id = {i}>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        }
        setPreview(arr) 
        // console.log(arr)
    }


    useEffect(()=>{
        // console.log("we should be updating our thingy")
        setTimeout(()=>{

            handleUpdateWorkout("")
        },50)
    },[props.exerciseList,exerciseTemp])


    useEffect(()=>{
        thePreview()
    },[exerciseTemp,activePeriodTemp,restPeriodTemp])


    function handleKeyDown(e, val){
        if(e.key === "Enter" && val === "add"){
            handleUpdateWorkout(val)
            
        }
    }

    function checkInvalidTemps(){
        if(restPeriodTemp !== 0 && activePeriodTemp !== 0 && exerciseTemp !== ""
        ){
            return true
        } 
        return false
    }


    function handleUpdateWorkout(value,index){
        if(value ==="add"){
            if(checkInvalidTemps()){
                props.setRestPeriods((prev)=> [...prev, restPeriodTemp])
                props.setActivePeriods((prev)=> [...prev, activePeriodTemp])
                props.setExerciseList((prev)=> [...prev, exerciseTemp])
                // setRestPeriodTemp(10)
                // setActivePeriodTemp(10)
            }
            else{alert("Check to make sure all necessary fields have been properly filled")}
        }

        else if(value === "replaceAtIndex"){
            if(checkInvalidTemps()){
            let tempArray = props.exerciseList
            tempArray.splice(index, 1, exerciseTemp)
            props.setExerciseList(tempArray)

            tempArray = props.activePeriods
            tempArray.splice(index, 1, activePeriodTemp)
            props.setActivePeriods(tempArray)

            tempArray = props.restPeriods
            tempArray.splice(index, 1, restPeriodTemp)
            props.setRestPeriods(tempArray)
            }
            else{alert("Check to make sure all necessary fields have been properly filled")}
        }

        else if(value === "remove"){
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
            else{
                alert("Nothing to remove")
            }
        }

        else if(value === "removeAtIndex"){
            let tempArray = props.exerciseList
            tempArray.splice(index, 1, '')
            props.setExerciseList(tempArray.filter((val)=>val !==''))

            tempArray = props.activePeriods
            tempArray.splice(index, 1, 0)
            props.setActivePeriods(tempArray.filter((val)=>val !==0))

            tempArray = props.restPeriods
            tempArray.splice(index, 1, 0)
            props.setRestPeriods(tempArray.filter((val)=>val !==0))
        }

        else if(value === "clear"){
            if(props.exerciseList.length>0){
                props.setExerciseList([])
                props.setRestPeriods([])
                props.setActivePeriods([])
            }
            else{
                alert("Nothing to remove")
            }
        }
        
        setTimeout(()=>{
            thePreview()
        },50)

    }


    return (
        <>
            <div className="workout-container">
                <p className="bigger-text">Set the number of sets you want to do</p>
                <input 
                    type = "number" 
                    className="rounded-big-input"
                    value = {props.totalSets}
                    onChange={e => props.setTotalSets(e.target.value >= 1 ? e.target.value : 1)
                    }
                />
                <p className="bigger-text">Set the name of the exercise</p>
                <input 
                    type = "text" 
                    className="rounded-big-input"
                    value = {exerciseTemp}
                    placeholder = "Enter the name of the exercise here"
                    onChange={e => setExerciseTemp( e.target.value.toUpperCase())
                    }
                    onKeyDown={e => handleKeyDown(e,"add")}
                />
                <p className="bigger-text">Set the rest period</p>
                <input 
                    type = "number" 
                    className="rounded-big-input"
                    value = {restPeriodTemp}
                    onChange={e => setRestPeriodTemp(e.target.value >= 1 ? e.target.value : 1) 
                    }
                    onKeyDown={e => handleKeyDown(e,"add")}
                />
                <p className="bigger-text">Set the active period</p>
                <input 
                    type = "number" 
                    className="rounded-big-input"
                    value = {activePeriodTemp}
                    onChange={e => setActivePeriodTemp(e.target.value >= 1 ? e.target.value : 1) 
                        
                        
                    }
                    onKeyDown={e => handleKeyDown(e,"add")}
                />
            
                <div className="workout-buttons-container">
                    <WorkoutSaver 
                        exerciseList = {props.exerciseList} 
                        activePeriods = {props.activePeriods}
                        restPeriods = {props.restPeriods}
                        setExerciseList = {props.setExerciseList} 
                        setActivePeriods = {props.setActivePeriods}
                        setRestPeriods = {props.setRestPeriods}
                        workoutNames = {workoutNames}
                        setWorkoutNames = {setWorkoutNames}
                        activeUserId = {props.activeUserId}
                        />
                    <button style = {{minWidth: "10px", width: "110px"}} onClick={e => handleUpdateWorkout(e.target.value)} value = "add">Add Exercise</button>
                    <button style = {{minWidth: "10px", width: "110px"}} onClick={e => handleUpdateWorkout(e.target.value)} value= "remove">Remove Last</button>
                    <button style = {{minWidth: "10px", width: "110px"}} onClick={e => handleUpdateWorkout(e.target.value)} value = "clear">Clear All</button>
                </div>     
                <div>{preview}</div>
            </div>
        </>
    )
}
