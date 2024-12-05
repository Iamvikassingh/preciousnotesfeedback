import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Footer from './Footer';

const GetAllFeedback = () => {
    const apilinkforfeedback = import.meta.env.VITE_APILINK;
    const [feedbackData, setFeedbackData] = useState([]);
    const [filteredFeedback, setFilteredFeedback] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Manage loading state
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
    const [password, setPassword] = useState(''); // Store input password

    const navigate = useNavigate(); // Hook to handle navigation

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchFeedbackData = async () => {
            try {
                const response = await axios.get(`${apilinkforfeedback}/api/detailfeedback`);
                setFeedbackData(response.data);
                setFilteredFeedback(response.data);
            } catch (error) {
                console.error('Error fetching feedback data:', error);
            } finally {
                setIsLoading(false); // Stop loading once data is fetched
            }
        };

        fetchFeedbackData();
    }, [isAuthenticated]);

    // Handle search
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filteredData = feedbackData.filter(feedback =>
            Object.entries(feedback)
                .filter(([key]) => key !== '_id' && key !== 'sno') // Exclude 'S.No' or non-searchable keys
                .some(([key, value]) => value.toString().toLowerCase().includes(query))
        );

        setFilteredFeedback(filteredData);
    };

    // Handle password authentication
    const handleAuthentication = () => {
        if (password === '9625') {
            setIsAuthenticated(true);
            toast.success('Authentication successful!', { position: 'top-right' });
        } else {
            toast.error('Incorrect password. Please try again.', { position: 'top-right' });
        }
    };

    // Render the password form if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="flex justify-center items-center bg-gray-100 min-h-screen">
                <div className="bg-white shadow-lg p-6 rounded-lg w-96">
                    <h2 className="mb-4 font-bold text-2xl text-center text-gray-800">Enter Password</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="mb-4 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        onClick={handleAuthentication}
                        className="bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg w-full text-white transition duration-200"
                    >
                        Authenticate
                    </button>
                    <center className='mt-4 btn-sm'>
                        <Link
                            to="/"
                            className="bg-gray-600 hover:bg-gray-700 py-2 rounded-lg text-white transition duration-200 btn-sm"
                        >
                            <i className="bi-arrow-left-short bi"></i>back to home
                        </Link>
                    </center>
                </div>
                <ToastContainer />
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className={`relative min-h-screen p-6 ${isLoading ? 'bg-gray-200' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}`}>
                {isLoading && (
                    <div className="z-10 absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className="flex flex-col items-center">
                            <div className="border-white border-t-4 border-b-4 rounded-full w-16 h-16 animate-spin"></div>
                            <p className="mt-4 text-lg text-white">Loading feedback...</p>
                        </div>
                    </div>
                )}
                <div className="relative bg-white shadow-lg p-8 rounded-lg w-full max-w-full">
                    <h2 className="mb-6 font-bold text-4xl text-center text-gray-800">Feedback Data</h2>

                    {/* Search Input */}
                    <div className="flex justify-center mb-6">
                        <i className="text-dark bi bi-search"></i>
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search feedback by name, course, user type, department, or suggestions..."
                            className="border-gray-300 shadow-md px-4 py-2 border rounded-full focus:ring-2 focus:ring-indigo-400 w-full max-w-2xl focus:outline-none"
                        />
                    </div>

                    {/* Desktop/Tablet View: Table */}
                    <div className="lg:block hidden overflow-x-auto">
                        <table className="border-collapse min-w-full table-auto">
                            <thead>
                                <tr className="bg-indigo-600 text-white">
                                    <th className="px-4 py-3 text-left">S.No</th>
                                    <th className="px-4 py-3 text-left">Name</th>
                                    <th className="px-4 py-3 text-left">Course</th>
                                    <th className="px-4 py-3 text-left">User Type</th>
                                    <th className="px-4 py-3 text-left">Department</th>
                                    <th className="px-4 py-3 text-left">Phone</th>
                                    <th className="px-4 py-3 text-left">Rating</th>
                                    <th className="px-4 py-3 text-left">Suggestions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFeedback.length > 0 ? filteredFeedback.map((feedback, index) => (
                                    <tr key={feedback._id} className="border-b">
                                        <td className="px-4 py-3">{index + 1}</td>
                                        <td className="px-4 py-3">{feedback.name}</td>
                                        <td className="px-4 py-3">{feedback.course}</td>
                                        <td className="px-4 py-3">{feedback.userType}</td>
                                        <td className="px-4 py-3">{feedback.department}</td>
                                        <td className="px-4 py-3">{feedback.phone}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={`text-xl ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{feedback.suggestion}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="8" className="px-4 py-3 text-center text-gray-500">No feedback available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default GetAllFeedback;
