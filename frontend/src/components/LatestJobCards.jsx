import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className="p-5 sm:p-4 md:p-6 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer 
                        transition-transform transform hover:scale-105"
        >
            {/* Company and Location */}
            <div className="mb-3">
                <h1 className="font-medium text-lg sm:text-base md:text-lg">{job?.company?.name}</h1>
                <p className="text-sm sm:text-xs md:text-sm text-gray-500">India</p>
            </div>

            {/* Job Title and Description */}
            <div className="mb-3">
                <h1 className="font-bold text-xl sm:text-lg md:text-xl my-2">{job?.title}</h1>
                <p className="text-sm sm:text-xs md:text-sm text-gray-600 line-clamp-2 md:line-clamp-3">
                    {job?.description}
                </p>
            </div>

            {/* Job Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="text-blue-700 font-bold text-xs sm:text-xs md:text-sm" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-[#F83002] font-bold text-xs sm:text-xs md:text-sm" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-bold text-xs sm:text-xs md:text-sm" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
