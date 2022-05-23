import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const OnePet = () => {

    const history = useHistory();

    const { id } = useParams();

    let [onePet, setOnePet] = useState({});

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pets/${id}`)
        .then(res=>{
            console.log("Response is: ", res);
            setOnePet(res.data.results);
        })
        .catch(err=>{
            console.log("Error is: ", err);
        })
    },[])

    const deletePet = (e)=>{

        axios.delete(`http://localhost:8000/api/pets/${id}`)
            .then(res=>{
                console.log("Response is: ", res);
                history.push('/');
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
            <header className = "flex">
            <h2>Details about: {onePet.name}</h2>
            <button onClick = { deletePet } id = "adoptbtn">Adopt {onePet.name}</button>
            </header>
            <div className = "box">
                <h3>Pet Type:</h3> 
                <p>{ onePet.type }</p>
                <h3>Pet Description:</h3>
                <p>{ onePet.description }</p>
                <h3>Skills:</h3>
                {
                onePet.skill_one == ""? <p>None</p> :
                <p>{onePet.skill_one}<br></br> {onePet.skill_two}<br></br> {onePet.skill_three}</p>
                }
                </div>
        </>
    );
};

export default OnePet;