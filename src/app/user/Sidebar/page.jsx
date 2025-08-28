"use client";
import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronDown, FaTimes } from "react-icons/fa"

export default function Sidebar({ titleCategories, categoriesByTitle, onSelectCategory, selected, subcategoryCounts, sidebarOpen, setSidebarOpen }) {
    const [expandedTitleId, setExpandedTitleId] = useState(null);
    // useEffect(() => {
    //     if (titleCategories.length && !expandedTitleId) {
    //         setExpandedTitleId(titleCategories[0]._id); // auto expand first
    //     }
    // }, [titleCategories]);
    useEffect(() => {
        if (selected?.category && selected?.title) {
            setExpandedTitleId(selected.title._id);
        }
    }, [selected]);

    return (
        <>
            {/* Sidebar overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${sidebarOpen ? "block" : "hidden"
                    }`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Sidebar container */}
            {/* <aside
                className={`fixed z-40 md:static bg-white shadow-xl px-5 py-6  min-h-screen overflow-y-auto w-72 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            > */}

            <aside
                className={`fixed z-40 md:fixed bg-white shadow-xl px-5 py-6 min-h-screen overflow-y-auto w-72 transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >

                {/* Close button on mobile */}
                {/* <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 mt-20 md:hidden"
                >
                    <FaTimes className="text-gray-700 text-lg" />
                </button> */}

                <h2 className="text-lg font-bold text-gray-700 mb-6 uppercase tracking-wide mt-28 sm:mt-20">
                    MCQ Categories
                </h2>

                {titleCategories.map((title) => {
                    const isExpanded = expandedTitleId === title._id;
                    const categories = categoriesByTitle[title._id] || [];

                    return (
                        <div key={title._id} className="mb-4">
                            <button
                                onClick={() =>
                                    setExpandedTitleId(isExpanded ? null : title._id)
                                }
                                className="w-full flex items-center justify-between text-gray-800 font-semibold text-base hover:text-blue-600 transition"
                            >
                                <span>{title.title}</span>
                                {isExpanded ? (
                                    <FaChevronDown className="text-sm" />
                                ) : (
                                    <FaChevronRight className="text-sm" />
                                )}
                            </button>

                            {isExpanded && (
                                <ul className="mt-3 space-y-1 pl-2">
                                    {categories.length > 0 ? (
                                        categories.map((category) => (
                                            <li key={category._id}>
                                                <button
                                                    onClick={() => {
                                                        onSelectCategory(title, category);
                                                        setSidebarOpen(false); // auto close on mobile
                                                    }}
                                                    className={`flex justify-between text-start items-center w-full text-sm px-3 py-1 rounded-md transition ${selected.category?._id === category._id
                                                        ? "bg-blue-100 text-blue-700 font-medium"
                                                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    <span>{category.name}</span>
                                                    <span className="text-xs text-gray-400">
                                                        {subcategoryCounts?.[category._id] ?? "--"}
                                                    </span>
                                                </button>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-sm text-gray-400 px-3 py-1">
                                            No categories found
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </aside >
        </>

    );
}

