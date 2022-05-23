import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const AllPets = () => {

    const history = useHistory();

    let [allPets, setAllPets] = useState([])
    
    let [sortedPets, setSortedPets] = useState([])
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/pets")
        .then(res=>{
            console.log("Response is: ", res)
            setAllPets(res.data.results.sort(keySort("type")))           
            // console.log("All pets: ", allPets)
            // setSortedPets(allPets.sort(keySort("name")))
        })
        .catch(err=>{
            console.log("Error is: ", err);
        })
    },[])   

    function keySort(key) {
        var sortOrder = 1;
    
        if(key[0] === "-") {
            sortOrder = -1;
            key = key.substr(1);
        }
    
        return function (a,b) {
            if(sortOrder == -1){
                return b[key].localeCompare(a[key]);
            }else{
                return a[key].localeCompare(b[key]);
            }        
        }
    }

    return (        
        <>
            <header className = "flex">
                <h1>Pet Shelter</h1>
                <button><Link to = "/pets/new">add a pet to the shelter</Link></button>
            </header>
            <h2>These pets are looking for a good home!</h2>
            <div>
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                {
                    allPets.map((PetObj, idx)=>{
                        
                        return (
                            <tr>
                            <td>{PetObj.name}</td>
                            <td>{PetObj.type}</td>
                            <td><Link to = {`/pets/${PetObj._id}`}>Details</Link> | <Link to = {`/pets/${PetObj._id}/edit`}>Edit</Link></td>
                            </tr>
                        )    
                        
                    })
                }                
                </tbody>
                </table>
            </div>
        
        </>
    );
};

export default AllPets;