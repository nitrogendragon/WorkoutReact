import React, {useEffect} from 'react'
// setExerciseList = {setExerciseList}
// setRestPeriods = {setRestPeriods}
// setActivePeriods = {setActivePeriods}
// setTotalSets = {setTotalSets}
// exerciseList = {exerciseList}
// restPeriods = {restPeriods}
// activePeriods = {activePeriods}
// totalSets = {totalSets}
export default function CreateWorkout(props) {


    useEffect(()=>{
        console.log(props.totalSets)
    },[props.totalSets])


    function handleKeyDown(e,setterFunction, isSets){
        if(e.key === "Enter"){
            if(isSets){
            setterFunction()
            }
        }
    }
    return (
        <div>

            <p>This is the workout page</p>
            <p>Set the number of sets you want to do</p>
            <input 
                    type = "number" 
                    className=""
                    value = {props.totalSets}
                    onChange={e => e.target.value > 0 ? 
                        props.setTotalSets(e.target.value) : 
                        props.setTotalSets(1)    
                    }
                    placeholder="  Enter english, kanji, hiragana,
                     or romaji depending on your filters... Hit enter or press SEARCH to search."
                />
        </div>
    )
}
