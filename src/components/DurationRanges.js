import React, {useEffect} from 'react'
import '../styles/workoutGenerator.css'
import meme from '../../src/Images/9000meme.jfif'
export default function DurationRanges(props) {


    function handleChange(e){
        if(e.target.id === 'activeSliderValue'){
            props.setActiveSliderValue(e.target.value)
        }
        else if(e.target.id === 'restSliderValue'){
            props.setRestSliderValue(e.target.value)
        }
        else if(e.target.id === 'finalRestSliderValue'){
            props.setFinalRestSliderValue(e.target.value)
        }
    }


    return (
        <div className = "flex-container">
        <p>Active Period Base Time: {props.activeSliderValue} Seconds</p>
        <div className = "slider">
            <input 
                id="activeSliderValue" 
                type="range" 
                min="10" max="9001" 
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
        <p>End of Set Rest Period Time: {props.finalRestSliderValue} Seconds</p>
        <div className = "slider">
            <input 
                id="finalRestSliderValue" 
                type="range" 
                min="1" max="1200" 
                value={props.finalRestSliderValue} 
                onChange={e =>handleChange(e)}
                step="1"
            />
        </div>
        <div>
                {props.activeSliderValue > 9000 ? 
                    
                    <img src={meme} alt=''></img>
                    :
                    <></>
                }
            </div>
        </div>
    )
}
