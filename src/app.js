const mongoose = require('mongoose')

// connecting to database
mongoose.connect("mongodb://localhost:27017/Youtube",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connecting to Database..."))
    .catch(err => console.log(`Connection Error: ${err}`))