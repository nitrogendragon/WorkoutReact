import React, {useState, useEffect} from 'react'
import StatBar from './StatBar'
export default function Stats(props) {
    const [usersExercises, setUsersExercises] = useState(["PUSH UP"])

    function updateStats(){
        let tempExercises = ["PUSH UP"]

        for(let i  = 0; i < props.exerciseList.length; i++){
            let tempExercise = usersExercises.includes(props.exerciseList[i]) ?
                undefined : props.exerciseList[i]
            if(tempExercise != undefined && tempExercises != undefined && !tempExercises.includes(tempExercise)){
                tempExercises.push(tempExercise)
            }
        }
        console.log(tempExercises)
        props.users[props.activeUserId].props.myExercises = tempExercises
    }


    useEffect(()=>{
        if(props.users[props.activeUserId].props.myExercises != undefined)
        console.log( props.users[props.activeUserId].props.myExercises)
    },[props.users[props.activeUserId].props.myExercises])


    useEffect(()=>{
        if(props.updateStats){
            console.log("updating stats")
            console.log(props.users[props.activeUserId].props.myExercises)
            props.setUpdateStats(false)
            updateStats()
        }
    },[props.updateStats])


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
