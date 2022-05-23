import './App.css';
import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link 
} from "react-router-dom";

//Import components
import AllPets from './components/AllPets';
import NewPetForm from './components/NewPetForm';
import OnePet from './components/OnePet';
import EditPet from './components/EditPet';

function App() {
  return (
    <BrowserRouter>    
    <div className="App">      
      <Switch>
        <Route exact path = "/">
          <AllPets></AllPets>
        </Route>
        <Route exact path = "/pets/new">
          <NewPetForm></NewPetForm>
        </Route>
        <Route exact path = "/pets/:id">
          <OnePet></OnePet>
        </Route>
        <Route exact path = "/pets/:id/edit">
          <EditPet></EditPet>
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
