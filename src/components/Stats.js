import React, {useState, useEffect} from 'react'
import StatBarsChart from './StatBarsChart'
import'../styles/stats.css'
export default function Stats(props) {
    const [usersExercises, setUsersExercises] = useState(["PUSH UP"])
    const [usersExercisesDurations, setUsersExercisesDurations] = useState([0])
    const [usersExercisesDurationsPrevDay, setUsersExercisesDurationsPrevDay] = useState([0])
    const [startDate, setStartDate] = useState(0)// will be measuring in whole numbers
    const [currentDate, setCurrentDate] = useState(0)// will be measuring in whole numbers
    const [updatedUserStats, setUpdatedUserStats] = useState(false)
    const [displayPrev,setDisplayPrev] = useState(false)
    const [displayBoth, setdisplayBoth] = useState(false)
    const LOCAL_USERS_EXERCISES = "_myExercises"
    const LOCAL_USERS_EXERCISES_DURATIONS = "_myExercisesDurations"
    const LOCAL_USERS_PREV_DAY = "_prevDay"
    const LOCAL_USERS_START_DATE = "_startDate"
    const LOCAL_USERS_CURRENT_DATE = "_currentDate"
    

    function getCurrentDay(){
        return Math.floor(Date.now() / 86400000) //not perfect but works if we focus on pure 24 hour periods
    }


    function showYesterdaysStats(){
        setdisplayBoth(false)
        setDisplayPrev( !displayPrev)
    }


    function showBothStats(){
        if(!displayBoth){
        setDisplayPrev(true)
        setdisplayBoth(true)
        }
        else{
            setDisplayPrev(false)
            setdisplayBoth(false)
        }
    }

    useEffect(()=>{
        console.log("displayBoth is now: " + displayBoth)
        console.log("displayPrev is now: " + displayPrev)
    },[displayPrev,displayBoth])

    
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
        setStartDate(getCurrentDay)
        setCurrentDate(getCurrentDay)
        setUpdatedUserStats(true)
    }

    function updateStorage(){
        // console.log("The users exercises are: " + usersExercises)
        localStorage.setItem(props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES,
        JSON.stringify(usersExercises))
        // console.log("The users exercises durations are: " + usersExercisesDurations)
        localStorage.setItem(props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES_DURATIONS, 
        JSON.stringify(usersExercisesDurations))
        // console.log("The users previous days exercises durations are: " + usersExercisesDurationsPrevDay)
        localStorage.setItem(props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES_DURATIONS + 
            LOCAL_USERS_PREV_DAY, 
        JSON.stringify(usersExercisesDurationsPrevDay))
        // console.log("The start date is: " + startDate)
        localStorage.setItem(props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_START_DATE,
        JSON.stringify(startDate))
        // console.log("The current date is: " + currentDate)
        localStorage.setItem(props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_CURRENT_DATE,
        JSON.stringify(currentDate))
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
        if(startDate === 0){
            setStartDate(()=>getCurrentDay())
        }
        let isNewDay = false
        if(currentDate === 0 || currentDate < getCurrentDay()){
            setCurrentDate(()=> getCurrentDay())
            isNewDay = true
        }
        if(!isNewDay){
            let tempPrevDur = []
            let index = 0
            console.log(usersExercisesDurationsPrevDay)
            for(index; index < tempDurations.length; index++){
                if(usersExercisesDurationsPrevDay[index] >=0){tempPrevDur[index] = usersExercisesDurationsPrevDay[index]}
                else{
                    // console.log("adding a zero")
                    tempPrevDur[index] = 0
                }
            }
            setUsersExercisesDurationsPrevDay(()=>tempPrevDur)
            setUsersExercisesDurations(()=>tempDurations)
            setUsersExercises(()=>tempExercises)
            setUpdatedUserStats(true)
        }
        else{
            let cleanSlateDurations = []
            let index = 0
            for(index; index < tempDurations.length; index++){
                cleanSlateDurations[index] = 0
            }
            setUsersExercisesDurationsPrevDay(()=>tempDurations)
            setUsersExercisesDurations(()=>cleanSlateDurations)
            setUsersExercises(()=>tempExercises)
            setUpdatedUserStats(true)
        }
    }

    //depending on isLowToHigh changes the direction things are sorted
    function sortStats(isLowToHigh){
        let tempExercises = [""]
        let tempDur = [0]
        let tempPrevDur = []
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
                    tempPrevDur[targetIndex] = usersExercisesDurationsPrevDay[index]
                    matchfound = true
                }
                // else{console.log("userVal is: "  + val + "tempVal is: " + val)}
            })
        
        })
        if(!isLowToHigh){
            tempExercises.reverse()
            tempSortedDur.reverse()
            tempPrevDur.reverse()
        }
        setUsersExercisesDurationsPrevDay(()=>tempPrevDur)
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
        const tempUserExercises = JSON.parse(localStorage.getItem(
            props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES))
        if(tempUserExercises === null || tempUserExercises === undefined)
        {
            console.log("clearing")
            handleClearUserStats()
        }
        else {
            console.log("get")
            setUsersExercises(tempUserExercises)

            const tempUserExercisesDurations = JSON.parse(localStorage.getItem(
                props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES_DURATIONS))
            setUsersExercisesDurations(tempUserExercisesDurations)

            const tempUserExercisesDurationsPrevDay = JSON.parse(localStorage.getItem(
                props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES_DURATIONS + 
                LOCAL_USERS_PREV_DAY))
            setUsersExercisesDurationsPrevDay(tempUserExercisesDurationsPrevDay)

            const tempUserStartDate = JSON.parse(localStorage.getItem(
                props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_START_DATE))
            setStartDate(tempUserStartDate)

            const tempUserCurrentDate = JSON.parse(localStorage.getItem(
                props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_CURRENT_DATE))
            setCurrentDate(tempUserCurrentDate)
        }

        
    },[])


    return (
        <div style={{display: props.showStats ? 'grid' : 'none'}}>
            <div className = "stats-chart-buttons-container">
                <button onClick = {handleClearUserStats}>Clear Stats</button>
                <button onClick = {e=> sortStats(true)}>Sort L-H</button>
                <button onClick = {e => sortStats(false)}>Sort H-L</button>
                <button onClick = {e=> showYesterdaysStats()}>Hide/Show Yesterdays Stats</button>
                <button onClick = {e=> showBothStats()}>Compare Stats</button>
            </div>
            {!displayPrev || displayBoth ?
            <StatBarsChart 
                userExercises ={JSON.parse(localStorage.getItem(
                    props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES))}
                userExercisesDurations = {JSON.parse(localStorage.getItem(
                    props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES_DURATIONS))}
                updatedUserStats = {updatedUserStats}
                isPrev = {false}
                /> :
                <></>
            }
            
            { displayPrev ?
                <StatBarsChart 
                    userExercises ={JSON.parse(localStorage.getItem(
                        props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES))}
                    userExercisesDurations = {JSON.parse(localStorage.getItem(
                        props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES_DURATIONS +
                        LOCAL_USERS_PREV_DAY))}
                    updatedUserStats = {updatedUserStats}
                    isPrev = {true}
                    displayBoth = {displayBoth}
                /> :
                <></>
            }
            
        </div>
    )
}
