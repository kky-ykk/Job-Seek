import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="w-full  max-w-2xl mx-auto px-4 my-4">
            <Carousel className="w-full max-w-xl mx-auto my-5">
                <CarouselPrevious className="hidden sm:block" />
                <CarouselContent className="flex gap-1  w-full px-4 justify-center">
                    {category.map((cat, index) => (
                        <CarouselItem 
                            key={index} 
                            className="md:basis-1/2 lg-basis-1/3"
                        >
                            <Button 
                                onClick={() => searchJobHandler(cat)} 
                                variant="outline" 
                                className="rounded-full text-sm sm:text-base px-6 py-2 whitespace-nowrap"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className="hidden sm:block" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
