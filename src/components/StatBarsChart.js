import React,{useState,useEffect} from 'react'
import StatBar from './StatBar'
import '../styles/stats.css'

export default function StatBarsChart(props) {
    const [statShowLimitIndex, setStatShowLimitIndex] = useState(10)
    const modifier = 1



    const [theBars, setTheBars] = useState([])
    function createBasicChart(){
        let i = 0
        let tempArr = []
        for(i; i < props.userExercises.length && i < statShowLimitIndex; i++){
            tempArr[i] = <StatBar key = {i}
                exerciseName = {props.userExercises[i]}
                activePeriod = {props.userExercisesDurations[i] * modifier}
                isPrev = {props.isPrev}
                displayBoth = {props.displayBoth}
            />
        }
        setTheBars(tempArr)
    }



    function updateShownBarsLimit(){
        let temp = Math.floor((window.innerWidth -100) / 98)//dividing by 98 because that is the width of our bars and subtracting 100 because of the legend space
        console.log(temp)
        if(statShowLimitIndex !== temp){
        setStatShowLimitIndex(temp)
        }
    }

    useEffect(()=>{
        createBasicChart()
    },[statShowLimitIndex])


    useEffect(()=>{
        console.log(statShowLimitIndex)
    })


    useEffect(()=>{
        if(props.userExercises != undefined && props.userExercises != null){
            updateShownBarsLimit()
        }
    },[props.updatedUserStats, window.innerWidth])


    return (
            <div className={!props.isPrev || props.isPrev && !props.displayBoth ? "divider" : "divider divider-clear"}>
                <div className="totals b1">100s</div>
                <div className="totals b2">200s</div>
                <div className="totals b3">300s</div>
                <div className="totals b4">400s</div>
                <div className="totals b5">500s</div>
                {theBars}
            </div>


    )
}
