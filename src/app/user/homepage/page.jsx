"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaBook } from "react-icons/fa";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-raleway',
});

const MainHomePage = () => {
  const [titleCategories, setTitleCategories] = useState([]);
  const [categoriesByTitle, setCategoriesByTitle] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const [showModal, setShowModal] = useState(null);

  // Fetch Title Categories
  const fetchAllTitleCategories = async () => {
    const token = localStorage.getItem("operatorToken");
    try {
      const response = await axios.get("/api/admin/getalltitlecategory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    if (!Array.isArray(titleCategories) || titleCategories.length === 0) {
      setCategoriesByTitle({});
      return;
    }

    try {
      setLoading(true);
      const categoryData = {};

      await Promise.all(
        titleCategories.map(async (titleCategory) => {
          try {
            const response = await axios?.get(
              `/api/admin/getallcategory?titleCategory=${titleCategory._id}`
            );
            // Handle both array and object response formats
            const categories =
              response.data?.categories || response.data?.data || [];
            categoryData[titleCategory._id] = Array.isArray(categories)
              ? categories
              : [];
          } catch (error) {
            console.error(
              `Error fetching categories for title ${titleCategory._id}:`,
              error
            );
            categoryData[titleCategory._id] = [];
          }
        })
      );

      setCategoriesByTitle(categoryData);
    } catch (error) {
      console.error("Error in fetchAllCategories:", error);
      setCategoriesByTitle({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTitleCategories();
    setShowModal(null);
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (!selectedTitleId && titleCategories.length > 0) {
      setSelectedTitleId(titleCategories[0]._id);
    }
  }, [titleCategories]);
  const [selectedTitleId, setSelectedTitleId] = useState(titleCategories?.[0]?._id || null);

  const handleCategoryClick = (categoryId, categoryName) => {
    router.push(
      `/user/solvetestsubcategory?id=${categoryId}&name=${encodeURIComponent(
        categoryName
      )}`
    );
  };

  return (
    <div className={`${raleway.className} max-w-4xl mx-auto bg-white rounded-xl  p-4 max-h-[90vh] overflow-hidden`}  >
      {/* Heading */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Select a Category</h2>

      </div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b pb-2 overflow-x-auto">
        {titleCategories.map((titleCategory) => (
          <button
            key={titleCategory._id}
            onClick={() => setSelectedTitleId(titleCategory._id)}
            className={`pb-1 font-medium whitespace-nowrap border-b-2 transition ${selectedTitleId === titleCategory._id
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-800 border-transparent hover:text-blue-600'
              }`}
          >
            {titleCategory.title}
          </button>
        ))}
      </div>

      {/* Subcategories Grid */}
      <div className="mt-6 overflow-y-auto max-h-[65vh] pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {(categoriesByTitle[selectedTitleId] || []).map((category) => (
            <Link
              key={category._id}
              href={`/user/categorydetails?id=${category._id}`}
              className="group block bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-all hover:border-blue-500"
            >
              <div className="flex items-center justify-center h-10 w-10 mb-3 bg-gray-100 rounded-full text-xl text-blue-600">
                <FaBook />
              </div>
              <h3 className="text-md font-semibold text-gray-900">{category.name}</h3>
              {category.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {category.description}
                </p>
              )}
            </Link>
          ))}
        </div>

        {/* If no categories */}
        {loading ? (
          <div className="text-center mt-6">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            <p className="text-gray-500 mt-2">Loading categories...</p>
          </div>
        ) : (
          (!categoriesByTitle[selectedTitleId] || categoriesByTitle[selectedTitleId].length === 0) && (
            <div className="text-center text-gray-500 mt-6">
              No categories available for this section
            </div>
          )
        )}

      </div>
    </div>
  );
};

export default MainHomePage;