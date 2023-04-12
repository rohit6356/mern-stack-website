const mongoose = require('mongoose')

const DB = process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser: true,
  }).then(()=>{
    console.log(`mongoose connection stablished successfully`);
  }).catch((err)=>{
    console.log("no coonection ");
  }) 