const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const path = require('path')
const connecToDataBase = require('./config/connection')
const usersRouter = require('./routes/api/users')
const authsRouter = require('./routes/api/auths')
const postsRouter = require('./routes/api/posts')
const profilesRouter = require('./routes/api/profiles')

app.use(cors())

//Connect to database
connecToDataBase();

//middleware to recognize 'req' object is JSON-type content and 
//only looks at requests where the Content-Type header matches the type option
app.use(express.json({extended: false}))  

//divert  incoming request to different routes
app.use('/api/users',usersRouter)
app.use('/api/auths',authsRouter)
app.use('/api/posts',postsRouter)
app.use('/api/profiles',profilesRouter)

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

app.listen(PORT,()=>{
    console.log(`server is listening at  port no ${PORT}`)
})