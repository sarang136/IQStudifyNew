"use client";

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import {
    FaFileAlt, FaChartPie, FaQuestionCircle, FaUserPlus, FaUsers, FaUserCog, FaCheckCircle,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
    { path: "/admin/superAdminDashboard/sAdminDashboard", name: "Record", icon: <FaFileAlt /> },
    { path: "/admin/superAdminDashboard/allInfo", name: "AllData", icon: <FaChartPie /> },
    { path: "/admin/superAdminDashboard/viewQuestion", name: "View Questions", icon: <FaQuestionCircle /> },
    { path: "/admin/superAdminDashboard/addOperator", name: "Add Operator", icon: <FaUserPlus /> },
    { path: "/admin/superAdminDashboard/alloperator", name: "Operators Management", icon: <FaUsers /> },
    { path: "/admin/superAdminDashboard/usermanagement", name: "User Management", icon: <FaUserCog /> },
    { path: "/admin/superAdminDashboard/forapprove", name: "For Approve", icon: <FaCheckCircle /> },
];

export default function DashboardLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) router.push("/admin/login");
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/admin/AdminLogin");
    };

    return (
        <div className="flex h-screen bg-white text-black">
            {/* Sidebar */}
            <div
                className={`fixed md:relative inset-y-0 left-0 bg-white h-screen overflow-y-auto transition-transform duration-300 z-40 p-4 shadow-xl font-poppins w-64 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
            >
                {/* Close button (Mobile) */}
                <button onClick={() => setIsOpen(false)} className="text-2xl mb-4 md:hidden">
                    ✖
                </button>

                {/* Logo */}
                <div className="flex justify-center mb-2">
                    <Image src="/logo.png" alt="Logo" width={150} height={150} />
                </div>

                {/* User Info */}
                <div className="flex flex-col items-center mb-6">
                    <div className="p-4 rounded-full text-white text-3xl mb-2 bg-orange-500">
                        <FaUser />
                    </div>
                    <p className="font-medium">Admin</p>
                </div>


                {/* Menu */}
                <nav className="space-y-2 mt-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 p-2 rounded-full transition-colors ${isActive ? "bg-orange-500 text-white" : "hover:bg-orange-100 text-black"
                                    }`}
                            >
                                <div
                                    className={`p-2 rounded-full ${isActive ? "bg-white text-orange-500" : "bg-blue-100 text-black"
                                        }`}
                                >
                                    {item.icon}
                                </div>
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="mt-6 ml-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm text-white"
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>

            {/* Backdrop on mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Main Content with vertical scroll */}
            <div className="flex-1 p-6 overflow-y-auto w-full text-gray-800 max-h-screen">
                {/* Sidebar open button (Mobile) */}
                <button
                    className="md:hidden fixed top-4 left-4 bg-gray-700 text-white p-2 rounded-full z-50"
                    onClick={() => setIsOpen(true)}
                >
                    <FaBars size={24} />
                </button>

                {children}
            </div>
        </div>

    );
}
