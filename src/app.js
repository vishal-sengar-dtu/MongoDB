const mongoose = require('mongoose')


// connecting to database

mongoose.connect("mongodb://localhost:27017/Youtube",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connecting to Database..."))
    .catch(err => console.log(`Connection Error: ${err}`))


// schema - it defines the structure of the document

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: String,
    videos: Number,
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})


// model - it provides an interface to the database for performing CURD operations

const Playlist = new mongoose.model("Playlist", playlistSchema)