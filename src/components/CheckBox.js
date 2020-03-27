import React from 'react'

export default function CheckBox(props) {
    function handleCheck(){
        props.setChecked(!props.isChecked)
    }
    return (
        <label > 
            <div className = "checkmark-container">
                <input
                type="checkbox"
                checked={props.isChecked}
                onChange={e => handleCheck()} />
                {props.labelText.toString()}
            </div>
        </label>
    )
}
