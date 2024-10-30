import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import ShimmerCard from './ShimmerCard';

const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const filteredJobs = searchedQuery
            ? allJobs.filter(job => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase()) || 
                    (job.salary < +searchedQuery);
            })
            : allJobs;

        setFilterJobs(filteredJobs);
        setLoading(false);
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className="flex flex-wrap max-w-7xl mx-auto mt-5 gap-5">
                {/* Filter Card */}
                <div className="w-full md:w-1/4 lg:w-1/5 mb-5 md:mb-0"> 
                    <FilterCard />
                </div>
                
                {/* Job Cards */}
                <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                    {loading ? (
                        <ShimmerCard/>
                    ) : (
                        filterJobs.length <= 0 ? (
                            <span>Job not found</span>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filterJobs.map((job, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                        className="h-full"
                                    >
                                        <Job job={job} key={idx} />
                                    </motion.div>
                                ))}
                            </div>
                        )
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Jobs;
