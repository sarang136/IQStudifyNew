'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUsers, FaUserCheck } from "react-icons/fa";

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const TotalOperatorCard = () => {
    const [operators, setOperators] = useState([]);
    const [loggedInOperators, setLoggedInOperators] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOperators();
        fetchLoggedInOperators();
    }, []);

    const fetchOperators = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/admin/getoperator");
            setOperators(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchLoggedInOperators = async () => {
        try {
            const response = await axios.get("/api/admin/loggedinoperators");
            console.log(response);

            setLoggedInOperators(response.data.count);
        } catch (err) {
            console.error("Error fetching logged-in operators:", err.message);
        }
    };

    return (
        <div className="space-y-4 py-8 font-poppins">
            {loading && (
                <div className="flex justify-center items-center space-x-2">
                    <div className="w-5 h-5 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    <span className="text-gray-600">Loading operator data...</span>
                </div>
            )}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Operators Card */}
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center space-x-4 transition hover:scale-105"
                    >
                        <div className="flex items-center justify-center w-12 h-12 border border-blue-500 rounded-full text-blue-500 text-xl">
                            <FaUsers />
                        </div>
                        <div>
                            <div className="text-2xl font-normal text-gray-800">{operators.length}</div>
                            <div className="text-gray-500 text-sm">Total Operators</div>
                        </div>
                    </motion.div>

                    {/* Logged-in Operators Card */}
                    <motion.div
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center space-x-4 transition hover:scale-105"
                    >
                        <div className="flex items-center justify-center w-10 h-10 border border-green-500 rounded-full text-green-500 text-xl">
                            <FaUserCheck />
                        </div>
                        <div>
                            <div className="text-2xl font-normal text-gray-800">{loggedInOperators}</div>
                            <div className="text-gray-500 text-sm">Logged-in Operators</div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default TotalOperatorCard;
