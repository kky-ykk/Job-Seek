import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data"]
    },
    {
        fitlerType: "Salary",
        array: ["3", "5", "8", "10", "15", "30"] // Representing in K for simplicity
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [salaryValue, setSalaryValue] = useState(0); // Initial salary value
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    const handleSliderChange = (e) => {
        const value = parseInt(e.target.value);
        setSalaryValue(value);
        setSelectedValue(value+"");
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    // Define min, max, and step for the slider based on the Salary range
    const salaryArray = fitlerData.find(item => item.fitlerType === "Salary").array.map(Number);
    const minSalary = salaryArray[0];
    const maxSalary = salaryArray[salaryArray.length - 1];
    const step = 2; // Step based on the values in salaryArray

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.fitlerType === "Salary" ?
                                    (
                                        <div className='flex flex-col my-2'>
                                            <Label htmlFor="salaryRange">Salary: {salaryValue} LPA</Label>
                                            <input
                                                type="range"
                                                id="salaryRange"
                                                min={minSalary}
                                                max={maxSalary}
                                                step={step}
                                                value={salaryValue}
                                                onChange={handleSliderChange}
                                                className="slider accent-blue-500"
                                            />
                                            <div className="flex justify-between mt-2 text-gray-500 text-sm">
                                                {salaryArray.map((value, idx) => (
                                                    <span key={idx}>{value} </span>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                    :
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`;
                                        return (
                                            <div className='flex items-center space-x-2 my-2' key={idx}>
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label htmlFor={itemId}>{item}</Label>
                                            </div>
                                        );
                                    })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
