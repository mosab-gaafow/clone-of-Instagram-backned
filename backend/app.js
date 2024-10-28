import express from "express";
import connectDB from "./config/db.js";
import chalk from "chalk";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8000;
// app.use(morgan());
app.use(express.json());
app.use(cookieParser());
// Routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/posts', postRoute)


connectDB();

app.listen(PORT, () => {
    console.log(`${chalk.cyan.bold('Server is listening on port: ')}${chalk.yellow.bold(PORT)}`);
});



