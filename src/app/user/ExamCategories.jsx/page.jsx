// "use client"

// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { FaCogs, FaDesktop, FaCode, FaGlobe, FaArrowRight } from "react-icons/fa";

// export default function ExamCategories() {
//     const [getSubCats, setGetSubCats] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const router = useRouter();

//     useEffect(() => {
//         const fetchAllData = async () => {
//             try {
//                 const subCategories = await axios.get("/api/admin/getallcategory");
//                 setGetSubCats(subCategories?.data?.data || []);
//             } catch (err) {
//                 console.error("Error fetching data", err);
//             }
//         };
//         fetchAllData();
//     }, []);

//     // Group by main title
//     const grouped = getSubCats.reduce((acc, item) => {
//         const title = item?.titleCategory?.title;
//         if (!acc[title]) {
//             acc[title] = [];
//         }
//         acc[title].push(item);
//         return acc;
//     }, {});

//     // Convert object into array and take only first 4
//     const groupedEntries = Object.entries(grouped).slice(0, 4);

//     // Predefined colors + icons
//     const colors = ["#1E40AF", "#3B82F6", "#FACC15", "#06B6D4"];
//     const icons = [<FaCogs />, <FaDesktop />, <FaCode />, <FaGlobe />];

//     return (
//         <section className="py-10 bg-white cursor-pointer">
//             <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 text-center">
//                 <h2 className="text-2xl font-semibold">Browse Top Exam Categories</h2>
//                 <p className="text-gray-600 mb-8">Choose your target exam and start practicing now.</p>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

//                     {/* Only first 4 categories */}
//                     {groupedEntries.map(([title, subs], i) => (
//                         <div
//                             key={i}
//                             className="p-6 rounded-2xl shadow-md text-white flex flex-col items-center justify-center"
//                             style={{ backgroundColor: colors[i % colors.length] }}
//                             onClick={() => setSelectedCategory({ title, subs })}
//                         >
//                             <div className="text-3xl mb-3">{icons[i % icons.length]}</div>
//                             <h3 className="text-lg font-semibold mb-2">{title}</h3>
//                         </div>
//                     ))}

//                     {/* Browse All */}
//                     <div className="flex justify-center items-center">
//                         <button 
//                             onClick={() => router.push("/user/categorydetails")} 
//                             className="group text-black hover:text-blue-500 transition-all flex flex-col items-center"
//                         >
//                             <div className="p-[2px] rounded-full bg-gradient-to-tr from-[#021B79] to-[#0575E6]">
//                                 <div className="bg-white rounded-full p-6">
//                                     <FaArrowRight className="text-4xl group-hover:text-[#0575E6] transition" />
//                                 </div>
//                             </div>
//                             <span className="mt-2 text-sm">Browse All</span>
//                         </button>
//                     </div>

//                 </div>
//             </div>


//             {selectedCategory && (
//                 <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
//                     <div className="bg-white rounded-xl w-11/12 max-w-4xl p-6 relative">
//                         {/* Close button */}
//                         <button 
//                             onClick={() => setSelectedCategory(null)}
//                             className="absolute top-3 right-3 text-gray-500 hover:text-black"
//                         >
//                             ✕
//                         </button>

//                         <h2 className="text-xl font-semibold mb-4">Select a Category</h2>

//                         {/* Tabs - Titles */}
//                         <div className="flex space-x-4 overflow-x-auto border-b pb-2 mb-4">
//                             {groupedEntries.map(([title]) => (
//                                 <button
//                                     key={title}
//                                     onClick={() => setSelectedCategory({ title, subs: grouped[title] })}
//                                     className={`pb-2 ${
//                                         selectedCategory.title === title
//                                             ? "border-b-2 border-blue-600 text-blue-600"
//                                             : "text-gray-600"
//                                     }`}
//                                 >
//                                     {title}
//                                 </button>
//                             ))}
//                         </div>

