"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

export default function SubcategoryPage() {
  const { subcategoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [categoryName, setCategoryName] = useState("...");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!subcategoryId) return;

    const fetchSubcategories = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/admin/getallsubcategory");
        const allSubs = res.data.subcategories || [];

        const filtered = allSubs.filter(
          (sub) => sub?.category?._id === subcategoryId
        );

        setSubcategories(filtered);

        if (filtered.length > 0) {
          setCategoryName(filtered[0]?.category?.name || "Unnamed Category");
        } else {
          setCategoryName("Unknown Category");
        }
      } catch (err) {
        console.error("Failed to fetch subcategories:", err);
        setSubcategories([]);
        setCategoryName("Unknown Category");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [subcategoryId]);

  // console.log()
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subcategory?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://iqstudify.com/api/admin/subCategory/${id}`);
      toast.success("Subcategory deleted successfully!");
      setSubcategories((prev) => prev.filter((sub) => sub._id !== id));
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      toast.error("Failed to delete subcategory.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Header */}
      <div className="flex justify-between p-6 items-center shadow">
        <h1 className="text-lg sm:text-2xl font-bold text-black">Subcategories({subcategories.length})</h1>
        <div>
          <button
            className="border px-4 py-2 rounded-lg bg-[#F10505] text-white hover:bg-red-700 transition text-sm sm:text-base"
            onClick={() => router.push("/admin/dashboard/addsubcategory")}
          >
            Add New Subcategory
          </button>
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : subcategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 place-items-center p-4 bg-[#74CDFF26]">
          {subcategories.map((sub, index) => (
            <div key={index} className="w-full sm:w-[80%] md:w-[60%] lg:w-[20vw]">
              <div
                className="p-4 bg-white shadow rounded-md text-center 
                h-auto lg:h-[15vh] flex items-center justify-center"
              >
                <div className="overflow-hidden">
                  <h2 className="text-md font-medium text-[#072B78] truncate whitespace-nowrap">
                    {sub.name}
                  </h2>
                </div>
              </div>
              <div className="flex p-4 justify-between items-center shadow cursor-pointer shadow">
                <p
                  onClick={() => handleDelete(sub._id)}
                  className="text-[#F10505] hover:text-red-800 cursor-pointer"
                >
                  <MdDelete size={24} />
                </p>
                <p
                  className="transition-[0.5s] underline text-[#F10505] hover:text-blue-800 relative text-sm"
                  onClick={() => router.push(`/admin/dashboard/editsubcategory/${sub?._id}`)}
                >
                  Edit
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">
          No subcategories found for this category.
        </p>
      )}
    </div>
  );
}
