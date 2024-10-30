import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="text-center px-2 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-blue-100 to-white rounded-b-3xl">
            <div className="flex flex-col gap-5 my-10 animate-fadeIn">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-gray-800 ">
                    Search, Apply & <br /> 
                    Get Your <span className="text-blue-600">Dream Jobs</span>
                </h1>
                <p className="text-sm sm:text-base max-w-xl mx-auto text-gray-600">
                    Discover thousands of job opportunities that match your passion and skills. Start your journey today.
                </p>
                <div className="flex w-full sm:w-3/4 lg:w-1/2 shadow-md bg-white border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto transition-transform duration-300 transform hover:shadow-lg">
                    <input
                        type="text"
                        placeholder="Find your dream job"
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full text-sm sm:text-base px-2 py-2 text-gray-700 rounded-full"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-r-full bg-blue-600 hover:bg-blue-700 px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        <Search className="h-5 w-5 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
