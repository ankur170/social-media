const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectToDataBase = async()=>{
  try{
       await mongoose.connect(db,{ useUnifiedTopology: true , useNewUrlParser: true,useCreateIndex: true,useFindAndModify: false});
       console.log('database successfully connected')
  }
  catch(err){
      console.log(err.message)
      process.exit(1);
  }
}

module.exports = connectToDataBase;