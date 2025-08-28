"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader"; // Adjust path if needed

const Page = () => {
  const [titles, setTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const titleRes = await axios.get("/api/admin/getalltitlecategory");
        console.log("Title API Response:", titleRes.data);
        setTitles(titleRes.data);
      } catch (error) {
        console.error("Error fetching title categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTitles();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#74CDFF26]">
        <Loader />
      </div>
    );
  }

  return (
    <div className=" min-h-screen">
      <div className="p-8 shadow-sm">
        <h1 className="text-2xl  text-black font-bold">Category Titles({titles.length})</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center bg-[#74CDFF26] p-4">
        {titles.map((title) => (
          <div
            key={title._id}
            className="px-4 py-4 rounded-lg shadow-md cursor-pointer text-md font-medium bg-white text-[#072B78] transition-[0.3s] hover:shadow-lg 
              w-full sm:w-[80%] md:w-[60%] lg:w-[20vw] h-auto lg:h-[15vh] flex items-center justify-center text-center"
            onClick={() => router.push(`/admin/dashboard/category/${title._id}`)}
          >
            {title.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
