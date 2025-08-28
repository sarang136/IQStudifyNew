
// components/Navbar.js
"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiUser, FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Navbar({ setShowModal }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const dropdownRef = useRef();
    const searchInputRef = useRef();
    const router = useRouter();

    useEffect(() => {
        const handleUserChange = () => {
            const id = localStorage.getItem("userId");
            const name = localStorage.getItem("name");
            setUserId(id);
            setUserName(name);
        };

        handleUserChange(); // initialize on mount
        window.addEventListener("user-auth-changed", handleUserChange);

        return () => {
            window.removeEventListener("user-auth-changed", handleUserChange);
        };
    }, []);

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus search input when searchOpen
    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        window.dispatchEvent(new Event("user-auth-changed"));
        setUserId(null);
        setDropdownOpen(false);
        router.push("/");
    };

    const handleExamClick = () => {
        if (userId) {
            router.push("/user/exam");
        } else {
            alert("Please log in to access the Exam");
            setShowModal("login");
        }
    };

    return (
        <header className="bg-white fixed top-0 left-0 mt-5 z-50 w-[calc(100%-5rem)] mx-10 rounded-md shadow">
            <div className="flex justify-between items-center py-2 px-4 sm:px-6 lg:px-10">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
                    <img src="/logo.png" alt="Logo" className="w-20 h-10 object-contain" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <Link href="/">Home</Link>
                    <span onClick={() => setShowModal('category')} className="cursor-pointer">Category</span>
                    <Link href="#about">About Us</Link>
                    <span onClick={handleExamClick} className="cursor-pointer">Exam</span>
                </nav>

                {/* Right side - Desktop */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Search input and icon for desktop only */}
                    <div className="relative flex items-center">
                        <button
                            type="button"
                            aria-label="Search"
                            className="p-2 rounded-full border border-gray-200 hover:bg-blue-50 transition-colors"
                            onClick={() => setSearchOpen((prev) => !prev)}
                            tabIndex={0}
                        >
                            <FiSearch className="text-xl text-gray-600" />
                        </button>
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            placeholder="Search..."
                            className={`
                                absolute right-full mr-2
                                transition-all duration-300
                                bg-gray-100 border border-gray-300 rounded-md px-3 py-1
                                text-sm text-gray-700
                                ${searchOpen ? "w-48 opacity-100 pointer-events-auto" : "w-0 opacity-0 pointer-events-none"}
                                focus:outline-none
                                z-10
                            `}
                            style={{
                                minWidth: 0,
                                // The input expands to the left of the icon
                            }}
                        />
                    </div>
                    {!userId ? (
                        <>
                            <button
                                onClick={() => setShowModal("login")}
                                className="px-4 py-2 border border-blue-800 text-blue-800 rounded-sm hover:bg-blue-50"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => setShowModal("signup")}
                                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <div className="relative" ref={dropdownRef}>
                            <div className="flex items-center gap-5">
                                {userName && (
                                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                                        {userName}
                                    </span>
                                )}
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="p-2 rounded-full border hover:bg-blue-100"
                                >
                                    <FiUser className="text-xl text-blue-800" />
                                </button>
                            </div>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                                    <button
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            router.push("/user/profile");
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            router.push("/user/savedQuestions");
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Saved Questions
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile menu toggle */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {menuOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuOpen(false)}
                >
                    <div
                        className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-sm md:hidden px-6 py-6 bg-white shadow z-50 rounded-md"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* 🔍 Mobile Search */}
                        <div className="relative flex items-center mb-4">
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchValue}
                                onChange={e => setSearchValue(e.target.value)}
                                placeholder="Search..."
                                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none"
                            />
                            <button
                                type="button"
                                aria-label="Search"
                                className="absolute right-2 text-gray-600"
                            >
                                <FiSearch className="text-xl" />
                            </button>
                        </div>

                        {/* Mobile Nav Links */}
                        <nav className="flex flex-col space-y-3 text-gray-700 font-medium pb-2"
                        onClick={() => setMenuOpen(false)}
                        >
                            <Link href="/" className="py-1 px-2 rounded hover:bg-gray-100 transition">Home</Link>
                            <span
                                onClick={() => {setShowModal("category")}}
                                className="cursor-pointer py-1 px-2 rounded hover:bg-gray-100 transition"
                            >
                                Category
                            </span>
                            <Link href="#about" className="py-1 px-2 rounded hover:bg-gray-100 transition">About Us</Link>
                            <span
                                onClick={handleExamClick}
                                className="cursor-pointer py-1 px-2 rounded hover:bg-gray-100 transition"
                            >
                                Exam
                            </span>
                        </nav>

                        {/* Mobile Auth Buttons */}
                        <div className="mt-6 flex flex-col space-y-2">
                            {!userId ? (
                                <>
                                    <button
                                        onClick={() => setShowModal("login")}
                                        className="px-4 py-2 border border-blue-800 text-blue-800 rounded-md hover:bg-blue-50 transition"
                                    >
                                        Log In
                                    </button>
                                    <button
                                        onClick={() => setShowModal("signup")}
                                        className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => router.push("/user/profile")}
                                        className="px-4 py-2 rounded bg-gray-100 text-left font-medium hover:bg-gray-200 transition"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => router.push("/user/savedQuestions")}
                                        className="px-4 py-2 rounded bg-gray-100 text-left font-medium hover:bg-gray-200 transition"
                                    >
                                        Saved Questions
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 text-red-600 rounded hover:bg-gray-100 text-left font-medium transition"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </header>
    );
}