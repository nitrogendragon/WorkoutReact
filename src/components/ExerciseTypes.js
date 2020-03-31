import React from 'react'
import '../styles/workoutGenerator.css'
import CheckBox from './CheckBox'
export default function ExerciseTypes(props) {


    function handleChecked(exerciseType){

    }


    return (
        <div className = "grid-5">
            <CheckBox isChecked = {props.chestChecked} setChecked = {props.setChestChecked} labelText = {'Chest'}/>
            <CheckBox isChecked = {props.armsChecked} setChecked = {props.setArmsChecked} labelText = {'Arms'}/>
            <CheckBox isChecked = {props.legsChecked} setChecked = {props.setLegsChecked} labelText = {'Legs'}/>
            <CheckBox isChecked = {props.absChecked} setChecked = {props.setAbsChecked} labelText = {'Abs'}/>
            <CheckBox isChecked = {props.backChecked} setChecked = {props.setBackChecked} labelText = {'Back'}/>
        </div>
    )
}
