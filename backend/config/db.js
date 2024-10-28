import mongoose from "mongoose";
import { dbURL } from "./config.js";
import chalk from "chalk";


const connectDB = async () => {
    try{

        const conn = await mongoose.connect(dbURL);

        console.log(`${chalk.green.bold('Connected to Database✅🔥', chalk.bgGreenBright.bold(conn.connection.host))}`)

    }catch(e){
        console.log(`${chalk.red.bold('Error Connecting to Database')}`, e);
        process.exit(1);
    }
};

export default connectDB;



