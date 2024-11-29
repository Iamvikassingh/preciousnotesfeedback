import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const GetAllFeedback = () => {
    const apilinkforfeedback = import.meta.env.VITE_APILINK;
    const [feedbackData, setFeedbackData] = useState([]);

    // Fetching all feedback data when the component is mounted
    useEffect(() => {
        const fetchFeedbackData = async () => {
            try {
                const response = await axios.get(`${apilinkforfeedback}/api/detailfeedback`);
                setFeedbackData(response.data);
            } catch (error) {
                console.error('Error fetching feedback data:', error);
            }
        };

        fetchFeedbackData();
    }, []);

    return (
        <>
            <Header />
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 min-h-screen">
                <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-full">
                    <h2 className="mb-6 font-bold text-4xl text-center text-gray-800">Feedback Data</h2>

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
                                {feedbackData.length > 0 ? feedbackData.map((feedback, index) => (
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

                    {/* Mobile View: Cards */}
                    <div className="block lg:hidden">
                        {feedbackData.length > 0 ? feedbackData.map((feedback, index) => (
                            <div key={feedback._id} className="bg-gray-100 shadow-md mb-4 p-4 rounded-lg">
                                <p><strong>S.No:</strong> {index + 1}</p>
                                <p><strong>Name:</strong> {feedback.name}</p>
                                <p><strong>Course:</strong> {feedback.course}</p>
                                <p><strong>User Type:</strong> {feedback.userType}</p>
                                <p><strong>Department:</strong> {feedback.department}</p>
                                <p><strong>Phone:</strong> {feedback.phone}</p>
                                <p>
                                    <strong>Rating:</strong>
                                    <span className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={`text-xl ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                        ))}
                                    </span>
                                </p>
                                <p><strong>Suggestions:</strong> {feedback.suggestion}</p>
                            </div>
                        )) : (
                            <p className="text-center text-gray-500">No feedback available</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default GetAllFeedback;
