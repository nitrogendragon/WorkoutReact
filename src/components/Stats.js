import React, {useState, useEffect} from 'react'
import StatBarsChart from './StatBarsChart'
import'../styles/stats.css'
export default function Stats(props) {
    const [usersExercises, setUsersExercises] = useState(["PUSH UP"])
    const [usersExercisesDurations, setUsersExercisesDurations] = useState([0])
    const [usersExercisesDurationsPrevDay, setUsersExercisesDurationsPrevDay] = useState([0])
    const [startDate, setStartDate] = useState(0)// will be measuring in whole numbers
    const [currentDate, setCurrentDate] = useState(0)// will be measuring in whole numbers
    const LOCAL_USERS_EXERCISES = "_myExercises"
    const LOCAL_USERS_EXERCISES_DURATIONS = "_myExercisesDurations"
    const LOCAL_USERS_EXERCISES_Durations_PREV_DAY_MODIFIER = "_prevDay"
    const [updatedUserStats, setUpdatedUserStats] = useState(false)
    

    function createStartDate(){
        let tempNow = Date.now()
        let tempNowSeconds = tempNow / 1000
        let tempNowMinutes = tempNowSeconds / 60
        let tempNowHours = tempNowMinutes / 60
        let tempNowDays = Math.floor(tempNowHours /24)
        console.log(tempNow + "milliseconds")
        console.log(tempNowSeconds + "seconds")
        console.log(tempNowMinutes + "minutes")
        console.log(tempNowHours + "hours")
        console.log(tempNowDays + "days")
    }


    
    function getIndex(value, arr){
        let i = 0
        for(i; i < arr.length; i++){
            if(arr[i] === value){
                return i
            }
        }
        return -1
    }

    function handleClearUserStats(){
        setUsersExercises(["PUSH UP"])
        setUsersExercisesDurations([0])
        setUsersExercisesDurationsPrevDay([0])
        setUpdatedUserStats(true)
    }

    function updateStorage(){
        console.log("The users exercises are: " + usersExercises)
        localStorage.setItem(props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES,
        JSON.stringify(usersExercises))
        console.log("The users exercises durations are: " + usersExercisesDurations)
        localStorage.setItem(props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES_DURATIONS, 
        JSON.stringify(usersExercisesDurations))
    }


    function updateStats(){
        let tempExercises = usersExercises
        let tempDurations = usersExercisesDurations
        let tempExercise
        let insertionIndex
        for(let i  = 0; i < props.exerciseList.length; i++){
            tempExercise = usersExercises.includes(props.exerciseList[i]) ?
                undefined : props.exerciseList[i]
            //handling updating new exercise
            if(tempExercise != undefined && tempExercises != undefined && !tempExercises.includes(tempExercise)){
                tempExercises= [...tempExercises, tempExercise]
                tempDurations = [...tempDurations, props.activePeriods[i] * props.totalSets]
            }
            //handling updating an exercise we have done before We want to make sure we are compounding total time
            else{
                insertionIndex = getIndex(props.exerciseList[i],usersExercises)
                if(insertionIndex != -1){
                    tempDurations[insertionIndex] = props.activePeriods[i] * props.totalSets + tempDurations[insertionIndex]
                }

            }
        }
        
        setUsersExercisesDurations(()=>tempDurations)
        setUsersExercises(()=>tempExercises)
        setUpdatedUserStats(true)
    }

    //depending on isLowToHigh changes the direction things are sorted
    function sortStats(isLowToHigh){
        let tempExercises = [""]
        let tempDur = [0]
        let i
        let matchfound 
        for(i = 0; i < usersExercisesDurations.length; i++){
            tempDur[i] = usersExercisesDurations[i]
            tempExercises[i] = "a"
        }
        const tempSortedDur = usersExercisesDurations.sort()
        //using tempDur because it doesn't get force sorted
        tempDur.map((val, index) =>{
            matchfound = false
            tempSortedDur.map((tempVal, targetIndex) => {
                if(matchfound != true && val.toString() === tempVal.toString() &&  tempExercises[targetIndex].toString() === "a"){
                    tempExercises[targetIndex] = usersExercises[index]
                    matchfound = true
                }
                // else{console.log("userVal is: "  + val + "tempVal is: " + val)}
            })
        
        })
        if(!isLowToHigh){
            tempExercises.reverse()
            tempSortedDur.reverse()
        }
        setUsersExercisesDurations(()=>tempSortedDur)
        setUsersExercises(()=>tempExercises)
        setUpdatedUserStats(true)
    }


    useEffect(()=>{
        if(props.updateStats){
            props.setUpdateStats(false)
            updateStats()
        }
    },[props.updateStats])
    
    
    useEffect(()=>{
        if(updatedUserStats){
            setUpdatedUserStats(false)
            updateStorage()
        }
    },[updatedUserStats])


    useEffect(()=>{
        if(usersExercises[0] === "PUSH UP" && usersExercisesDurations[0] === 0 )
        {
            handleClearUserStats()
        }
        else if(usersExercises != null && usersExercises != undefined){
            const tempUserExercises = JSON.parse(localStorage.getItem(
                props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES))
            setUsersExercises(tempUserExercises)
            const tempUserExercisesDurations = JSON.parse(localStorage.getItem(
                props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES_DURATIONS))
            setUsersExercisesDurations(tempUserExercisesDurations)
        }
        
    },[])


    return (
        <div style={{display: props.showStats ? 'grid' : 'none'}}>
            <div className = "stats-chart-buttons-container">
                <button onClick = {handleClearUserStats}>Clear Stats</button>
                <button onClick = {e=> sortStats(true)}>Sort L-H</button>
                <button onClick = {e => sortStats(false)}>Sort H-L</button>
                <button >Clear Stats</button>
            </div>
            <StatBarsChart 
                userExercises ={JSON.parse(localStorage.getItem(
                    props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES))}
                userExercisesDurations = {JSON.parse(localStorage.getItem(
                    props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES_DURATIONS))}
                updatedUserStats = {updatedUserStats}
            />
            
        </div>
    )
}
