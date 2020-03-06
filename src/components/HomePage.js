import React, {useState, useEffect} from 'react'
import User from './User'
import '../styles/homePage.css'
export default function HomePage(props) {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const userNameErrorMsg = "UserName does not exist."
    const passwordErrorMsg = "Password does not exist."


    function handleKeyDown(e){
        if(e.key === "Enter"){
            handleEnterApp()
        }
    }


    function handleEnterApp(){
        if(password != "" && userName != "")
        {
        confirmPassword != "" ? handleSignUp() : handleSignIn()
        }
        else{ alert("UserName or Password is missing. Please fill them out and try again.")}
    }


    function handleSignIn(){
        validateSignInCredentials()
    }


    function handleSignUp(){
        password === confirmPassword ? 
        createUser() : alert("Passwords do not match.")
    }


    function handleSignInSuccess(userId){
        props.setActiveUserId(userId)
        props.setLoggedIn(true)
        props.setFirstLoad(false)
        props.setShowCreateWorkout(true)
    }


    function validateSignInCredentials(){
        //checking for valid userName
        const temp = props.users != null ? props.users.filter( e => e.props.userName === userName) : []
        if(temp[0] && temp[0].props.userName === userName){
            const tempId = temp[0].props.id
            //checking for valid password
            const temp2 = props.users[tempId]
            temp2.props.password === password ? 
                handleSignInSuccess(temp2.props.id) :
                alert(passwordErrorMsg)
        }
        else{alert(userNameErrorMsg)}
    }
    


    function createUser(){
        const temp = props.users != null ? props.users.filter( e => e.props.userName === userName) : []
        if(temp[0]){ alert("This UserName is already taken. Please try a different name.")}
        else{
            props.users != null ?
            props.setUsers(()=>[...props.users,
            <User key = {props.users.length} userName = {userName} password = {password} id = {props.users.length}/>]) :
            props.setUsers(() => [<User key = {0} userName = {userName} password = {password} id = {0}/>])
            alert("Profile successfully created")
            // handleSignInSuccess(props.users[props.users.length].props.id)
        }
    }

    //For whatever reason it seems I need to make sure my get is always above my set for things to work right
    //This is for initializing our users data on first load
    useEffect(()=>{
        const tempUsers = JSON.parse(localStorage.getItem(props.LOCAL_USERS_KEY))
        props.setUsers(tempUsers)
            
    },[])
    
    
    useEffect(()=>{
        console.log("updated for some reason?")
            localStorage.setItem(props.LOCAL_USERS_KEY, JSON.stringify(props.users))
    },[props.users])


    return (
        <div className="home-page">
            <button onClick={handleEnterApp} >Start App</button>
            <input type="text" placeholder = "Enter UserName" value = {userName} 
                onChange = {e => setUserName(e.target.value)}
                onKeyDown = {e => handleKeyDown(e)}>
            </input>
            <input type="text" placeholder = "Enter Password" value = {password} 
                onChange = {e => setPassword(e.target.value)}
                onKeyDown = {e => handleKeyDown(e)}>
            </input>
            <input type="text" placeholder = "Confirm Password (For user creation only)" value = {confirmPassword} 
                onChange = {e => setConfirmPassword(e.target.value)}
                onKeyDown = {e => handleKeyDown(e)}>
            </input>
        </div>
    )
}
