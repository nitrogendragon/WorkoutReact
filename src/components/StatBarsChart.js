import React,{useState,useEffect} from 'react'
import StatBar from './StatBar'
import '../styles/stats.css'
export default function StatBarsChart(props) {
    const modifier = 1


    const centerer = {
        position: '"absolute',
        top: '0',
        left: '0',
        margin: '0',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100%',

    }


    const [theBars, setTheBars] = useState([])
    function createBasicChart(){
        let i = 0
        let tempArr = []
        for(i; i < props.userExercises.length && i < 18; i++){
            tempArr[i] = <StatBar key = {i}
            exerciseName = {props.userExercises[i]}
            activePeriod = {props.userExercisesDurations[i] * modifier}
        />
        }
        setTheBars(tempArr)
    }


    useEffect(()=>{
        if(props.userExercises != undefined && props.userExercises != null){
            // console.log(props.userExercises)
            createBasicChart()
        }
    },[props.updatedUserStats])


    return (
            <div className="divider">
                <div className="totals b1">100s</div>
                <div className="totals b2">200s</div>
                <div className="totals b3">300s</div>
                <div className="totals b4">400s</div>
                <div className="totals b5">500s</div>
                {theBars}
            </div>

    )
}
