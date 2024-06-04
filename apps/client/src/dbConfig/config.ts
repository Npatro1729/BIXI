import mongoose from "mongoose";

export async function connect(){
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            console.error("MongoDB URI is not defined in environment variables.");
            process.exit(1);
        }
        if (mongoose.connection.readyState >= 1) {
            return;
        }
        mongoose.connect(uri)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log("connection with db established")
        })
        connection.on('error',(err)=>{
            console.log("db connection error: "+err);
            process.exit();
        })
    } catch (error) {
        console.log("something went wrong with the db connection")
        console.log(error)
    }
}
