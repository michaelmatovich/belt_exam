const Pet = require("../models/pets.model"); //connect to db

module.exports.testConnection = (req,res)=>{
    res.json({msg: "We are good to go!"});
}

module.exports.findAllPets = (req,res)=>{
    Pet.find()
        .then(allPets=>{
            res.json({results: allPets})
        })
        .catch(err=>{
            res.json({msg:"Something went wrong", error: err})
        })
}

module.exports.createPet = (req,res)=>{    
    Pet.create(req.body)
        .then(newPet=>{
            res.json({results: newPet})
        })
        .catch(err=>{
            res.json({msg:"Something went wrong", error: err})
        })
}

module.exports.findOnePet = (req,res)=>{
    Pet.findOne({_id: req.params.id})
        .then(foundPet =>{
            res.json({results: foundPet})
        })
        .catch(err=>{
            res.json({msg:"Something went wrong", error: err})
        })
}

module.exports.updatePet = (req,res)=>{
    Pet.findOneAndUpdate(
        {_id: req.params.id}, 
        req.body, 
        { new: true, runValidators: true }
    )
        .then(updatedPet=>{
            res.json({results: updatedPet})
        })
        .catch(err=>{
            res.json({msg:"Something went wrong", error: err})
        })
}

module.exports.deletePet = (req,res)=>{
    Pet.deleteOne({_id: req.params.id})
        .then(deletedPet=>{
            res.json({results: deletedPet})
        })
        .catch(err=>{
            res.json({msg:"Something went wrong", error: err})
        })
}