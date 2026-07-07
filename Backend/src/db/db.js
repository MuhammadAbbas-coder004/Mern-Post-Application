import mongoose from "mongoose";
import dns from 'dns';



dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])


const connectDB = async ()=>{

await mongoose.connect(process.env.MONGO_URI)

console.log('Connected to DB');


}


export default connectDB;