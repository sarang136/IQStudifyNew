// "use client";

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Loader from "@/app/components/Loader";
// import { useRouter } from "next/navigation";

// const Page = () => {
//   const [titles, setTitles] = useState([]);
//   const [activeTitle, setActiveTitle] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [subcategories, setSubcategories] = useState([]);
//   const [subcategoryLoading, setSubcategoryLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   const router = useRouter(); 

//   useEffect(() => {
//     const fetchTitles = async () => {
//       try {
//         const titleRes = await axios.get("/api/admin/getalltitlecategory");
//         const titleList = titleRes.data || [];
//         setTitles(titleList);

//         if (titleList.length > 0) {
//           const firstTitleId = titleList[0]._id;
//           setActiveTitle(firstTitleId);
//           await fetchCategories(firstTitleId, true);
//         }
//       } catch (error) {
//         console.error("Error fetching title categories:", error);
//       } finally {
//         setInitialLoading(false);
//       }
//     };

//     fetchTitles();
//   }, []);

//   const fetchCategories = async (titleId, autoSelectFirst = false) => {
//     try {
//       const res = await axios.get(`/api/admin/getallcategory?titleCategory=${titleId}`);
//       const categoryList = res.data.categories || res.data.data || [];
//       setCategories(categoryList);

//       if (autoSelectFirst && categoryList.length > 0) {
//         const firstCategory = categoryList[0];
//         setActiveCategory(firstCategory._id);
//         await fetchSubcategories(firstCategory._id);
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setCategories([]);
//     }
//   };

//   const fetchSubcategories = async (categoryId) => {
//     setSubcategoryLoading(true);
//     try {
//       const res = await axios.get(`/api/admin/getallsubcategory?id=${categoryId}`);
//       setSubcategories(res.data.subcategories || []);
//     } catch (err) {
//       console.error("Error fetching subcategories:", err);
//       setSubcategories([]);
//     } finally {
//       setSubcategoryLoading(false);
//     }
//   };

//   if (initialLoading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="p-2">
//       {/* 🔷 Titles */}
//       <div className="flex gap-4 overflow-x-scroll hide-scrollbar mb-6">
//         {titles.map((title, index) => (
//           <div
//             key={index}
//             onClick={() => {
//               setActiveTitle(title._id);
//               setCategories([]);
//               setSubcategories([]);
//               setActiveCategory(null);
//               fetchCategories(title._id, true);
//             }}
//             className={`cursor-pointer p-2 text-sm ${
//               activeTitle === title._id
//                 ? "text-black border-b-2 border-b-blue-500 font-medium"
//                 : "text-gray-600 hover:text-black"
//             }`}
//           >
//             {title.title}
//           </div>
//         ))}
//       </div>

     
//       <div className="flex">
//         {/* 🔹 Categories Sidebar */}
//         <div className="p-4 bg-[#072B78] max-h-[70vh] w-[20vw] overflow-y-scroll">
//           <h2 className="mb-2 text-white">Categories</h2>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeTitle}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               {categories.length > 0 ? (
//                 categories.map((cat) => (
//                   <div
//                     key={cat._id}
//                     onClick={() => {
//                       setActiveCategory(cat._id);
//                       fetchSubcategories(cat._id);
//                     }}
//                     className={`cursor-pointer px-3 py-2 rounded mb-2 text-white transition-[0.5s] ${
//                       activeCategory === cat._id
//                         ? "bg-[#EF9C01] text-white"
//                         : "hover:bg-[#EF9C01]"
//                     }`}
//                   >
//                     {cat.name}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-gray-400">
//                   Select a title to view categories
//                 </p>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* 🔹 Subcategories Area */}
//         <div className="flex-1 bg-[#74CDFF26] p-4 max-h-[69vh] overflow-y-scroll">
//           <h2 className="font-semibold mb-2">Subcategories</h2>

