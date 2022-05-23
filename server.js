const express = require("express"); 
const cors = require("cors");// import cors (cross origin resource sharing)

const app = express(); 
const port = 8000; 

//Need before routes (handles post requests)
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use(cors());

require("./server/config/mongoose.config");

//routes need to be below all app.use commands
require("./server/routes/pets.routes")(app);



//last line of server.js
app.listen(port, ()=>console.log(`Listening on port ${port}`));