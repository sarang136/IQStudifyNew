



"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import axios from "axios";
import { Raleway } from "next/font/google";


const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-raleway',
});

const SubcategoryPageContent = () => {
    const searchParams = useSearchParams();
    const categoryId = searchParams.get("id");
    const categoryName = searchParams.get("name") || "Category";

    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(categoryId, "JJJ");

    useEffect(() => {
        if (categoryId) {
            setLoading(true);

            axios
                .get(`/api/admin/getallsubcategory`, {
                    params: { id: categoryId }
                })
                .then((res) => {
                    // setSubcategories(res.data.subcategories || []);
                    setSubcategories(Array.isArray(res.data.subcategories) ? res.data.subcategories : []);

                })
                .catch((error) => {
                    setSubcategories([]);
                    console.error("Axios error fetching subcategories:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [categoryId]);


    useEffect(() => {
        const fetchSubcategories = async () => {
            if (!categoryId) return;

            try {
                setLoading(true);
                // setError(null);

                const response = await fetch(`/api/admin/getallsubcategory?id=${categoryId}`);
                if (!response.ok) throw new Error('Failed to fetch subcategories');

                const data = await response.json();
                // Handle both array and object response formats
                const subcategoriesData = data?.subcategories || data?.data || data || [];
                setSubcategories(Array.isArray(subcategoriesData) ? subcategoriesData : []);
            } catch (err) {
                console.error("Error fetching subcategories:", err);

                setSubcategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSubcategories();
    }, [categoryId]);
    if (!categoryId) return <p className="text-red-500">Invalid category</p>;

    return (
        <div className={`${raleway.className} min-h-screen bg-gray-50`} >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8 mt-20">
                    <div className="flex items-center gap-3 mb-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <nav className="text-sm text-gray-500">
                            <span>Categories</span>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900 font-medium">{categoryName}</span>
                        </nav>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
                        <p className="text-gray-600">Choose a subcategory to begin your exam</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="flex flex-col justify-center items-center py-16">
                            <div className="relative mb-4">
                                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                            </div>
                            <p className="text-gray-600 text-sm font-medium">Loading subcategories...</p>
                        </div>
                    ) : (
                        <>
                            {/* Subcategories Header */}
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Available Subcategories
                                    </h2>
                                    <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                                        {subcategories?.length || 0} items
                                    </span>
                                </div>
                            </div>

                            {/* Subcategories Grid */}
                            <div className="p-6">
                                {subcategories?.length > 0 ? (
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {subcategories.map((sub, index) => (
                                            <Link key={sub._id} href={`/user/exam/examsection?id=${sub._id}`}>
                                                <div className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors">
                                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors truncate">
                                                                {sub.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-500 mt-1">Click to start exam</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No subcategories found</h3>
                                        <p className="text-gray-500 max-w-md mx-auto">
                                            There are no subcategories available for "{categoryName}" at the moment.
                                        </p>
                                        <a href="/user/exam" className="mt-8 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                            Go Back
                                        </a>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
};

const SubcategoryPage = () => (
    <Suspense fallback={<p>Loading...</p>}>
        <SubcategoryPageContent />
    </Suspense>
);

export default SubcategoryPage;
