import React from 'react';

const ShimmerCard = () => {
    return (
        <div className="p-5 sm:p-4 md:p-6 rounded-md shadow-xl bg-white border border-gray-100 animate-pulse">
            {/* Company and Location Shimmer */}
            <div className="mb-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
            </div>

            {/* Job Title and Description Shimmer */}
            <div className="mb-3">
                <div className="h-5 w-1/2 bg-gray-200 rounded mb-3"></div>
                <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-200 rounded"></div>
                    <div className="h-3 w-full bg-gray-200 rounded"></div>
                    <div className="h-3 w-4/5 bg-gray-200 rounded"></div>
                </div>
            </div>

            {/* Job Badges Shimmer */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default ShimmerCard;
