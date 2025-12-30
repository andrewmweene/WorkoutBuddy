require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')

//express app
const app  = express()

//middleware
app.use(express.json())

app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db and listening on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })


