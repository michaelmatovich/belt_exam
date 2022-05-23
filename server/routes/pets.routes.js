const PetController = require("../controllers/pets.controller");


module.exports = (app)=>{
    app.get("/api/test", PetController.testConnection);
    app.get("/api/pets", PetController.findAllPets);
    app.post("/api/pets", PetController.createPet);
    app.get("/api/pets/:id", PetController.findOnePet);
    app.put("/api/pets/:id", PetController.updatePet);
    app.delete("/api/pets/:id", PetController.deletePet);
}
