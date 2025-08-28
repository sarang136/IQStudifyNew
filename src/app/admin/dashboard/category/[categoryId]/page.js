"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function CategoryPage() {
  const { categoryId } = useParams(); // Actually titleId
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/admin/getallcategory");
        const allCategories = res.data.categories || res.data.data || [];

        const filteredCategories = allCategories.filter((cat) => {
          const titleId =
            typeof cat?.titleCategory === "string"
              ? cat.titleCategory
              : cat?.titleCategory?._id;

          return String(titleId) === String(categoryId);
        });

        setCategories(filteredCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categoryId]);

  return (
    <div className="min-h-screen ">
     <div className="shadow-sm p-8">
       <h1 className="text-2xl text-black font-bold">Categories({categories.length})</h1>
     </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 place-items-center p-4 bg-[#74CDFF26]">
          {categories.map((cat) => (
            <Link key={cat._id} href={`/admin/dashboard/subcategory/${cat._id}`}>
              <div
                className="p-4 bg-white shadow rounded-md text-center 
                w-[80vw] sm:w-[80%] md:w-[60%] lg:w-[20vw] 
                h-auto lg:h-[15vh] flex items-center justify-center cursor-pointer 
                hover:shadow-md transition"
              >
                <h2 className="text-md font-medium text-[#072B78] truncate">
                  {cat.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-6">
          No categories found for this title.
        </p>
      )}
    </div>
  );
}
