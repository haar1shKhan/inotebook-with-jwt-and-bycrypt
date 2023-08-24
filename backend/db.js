const mongoose = require('mongoose');

mongoose.set('strictQuery', true);


connectToMongo=async()=>{
    
   
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        
        // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    
}
var db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error"))

db.once('open', () => {

   console.log('connected')

})

module.exports = connectToMongo;