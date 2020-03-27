import React, {useEffect} from 'react'
import '../styles/workoutGenerator.css'
export default function DurationRanges(props) {


    function handleChange(e){
        console.log("triggered")
        if(e.target.id === 'activeSliderValue'){
            props.setActiveSliderValue(e.target.value)
        }
        else if(e.target.id === 'restSliderValue'){
            props.setRestSliderValue(e.target.value)
        }
    }

    useEffect(()=>{
        console.log(props.activeSliderValue)
    },[props.activeSliderValue])

    return (
        <>
        <p>Active Period Base Time: {props.activeSliderValue} Seconds</p>
        <div className = "slider">
            <input 
                id="activeSliderValue" 
                type="range" 
                min="10" max="1000" 
                value={props.activeSliderValue} 
                onChange={e =>handleChange(e)}
                step="1"
            />
        </div>
        <p>Rest Period Base Time: {props.restSliderValue} Seconds</p>
        <div className = "slider">
            <input 
                id="restSliderValue" 
                type="range" 
                min="1" max="120" 
                value={props.restSliderValue} 
                onChange={e =>handleChange(e)}
                step="1"
            />
        </div>
        </>
    )
}
