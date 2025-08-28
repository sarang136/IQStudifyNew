


"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Raleway } from "next/font/google";

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-raleway',
});

const ExamHome = () => {
    const [titleCategories, setTitleCategories] = useState([]);
    const [categoriesByTitle, setCategoriesByTitle] = useState({});
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch Title Categories
    const fetchAllTitleCategories = async () => {
        try {
            const response = await axios.get("/api/admin/getalltitlecategory");
            setTitleCategories(response.data);
            await fetchAllCategories(response.data); // Fetch all categories after getting title categories
        } catch (error) {
            console.error("Error fetching title categories:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch Categories for All Title Categories
    const fetchAllCategories = async (titleCategories) => {
        try {
            const categoryData = {};
            await Promise.all(
                titleCategories.map(async (titleCategory) => {
                    const response = await axios.get(
                        `/api/admin/getallcategory?titleCategory=${titleCategory._id}`
                    );
                    const categories = response.data?.data;
                    console.log(categories, "fetched categories for", titleCategory.title);

                    categoryData[titleCategory._id] = Array.isArray(categories) ? categories : [];
                    // categoryData[titleCategory._id] = response.data.categories || [];
                })
            );
            setCategoriesByTitle(categoryData);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchAllTitleCategories();
    }, []);

    const router = useRouter();

    const handleCategoryClick = (categoryId, categoryName) => {
        router.push(`/user/exam/subcategory?id=${categoryId}&name=${encodeURIComponent(categoryName)}`);
    };
    // const handleCategoryClick = (categoryId, categoryName) => {
    //     if (window.location.pathname === "/user/exam") {
    //         router.push(`/user/subcategory?id=${categoryId}&name=${encodeURIComponent(categoryName)}`);
    //     } else {
    //         router.push(`/user/solvetestsubcategory?id=${categoryId}&name=${encodeURIComponent(categoryName)}`);
    //     }
    // };

    return (
        <main className={`${raleway.className} min-h-screen bg-gray-50`} >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
                {loading ? (
                    <div className="flex flex-col justify-center items-center min-h-[60vh]">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-4 text-gray-600 text-sm font-medium">Loading categories...</p>
                    </div>
                ) : (
                    <>
                        {/* Header Section */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
                            <p className="text-gray-600">Browse through our organized category collections</p>
                        </div>

                        {/* Categories Grid */}
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {titleCategories.map((titleCategory, index) => (
                                <div
                                    key={index}
                                    className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 overflow-hidden"
                                >
                                    {/* Card Header */}
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5">
                                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-200 rounded-full"></div>
                                            {titleCategory.title}
                                        </h2>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-4">
                                        {categoriesByTitle[titleCategory._id]?.length > 0 ? (
                                            <div className="space-y-1">
                                                {categoriesByTitle[titleCategory._id].map((category, i) => (
                                                    <div
                                                        key={i}
                                                        onClick={() => handleCategoryClick(category._id, category.name)}
                                                        className="flex items-center gap-2 p-2 rounded hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200 cursor-pointer group/item"
                                                    >
                                                        <div className="w-1 h-1 bg-blue-400 rounded-full group-hover/item:bg-blue-600 transition-colors"></div>
                                                        <span className="text-gray-700 group-hover/item:text-blue-900 font-medium text-sm">
                                                            {category.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <p className="text-gray-500 text-sm">No categories available</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Footer */}
                                    {/* <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                                        <span className="text-xs text-gray-500 font-medium">
                                            {categoriesByTitle[titleCategory._id]?.length || 0} categories
                                        </span>
                                    </div> */}
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {titleCategories.length === 0 && (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories found</h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    There are no categories to display at the moment. Please check back later.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
};

export default ExamHome;