//           {subcategoryLoading ? (
//             <Loader />
//           ) : (
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeCategory}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 transition={{ duration: 0.3 }}
//                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
//               >
//                 {subcategories.length > 0 ? (
//                   subcategories.map((sub) => (
//                     <motion.div
//                       key={sub._id}
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.3 }}
//                       className="p-4 bg-white rounded shadow text-center cursor-pointer"
//                       onClick={() => router.push(`/admin/dashboard/testsection/${sub._id}`)} 
//                     >
//                       {sub.name}
                     
//                     </motion.div>
//                   ))
//                 ) : (
//                   <p className="text-sm text-gray-500 col-span-3">
//                     No subcategories found.
//                   </p>
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;




"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/app/components/Loader";
import { useRouter } from "next/navigation";

const Page = () => {
  const [titles, setTitles] = useState([]);
  const [activeTitle, setActiveTitle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryLoading, setSubcategoryLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const titleRes = await axios.get("/api/admin/getalltitlecategory");
        const titleList = titleRes.data || [];
        setTitles(titleList);

        if (titleList.length > 0) {
          const firstTitleId = titleList[0]._id;
          setActiveTitle(firstTitleId);
          await fetchCategories(firstTitleId, true);
        }
      } catch (error) {
        console.error("Error fetching title categories:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchTitles();
  }, []);

  const fetchCategories = async (titleId, autoSelectFirst = false) => {
    try {
      const res = await axios.get(
        `/api/admin/getallcategory?titleCategory=${titleId}`
      );
      const categoryList = res.data.categories || res.data.data || [];
      setCategories(categoryList);

      if (autoSelectFirst && categoryList.length > 0) {
        const firstCategory = categoryList[0];
        setActiveCategory(firstCategory._id);
        await fetchSubcategories(firstCategory._id);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    setSubcategoryLoading(true);
    try {
      const res = await axios.get(
        `/api/admin/getallsubcategory?id=${categoryId}`
      );
      setSubcategories(res.data.subcategories || []);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      setSubcategories([]);
    } finally {
      setSubcategoryLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-2">
      {/* 🔷 Titles */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar mb-6">
        {titles.map((title, index) => (
          <div
            key={index}
            onClick={() => {
              setActiveTitle(title._id);
              setCategories([]);
              setSubcategories([]);
              setActiveCategory(null);
              fetchCategories(title._id, true);
            }}
            className={`cursor-pointer p-2 text-sm whitespace-nowrap ${
              activeTitle === title._id
                ? "text-black border-b-2 border-b-blue-500 font-medium"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {title.title}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* 🔹 Categories Sidebar */}
        <div className="p-4 bg-[#072B78] min-h-[70vh] max-h-[70vh] lg:w-[20vw] w-full overflow-y-scroll mb-4 lg:mb-0 lg:mr-4 rounded-md">
          <h2 className="mb-2 text-white">Categories</h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTitle}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <div
                    key={cat._id}
                    onClick={() => {
                      setActiveCategory(cat._id);
                      fetchSubcategories(cat._id);
                    }}
                    className={`cursor-pointer px-3 py-2 rounded mb-2 text-white transition-[0.5s] ${
                      activeCategory === cat._id
                        ? "bg-[#EF9C01] text-white"
                        : "hover:bg-[#EF9C01]"
                    }`}
                  >
                    {cat.name}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">
                  Select a title to view categories
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 🔹 Subcategories Area */}
        <div className="flex-1 bg-[#74CDFF26] p-4 max-h-[70vh] overflow-y-scroll rounded-md">
          <h2 className="font-semibold mb-2">Subcategories</h2>

          {subcategoryLoading ? (
            <Loader />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {subcategories.length > 0 ? (
                  subcategories.map((sub) => (
                    <motion.div
                      key={sub._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-white rounded shadow text-center cursor-pointer"
                      onClick={() =>
                        router.push(`/admin/dashboard/testsection/${sub._id}`)
                      }
                    >
                      {sub.name}
                    </motion.div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 col-span-3">
                    No subcategories found.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
