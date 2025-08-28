"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/page";
import Link from "next/link";
import { FaBars, FaClock, FaListOl, FaTimes, FaTrophy } from "react-icons/fa";
import { Raleway } from 'next/font/google';
import { MdOutlinePlayArrow } from 'react-icons/md'

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // You can include other weights if needed
    variable: '--font-raleway',
});

export default function CategoryDetailsPage() {

    const searchParams = useSearchParams();
    const categoryId = searchParams.get("id");
    // useEffect(() => {
    //     console.log("Router param id:", id);
    // }, [id]);
    console.log("categoryIdFromParams", categoryId);

    const [titleCategories, setTitleCategories] = useState([]);
    const [categoriesByTitle, setCategoriesByTitle] = useState({});
    const [selected, setSelected] = useState({ title: null, category: null });
    const [subcategories, setSubcategories] = useState([]);
    const [subcategoryCounts, setSubcategoryCounts] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loadingSubcategories, setLoadingSubcategories] = useState(false);


    useEffect(() => {
        fetchAllTitleCategories();
    }, []);

    const fetchAllTitleCategories = async () => {
        const token = localStorage.getItem("operatorToken");
        try {
            const response = await axios.get("/api/admin/getalltitlecategory", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setTitleCategories(response.data);
            await fetchAllCategories(response.data);
        } catch (err) {
            console.error("Title category error:", err);
        }
    };

    const fetchAllCategories = async (titleCategories) => {
        const categoryData = {};
        // setLoadingSubcategories(true);

        try {
            await Promise.all(
                titleCategories.map(async (title) => {
                    try {
                        const res = await axios.get(`/api/admin/getallcategory?titleCategory=${title._id}`);
                        const categories = res.data?.data || res.data?.categories || [];

                        categories.forEach((cat) => {
                            const titleId = typeof cat.titleCategory === "string"
                                ? cat.titleCategory
                                : cat.titleCategory?._id;

                            if (!titleId) return;

                            if (!categoryData[titleId]) {
                                categoryData[titleId] = [];
                            }

                            categoryData[titleId].push(cat);
                        });
                    } catch (err) {
                        console.error(`Category fetch error for ${title.title}:`, err);
                    }
                })
            );

            console.log("✅ Grouped categories by titleId:", categoryData);
            setCategoriesByTitle(categoryData);
        } catch (error) {
            console.error("Error in fetchAllCategories:", error);
            setCategoriesByTitle({});
        }
    };

    const handleCategorySelect = async (title, category) => {
        setSelected({ title, category });
        setLoadingSubcategories(true);

        try {
            const res = await axios.get(`/api/admin/getallsubcategory?id=${category._id}`);
            const fetched = res.data?.subcategories || [];

            setSubcategories(fetched);

            // ⬇ Store subcategory count for this category
            setSubcategoryCounts((prev) => ({
                ...prev,
                [category._id]: fetched.length,
            }));
        } catch (err) {
            console.error("Subcategory fetch error:", err);
            setSubcategories([]);

            setSubcategoryCounts((prev) => ({
                ...prev,
                [category._id]: 0,
            }));
        } finally {
            setLoadingSubcategories(false); // 👈 THIS IS REQUIRED!
        }
    };

    useEffect(() => {
        if (!categoryId || Object.keys(categoriesByTitle).length === 0 || titleCategories.length === 0) return;

        let foundCategory = null;
        let foundTitle = null;

        Object.entries(categoriesByTitle).forEach(([titleId, cats]) => {
            cats.forEach((cat) => {
                if (cat._id === categoryId) {
                    foundCategory = cat;
                    foundTitle = titleCategories.find((t) => t._id === titleId);
                }
            });
        });

        if (foundCategory && foundTitle) {
            handleCategorySelect(foundTitle, foundCategory);
        }
    }, [categoryId, categoriesByTitle, titleCategories]);


    return (
        <div className={` ${raleway.className} flex bg-gray-100 `}>
            {/* Hamburger / Close for mobile */}
           



            {/* Sidebar */}

            <Sidebar
                titleCategories={titleCategories}
                categoriesByTitle={categoriesByTitle}
                selected={selected}
                onSelectCategory={handleCategorySelect}
                subcategoryCounts={subcategoryCounts}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}

            />
            {/* Right Section */}
            <main className="flex-1 p-6 sm:ml-72  min-h-screen overflow-y-auto">
                <h1 className="text-3xl font-bold mb-2 text-gray-800  mt-20"></h1>

                {selected.title && (
                    <div className="flex justify-between items-center py-4">
                        <h2 className="text-2xl font-semibold text-gray-700">{selected.title.title}</h2>
                    <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="md:hidden   z-50 bg-white rounded p-2 shadow"
                >
                    {sidebarOpen ? (
                        <FaTimes className="text-xl text-gray-700" />
                    ) : (
                        <FaBars className="text-xl text-gray-700" />
                    )}
                </button>
                    </div>
                )}

                {/* Subcategories Grid */}
                {loadingSubcategories && (
                    <div className="text-center mt-6">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                        <p className="text-gray-600 mt-2">Loading subcategories...</p>
                    </div>
                )}

                {!loadingSubcategories && subcategories.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                        {subcategories.map((subcat) => (
                            <div
                                key={subcat._id}
                                className="bg-white p-5 rounded-lg shadow-lg transition duration-300 h-[100px]"
                            >
                                <Link
                                    href={`/user/testsection?id=${subcat._id}`}
                                    className="flex items-center justify-between gap-2 hover:text-blue-700 transition"
                                >
                                    <h3 className="text-lg font-semibold break-words whitespace-normal line-clamp-2 w-[200px] truncate">
                                        {subcat.name}
                                    </h3>
                                    <MdOutlinePlayArrow className="text-2xl" />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {!loadingSubcategories && subcategories.length === 0 && (
                    <div className="text-center text-gray-700 mt-6">
                        No subcategories found.
                    </div>
                )}

            </main>
        </div>
    );
}

