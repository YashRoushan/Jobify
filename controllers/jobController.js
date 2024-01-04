import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
// import { NotFoundError } from '../errors/customErrors.js';
// import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
import day from 'dayjs';


// let jobs = [
//     { id: nanoid(), company: 'apple', position: 'front-end' },
//     { id: nanoid(), company: 'dresma', position: 'back-end' }
// ];

export const getAllJob = async (req, res) => {

    console.log(req.query);
    const jobs = await Job.find({
        createdBy: req.user.userId,
        position: req.query.search,
    });
    res.status(StatusCodes.OK).json({ jobs });
}

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });

}

export const getJob = async (req, res) => {


    const job = await Job.findById(req.params.id);
    res.status(StatusCodes.OK).json({ job });
}


export const updateJob = async (req, res) => {

    // all the commented code is for the local server logic
    // const { company, position } = req.body;
    // if (!company || !position) {
    //     res.status(400).json({ msg: "Please provide company and position." });
    //     return;
    // }
    //const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    // local server logic
    // const job = jobs.find((job) => job.id === id);
    // if (!updatedJob) throw new NotFoundError(`No job with id ${id}`);
    // job.company = company;
    // job.position = position;
    res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob });
}

export const deleteJob = async (req, res) => {
    //const { id } = req.params;// param is the link 

    // all the commented code is of local server
    // const job = jobs.find((job) => job.id === id); // this was in the local environment

    const removeJob = await Job.findByIdAndDelete(req.params.id);
    // if (!removeJob) throw new NotFoundError(`No job with id ${id}`);

    // the below code is also of local environment where we have to get hte 
    // array again after deleting hte single job

    // const newJobs = jobs.filter((job) => job.id !== id);
    // jobs = newJobs;
    res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removeJob });
}


export const showStats = async (req, res) => {

    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    ]);

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {})


    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    }

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                count: { $sum: 1 },
            },
        },
        {
            $sort: {
                '_id.year': -1,
                '_id.month': -1
            }
        },
        {
            $limit: 6,
        }
    ]);

    monthlyApplications = monthlyApplications.map((item) => {
        const { _id: { year, month }, count } = item;

        const date = day()
            .month(month - 1)
            .year(year)
            .format('MMM YY');
        return { date, count };
    }).reverse();




    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
} 