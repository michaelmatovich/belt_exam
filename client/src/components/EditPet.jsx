import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const EditPet = () => {

const history = useHistory();

    let [onePet, setOnePet] = useState({});

    let [errors, setErrors] = useState({})

    let { id } = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pet/${id}`)
        .then(res=>{
            console.log("Response is: ", res);
            setOnePet(res.data.results);         
        }, res=>{
            console.dir(res);
            console.log("Here is the error....", res.message,res.transitional);
        })
        // .catch(err=>{
        //     console.log("Error is: ", err);
        // })
    },[])

    const editPet = (e)=>{
        e.preventDefault();    

        axios.put(`http://localhost:8000/api/pets/${id}`, onePet)
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

    const changeHandler = (e)=>{

        setOnePet({
            ...onePet,
            [e.target.name]: e.target.value
        })
    }


    return (        
        <>  
            <header className = "flex">
                <h1>Pet Shelter</h1>
                <button><Link to = "/">back to home</Link></button>
            </header>
            <h2>Edit {onePet.name}</h2>
            <form className = "box" onSubmit = { editPet }>
                <div>
                    <p>Pet Name:</p>
                    <input onChange = { changeHandler } name = "name" type = "text" value = { onePet.name }></input>
                    <p className = "error">{errors.name? errors.name.message: null}</p>
                </div>
                <div>
                    <p>Pet Type:</p>
                    <input onChange = { changeHandler } name = "type" type = "text" value = { onePet.type }></input>
                    <p className = "error">{errors.type? errors.type.message: null}</p>
                </div>
                <div>
                    <p>Pet Description:</p>
                    <input onChange = { changeHandler } name = "description" type = "text" value = { onePet.description }></input>
                    <p className = "error">{errors.description? errors.description.message: null}</p>
                </div>
                <p>Skills: (optional)</p>
                <div>
                    <p>Skill 1:</p>
                    <input onChange = { changeHandler } name = "skill_one" type = "text" value = { onePet.skill_one }></input>
                </div>
                <div>
                    <p>Skill 2:</p>
                    <input onChange = { changeHandler } name = "skill_two" type = "text" value = { onePet.skill_two }></input>
                </div>
                <div>
                    <p>Skill 3:</p>
                    <input onChange = { changeHandler } name = "skill_three" type = "text" value = { onePet.skill_three }></input>
                </div>
                <br></br>
                <input id = "submitbtn" type = "submit" value = "Edit Pet"></input>                
            </form>
        </>
    );
};

export default EditPet;