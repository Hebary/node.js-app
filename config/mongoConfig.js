const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const dbConnection = async ()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        const URL =`${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB Connected On ${URL}`);
    }
    catch(err){
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }

}

module.exports = dbConnection;