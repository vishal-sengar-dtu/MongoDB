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
const getDocument = async () => {
    try {
        const result = await Playlist
            .find({
                $and: [
                    {
                        $or: [
                            { type: "Back End" },
                            { type: "Database" }
                        ]
                    },
                    {
                        videos: { $gt: 30 }
                    }
                ]
            })
            .select({
                name: 1,
                videos: 1
            })
        console.log(result)
    } catch (err) { 
        console.log(err)
    }
}

getDocument()