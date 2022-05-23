import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const NewPetForm = () => {

const history = useHistory();

let [name, setName] = useState("")
let [type, setType] = useState("")
let [description, setDescription] = useState("")
let [skill_one, setSkillOne] = useState("")
let [skill_two, setSkillTwo] = useState("")
let [skill_three, setSkillThree] = useState("")

let [allPets, setAllPets] = useState([])

let [errors, setErrors] = useState({})

useEffect(()=>{
    axios.get("http://localhost:8000/api/pets")
    .then(res=>{
        // console.log("Response is: ", res);
        setAllPets(res.data.results);        
    })
    .catch(err=>{
        console.log("Error is: ", err);
    })
},[])


const addPet = (e)=>{
    e.preventDefault();

    //create Pet object
    let formInfo = {name, type, description, skill_one, skill_two, skill_three}

    axios.post("http://localhost:8000/api/pets", formInfo)
        .then(res=>{
            console.log("Response is: ", res);


            if(res.data.error){
                console.log("Here are the errors: ")
                
                //save validations messages
                setErrors(res.data.error.errors);
                // console.log(errors.name.message);                
            }           
            else{
                history.push('/');
            }
        })
        .catch(err=>{
            console.log(err);            
        })
}



    return (        
        <>  
            <header className = "flex">
                <h1>Pet Shelter</h1>
                <button><Link to = "/">back to home</Link></button>
            </header>
            <h2>Know a pet needing a home?</h2>
            <form className = "box" onSubmit = { addPet }>
                <div>
                    <p>Pet Name:</p>
                    <input onChange={(e)=>setName(e.target.value)} type = "text" value = { name }></input>
                    <p className = "error">{errors.name? errors.name.message: null}</p>
                </div>
                <div>
                    <p>Pet Type:</p>
                    <input onChange={(e)=>setType(e.target.value)} type = "text" value = { type }></input>
                    <p className = "error">{errors.type? errors.type.message: null}</p>
                </div>
                <div>
                    <p>Pet Description:</p>
                    <input onChange={(e)=>setDescription(e.target.value)} type = "text" value = { description }></input>
                    <p className = "error">{errors.description? errors.description.message: null}</p>
                </div>
                <p>Skills: (optional)</p>
                <div>
                    <p>Skill 1:</p>
                    <input onChange={(e)=>setSkillOne(e.target.value)} type = "text" value = { skill_one }></input>
                </div>
                <div>
                    <p>Skill 2:</p>
                    <input onChange={(e)=>setSkillTwo(e.target.value)} type = "text" value = { skill_two }></input>
                </div>
                <div>
                    <p>Skill 3:</p>
                    <input onChange={(e)=>setSkillThree(e.target.value)} type = "text" value = { skill_three }></input>
                </div>
                <br></br>
                <input id = "submitbtn" type = "submit" value = "Add Pet"></input>                
            </form>
        </>
    );
};

export default NewPetForm;