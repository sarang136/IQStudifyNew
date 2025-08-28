"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaPenFancy,
} from "react-icons/fa";

import TotalOperatorCard from "../totaloperator/page";
import TotalUsersCard from "../TotalUsersCard/page";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

function SAdminDashboard() {
  const [statusCounts, setStatusCounts] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
    draft: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("operatorToken");
    if (!token) return;

    const statuses = ["approved", "pending", "rejected", "draft"];

    const fetchCounts = async () => {
      try {
        const results = await Promise.all(
          statuses.map((status) =>
            axios.get(`/api/superadmin/allstatusquestions?status=${status}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          )
        );

        const newCounts = {};
        results.forEach((res, idx) => {
          newCounts[statuses[idx]] = res.data.length;
        });

        setStatusCounts(newCounts);
      } catch (err) {
        console.error("❌ Failed to fetch status counts:", err);
      }
    };

    fetchCounts();
  }, []);

  const cards = [
    {
      label: "Approved",
      count: statusCounts.approved,
      color: "green",
      icon: <FaCheckCircle />,
    },
    {
      label: "Pending",
      count: statusCounts.pending,
      color: "yellow",
      icon: <FaHourglassHalf />,
    },
    {
      label: "Rejected",
      count: statusCounts.rejected,
      color: "red",
      icon: <FaTimesCircle />,
    },
    {
      label: "Draft",
      count: statusCounts.draft,
      color: "blue",
      icon: <FaPenFancy />,
    },
  ];

  return (
    <>

      {!cards ? (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <span className="text-gray-600 text-lg font-medium">Loading Data...</span>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-white p-4 md:p-8">
          {/* <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
            📊 Super Admin Dashboard
          </h1> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-poppins">
            {cards.map((card, i) => (
              <motion.div
                key={card.label}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center space-x-4 transition hover:scale-105"
              >
                <div className="flex items-center justify-center w-12 h-12 border border-blue-500 rounded-full text-blue-500 text-xl">
                  {card.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-normal text-gray-800">{card.count}</h2>
                  <p className="text-gray-500 text-sm">{card.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <TotalOperatorCard />
          <TotalUsersCard />

        </div>
      )}



    </>
  )
}



export default SAdminDashboard;
