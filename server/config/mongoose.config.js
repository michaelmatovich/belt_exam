const mongoose = require('mongoose');


//change cluster name
mongoose.connect(`mongodb+srv://root:root@clustermay.xvmj1.mongodb.net/pets_db?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));