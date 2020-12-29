const mongoose = require('mongoose')


// connecting to database
mongoose.connect("mongodb://localhost:27017/Youtube",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to Database..."))
    .catch(err => console.log(err))


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


// insert document
const insertSingleDocument = async () => {
    try { 
        const reactPlaylist = new Playlist({
            name: "React JS",
            type: "Front End",
            videos: 80,
            author: "Vishal Sengar",
            active: true,
        })
            
        const result = await reactPlaylist.save()
        console.log(result)
    } catch (err) {
        console.log(err)
    } 
}

// insertSingleDocument()


// insert multiple document
const insertMultipleDocuments = async () => {
    try { 
        const expressPlaylist = new Playlist({
            name: "Express JS",
            type: "Back End",
            videos: 20,
            author: "Vishal Sengar",
            active: true,
        })
        const mongoPlaylist = new Playlist({
            name: "MongoDB",
            type: "Database",
            videos: 40,
            author: "Vishal Sengar",
            active: true,
        })
        const mongoosePlaylist = new Playlist({
            name: "Mongoose JS",
            type: "Database",
            videos: 10,
            author: "Vishal Sengar",
            active: true,
        })
        const jsPlaylist = new Playlist({
            name: "Javascript",
            type: "Front End",
            videos: 150,
            author: "Vishal Sengar",
            active: true,
        })
        const gitPlaylist = new Playlist({
            name: "Git",
            type: "Dev Tools",
            videos: 20,
            author: "Vishal Sengar",
            active: true,
        })
            
        const result = await Playlist.insertMany([ expressPlaylist, mongoPlaylist, mongoosePlaylist, jsPlaylist, gitPlaylist ])
        console.log(result)
    } catch (err) {
        console.log(err)
    } 
}

//insertMultipleDocuments()


// read documents
// comparision operators $eq, $lt, $lte, $gt, $gte, $in, $nin
// logical operators $and, $or, $not, $nor
// .countDocuments()
// sort({ field: 1, -1 })
const getDocument = async () => {
    try {
        const result = await Playlist
            .find({ author: "Vishal Sengar" })
            .select({
                name: 1,
                videos: 1,
                _id: 0
            })
            //.sort({ videos: 1, name: -1 })
            //.countDocuments()
        
        console.log(result)
    } catch (err) { 
        console.log(err)
    }
}

//getDocument()

// update documents
const updateDocument = async (_id) => {
    try {
        const result = await Playlist
            .findByIdAndUpdate(
                { _id },
                { $set: { name: "Node JS" } },
                { new: true }
            )
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

//updateDocument("5fde0e8dda11bb13cc721a5c")

// delete documents
const deleteDocument = async (_id) => {
    try {
        const result = await Playlist.findByIdAndDelete({ _id })
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

//deleteDocument("5fde0e8dda11bb13cc721a5c")