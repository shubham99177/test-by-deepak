const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log('MongoDB URI:', process.env.MONGODB_URI ); // Print the URI to check
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`DB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};
module.exports = connectDB;




//testing code
// const connectDB = async () => { try { const conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, }); console.log(`MongoDB Connected: ${conn.connection.host}`); } catch (err) { console.error(err); process.exit(1); } };

// const mongoose = require("mongoose");
// mongoose.connect( "mongodb://127.0.0.1:27017/scrach").then(function(){
//     console.log("DB Connected")
// })
// .catch(function(err){
//     console.log(err)
// })
// module.exports = mongoose.connection;



// const { MongoClient } = require('mongodb');

// const uri = "your_mongodb_uri";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("Connected successfully to server");
//   }
//   client.close();
// });
