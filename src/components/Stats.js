import React, {useState, useEffect} from 'react'
import StatBar from './StatBar'
export default function Stats(props) {
    const [usersExercises, setUsersExercises] = useState(["PUSH UP"])
    const [usersExercisesDurations, setUsersExercisesDurations] = useState([0])
    const LOCAL_USERS_EXERCISES = "_myExercises"
    const LOCAL_USERS_EXERCISES_DURATIONS = "_myExercisesDurations"

    function getIndex(value, arr){
        let i = 0
        for(i; i < arr.length; i++){
            if(arr[i] === value){
                return i
            }
        }
        return -1
    }


    function updateStats(){
        let tempExercises = usersExercises
        let tempDurations = usersExercisesDurations
        let tempExercise
        let insertionIndex
        for(let i  = 0; i < props.exerciseList.length; i++){
            tempExercise = usersExercises.includes(props.exerciseList[i]) ?
                undefined : props.exerciseList[i]
                console.log("The temp exercise is: " + tempExercise)
            //handling updating new exercise
            if(tempExercise != undefined && tempExercises != undefined && !tempExercises.includes(tempExercise)){
                tempExercises= [...tempExercises, tempExercise]
                tempDurations = [...tempDurations, props.activePeriods[i] * props.totalSets]
            }
            //handling updating an exercise we have done before
            else{
                insertionIndex = getIndex(props.exerciseList[i],usersExercises)
                if(insertionIndex != -1){
                    tempDurations[insertionIndex] = props.activePeriods[i] * props.totalSets
                    console.log(insertionIndex)
                }

            }
        }
        
        console.log(tempDurations)
        console.log(tempExercises)
        setUsersExercisesDurations(()=>tempDurations)
        setUsersExercises(()=>tempExercises)
        console.log("The users exercises are: " + usersExercises)
        localStorage.setItem(props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES,
            JSON.stringify(usersExercises))
        console.log("The users exercises durations are: " + usersExercisesDurations)
        localStorage.setItem(props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES_DURATIONS, 
            JSON.stringify(usersExercisesDurations))
        setTimeout(()=>{
        },200)
    }


    useEffect(()=>{
        if(props.updateStats){
            console.log("updating stats")
            props.setUpdateStats(false)
            updateStats()
        }
    },[props.updateStats])


    useEffect(()=>{
        const tempUserExercises = JSON.parse(localStorage.getItem(
            props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES))
        setUsersExercises(tempUserExercises)
        const tempUserExercisesDurations = JSON.parse(localStorage.getItem(
            props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES_DURATIONS))
        setUsersExercisesDurations(tempUserExercisesDurations)
    },[])
    
    
    // useEffect(()=>{
    //     console.log(usersExercises)
    //         localStorage.setItem(props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES,
    //              JSON.stringify(usersExercises))
    // },[usersExercises])
    
    
    // useEffect(()=>{
    //     console.log(usersExercisesDurations)
    //         localStorage.setItem(props.LOCAL_USERS_KEY + props.activeUserId +  LOCAL_USERS_EXERCISES_DURATIONS, 
    //             JSON.stringify(usersExercisesDurations))
    // },[usersExercisesDurations])


    return (
        <div className="divider" style={{display: props.showStats ? 'grid' : 'none'}}>
            <StatBar 
                exerciseList = {props.exerciseList}
                activePeriods = {props.activePeriods}
                index = {0}
            />
        </div>
    )
}
