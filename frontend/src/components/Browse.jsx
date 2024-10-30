import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector((store) => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(''));
        };
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10 px-4">
                <h1 className="font-bold text-xl my-10">Search Results ({allJobs.length})</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allJobs.map((job) => (
                        <Job key={job._id} job={job} />
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Browse;
