import React from 'react'
import '../styles/workoutGenerator.css'
import ModifierSlider from './ModifierSlider'
export default function WorkoutBalance(props) {
    return (
        <div>
            { 
                props.absChecked ? 
                <ModifierSlider  modifierSliderValue = {props.absModifier} setModifierSliderValue = {props.setAbsModifier} 
                    modifierExerciseGroupName ={'Abs'}

                />
                :
                <></>
            }
            {
                props.legsChecked ? 
                <ModifierSlider  modifierSliderValue = {props.legsModifier} setModifierSliderValue = {props.setLegsModifier}
                    modifierExerciseGroupName ={'Legs'}

                />
                :
                <></>
            }
            {
                props.armsChecked ? 
                <ModifierSlider modifierSliderValue = {props.armsModifier} setModifierSliderValue = {props.setArmsModifier}
                    modifierExerciseGroupName ={'Arms'}

                />
                :
                <></>
            }
            {
                props.chestChecked ? 
                <ModifierSlider modifierSliderValue = {props.chestModifier} setModifierSliderValue = {props.setChestModifier}
                    modifierExerciseGroupName ={'Chest'}

                />
                :
                <></>
            }
            {
                props.backChecked ? 
                <ModifierSlider modifierSliderValue = {props.backModifier} setModifierSliderValue = {props.setBackModifier}
                    modifierExerciseGroupName ={'Back'}
                />
                :
                <></>
            }
        </div>
    )
}