//                         {/* Subcategories */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                             {selectedCategory.subs.map((s) => (
//                                 <div 
//                                     key={s._id}
//                                     className="p-4 border rounded-lg shadow-sm flex items-center space-x-3 cursor-pointer hover:bg-gray-100"
//                                     onClick={() => router.push(`/user/categorydetails?id=${s._id}`)}
//                                 >
//                                     <div className="bg-blue-100 p-2 rounded-full">
//                                         📘
//                                     </div>
//                                     <p className="text-gray-700">{s.name}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </section>
//     );
// }




"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCogs, FaDesktop, FaCode, FaGlobe, FaArrowRight } from "react-icons/fa";

export default function ExamCategories() {
    const [getSubCats, setGetSubCats] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const subCategories = await axios.get("/api/admin/getallcategory");
                setGetSubCats(subCategories?.data?.data || []);
            } catch (err) {
                console.error("Error fetching data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    // Group by main title
    const grouped = getSubCats.reduce((acc, item) => {
        const title = item?.titleCategory?.title;
        if (!acc[title]) {
            acc[title] = [];
        }
        acc[title].push(item);
        return acc;
    }, {});

    // Convert object into array and take only first 4
    const groupedEntries = Object.entries(grouped).slice(0, 4);
    console.log(groupedEntries)

    // Predefined colors + icons
    const colors = ["#1E40AF", "#3B82F6", "#FACC15", "#06B6D4"];
    const icons = [<FaCogs />, <FaDesktop />, <FaCode />, <FaGlobe />];

    return (
        <section className="py-10 bg-white cursor-pointer">
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-2xl font-semibold">Browse Top Exam Categories</h2>
                <p className="text-gray-600 mb-8">Choose your target exam and start practicing now.</p>

                {loading ? (
                    // ✅ Loader while fetching
                    <div className="flex justify-center items-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

                        {/* Only first 4 categories */}
                        {groupedEntries.map(([title, subs], i) => (
                            <div
                                key={i}
                                className="p-6 rounded-2xl shadow-md text-white flex flex-col items-center justify-center"
                                style={{ backgroundColor: colors[i % colors.length] }}
                                onClick={() => setSelectedCategory({ title, subs })}
                            >
                                <div className="text-3xl mb-3">{icons[i % icons.length]}</div>
                                <h3 className="text-lg font-semibold mb-2">{title}</h3>

                                {
                                    subs?.slice(0, 3).map((siuu, idx) => (
                                        <p key={idx}>{siuu.name}</p>
                                    ))
                                }
                            </div>

                        ))}

                        {/* Browse All */}
                        <div className="flex justify-center items-center">
                            <button
                                onClick={() => router.push("/user/categorydetails")}
                                className="group text-black hover:text-blue-500 transition-all flex flex-col items-center"
                            >
                                <div className="p-[2px] rounded-full bg-gradient-to-tr from-[#021B79] to-[#0575E6]">
                                    <div className="bg-white rounded-full p-6">
                                        <FaArrowRight className="text-4xl group-hover:text-[#0575E6] transition" />
                                    </div>
                                </div>
                                <span className="mt-2 text-sm">Browse All</span>
                            </button>
                        </div>

                    </div>
                )}
            </div>


            {selectedCategory && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl w-11/12 max-w-4xl p-6 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold mb-4">Select a Category</h2>

                        {/* Tabs - Titles */}
                        <div className="flex space-x-4 overflow-x-auto border-b pb-2 mb-4">
                            {groupedEntries.map(([title]) => (
                                <button
                                    key={title}
                                    onClick={() => setSelectedCategory({ title, subs: grouped[title] })}
                                    className={`pb-2 ${selectedCategory.title === title
                                            ? "border-b-2 border-blue-600 text-blue-600"
                                            : "text-gray-600"
                                        }`}
                                >
                                    {title}
                                </button>
                            ))}
                        </div>

                        {/* Subcategories */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedCategory.subs.map((s) => (
                                <div
                                    key={s._id}
                                    className="p-4 border rounded-lg shadow-sm flex items-center space-x-3 cursor-pointer hover:bg-gray-100"
                                    onClick={() => router.push(`/user/categorydetails?id=${s._id}`)}
                                >
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        📘
                                    </div>
                                    <p className="text-gray-700">{s.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}