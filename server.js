import 'express-async-errors';// ! this import should be always at the very very top of the page.
import * as dotenv from 'dotenv';
dotenv.config();
// now we need to add the .js extension to import from a file on node unlike in vite.
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from 'mongoose';


//  custom imports

import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}



// app.use(morgan('dev')); // this is printing the request for the 2nd time therefore commented out.
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);


// this code was before the jobController folder was made
// // but this was simple to understand
// // ! GET ALL JOBS
// app.get('/api/v1/jobs')
// // ! CREATE JOB
// app.post('/api/v1/jobs');
// // ! GET SINGLE JOB
// app.get('/api/v1/jobs/:id');
// // ! EDIT JOB
// app.patch('/api/v1/jobs/:id');
// // ! DELETE JOBS
// app.delete('/api/v1/jobs/:id');

// this will work at the last
app.use('*', (req, res) => {
    res.status(404).json({ msg: "not found" });
});


// this thing has been handled by errorHandlerMiddleware
// app.use((err, req, res, next) => {
//     console.log(err);
//     res.status(500).json({ msg: "something went wrong in the server or the logic of your code." });
// })
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5100;

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`server running at port ${port}...`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}
