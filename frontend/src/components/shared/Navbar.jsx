import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu, Cross, DoorClosed, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="bg-white z-10">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8 ">
                {/* Logo Section */}
                <div className="text-xl sm:text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                    Job<span className="text-[#F83002]">Hunt</span>
                </div>

                {/* Mobile Menu Icon */}
                <Button
                    className="sm:hidden text-gray-600 bg-white hover:bg-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Menu size={24} />
                </Button>

                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center gap-12 bg-white">
                    {/* Navigation Links */}
                    <ul className="flex font-medium items-center gap-5">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                            </>
                        )}
                    </ul>
                    {/* Auth Buttons */}
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-blue-600 hover:bg-[#5b30a6]">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="max-w-xs w-full">
                                <div>
                                    <div className="flex gap-2 items-center space-y-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user?.fullname}</h4>
                                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col my-2 text-gray-600">
                                        {user && user.role === 'student' && (
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <User2 />
                                                <Button variant="link">
                                                    <Link to="/profile">View Profile</Link>
                                                </Button>
                                            </div>
                                        )}
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Menu Content */}
                {menuOpen && (
                    <div className="sm:hidden fixed top-0 left-0 w-full bg-white z-50 shadow-md py-4 px-4 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-xl font-bold cursor-pointer" onClick={() => setMenuOpen(false)}>
                                Job<span className="text-[#F83002]">Hunt</span>
                            </div>
                            <Button
                                className="text-gray-600 bg-white hover:bg-white"
                                onClick={() => setMenuOpen(false)}
                            >
                                {/* <Menu size={24} /> */}
                                <X className='text' />
                            </Button>
                        </div>
                        <ul className="flex flex-col items-start gap-4">
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )}
                        </ul>
                        <div className="flex flex-col items-start gap-2 mt-4">
                            {!user ? (
                                <>
                                    <Link to="/login">
                                        <Button variant="outline" className="w-full">Login</Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">Signup</Button>
                                    </Link>
                                </>
                            ) : (
                                <div className="flex flex-col gap-2 w-full">

                                    {user.role === "student" && 
                                    <Link to="/profile" className="flex items-center gap-2">
                                        <User2 /> View Profile
                                    </Link>

                                    }
                                    <button onClick={logoutHandler} className="flex items-center gap-2">
                                        <LogOut /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Navbar;
