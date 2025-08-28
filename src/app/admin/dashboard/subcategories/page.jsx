"use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function SubcategoriesList() {
//   const [subcategories, setSubcategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   useEffect(() => {
//     const fetchSubcategories = async () => {
//       try {
//         const res = await axios.get(`/api/admin/getallsubcategory`);
//         setSubcategories(res.data.subcategories || []);
//       } catch (error) {
//         toast.error("Failed to load subcategories");
//         console.error("Error fetching subcategories:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSubcategories();
//   }, []);

//   const handleDelete = async (id) => {
//     setSubcategoryToDelete(id);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!subcategoryToDelete) return;

//     setDeleteLoading(true);
//     try {
//       await axios.delete(`/api/admin/subCategory/${subcategoryToDelete}`);
//       toast.success("Subcategory deleted successfully");
//       setSubcategories(
//         subcategories.filter((item) => item._id !== subcategoryToDelete)
//       );
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to delete subcategory"
//       );
//       console.error("Error deleting subcategory:", error);
//     } finally {
//       setDeleteLoading(false);
//       setShowDeleteModal(false);
//       setSubcategoryToDelete(null);
//     }
//   };
// console.log(subcategories)
//   const handleEdit = (id) => {
//     router.push(`/admin/dashboard/editsubcategory/${id}`);
//   };

//   const DeleteConfirmationModal = () => (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-100 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg max-w-md w-full">
//         <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
//         <p className="mb-6">
//           Are you sure you want to delete this subcategory? This action cannot
//           be undone.
//         </p>
//         <div className="flex justify-end space-x-3">
//           <button
//             onClick={() => setShowDeleteModal(false)}
//             className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
//             disabled={deleteLoading}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={confirmDelete}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-400"
//             disabled={deleteLoading}
//           >
//             {deleteLoading ? "Deleting..." : "Delete"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // 👉 Group by category.name
//   const grouped = {};
//   subcategories.forEach((sub) => {
//     const catName = sub.category?.name || "N/A";
//     if (grouped[catName]) {
//       grouped[catName].count += 1;
//       grouped[catName].examples.push(sub);
//     } else {
//       grouped[catName] = {
//         count: 1,
//         examples: [sub],
//         categoryId: sub.category?._id,
//       };
//     }
//   });

//   return (
//     <div className="p-6 min-h-screen bg-gray-50 overflow-y-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
//         <Link
//           href="/admin/dashboard/addsubcategory"
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Add New Subcategory
//         </Link>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-auto max-h-[70vh]">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100 sticky top-0 z-10">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Category Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Count
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {Object.entries(grouped).map(([name, data]) => (
//               <tr key={name} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {name}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {data.count}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button
//                     onClick={() =>
//                       handleEdit(data.examples[0]?._id || "undefined")
//                     }
//                     className="text-blue-600 hover:text-blue-900 mr-4"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() =>
//                       handleDelete(data.examples[0]?._id || "undefined")
//                     }
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showDeleteModal && <DeleteConfirmationModal />}
//     </div>
//   );
// }







import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [titles, setTitles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [selectedTitleId, setSelectedTitleId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [titleRes, catRes, subcatRes] = await Promise.all([
          axios.get("/api/admin/getalltitlecategory"),
          axios.get("/api/admin/getallcategory"),
          axios.get("/api/admin/getallsubcategory"),
        ]);

        console.log("📚 Title API:", titleRes.data);
        console.log("📁 Category API:", catRes.data);
        console.log("📦 Subcategory API:", subcatRes.data);

        setTitles(Array.isArray(titleRes.data) ? titleRes.data : []);
        setCategories(Array.isArray(catRes.data) ? catRes.data : []);
        setSubcategories(
          Array.isArray(subcatRes.data) ? subcatRes.data : []
        );

        // Set initial title/category if available
        if (titleRes.data?.length) {
          setSelectedTitleId(titleRes.data[0]._id);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, []);

  const filteredCategories = categories.filter(
    (cat) => cat.titleCategory?._id === selectedTitleId
  );

  const filteredSubcategories = subcategories.filter(
    (subcat) => subcat.category?._id === selectedCategoryId
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* --- Titles Tab Bar --- */}
      <div className="flex space-x-4 border-b mb-6">
        {titles.map((title) => (
          <button
            key={title._id}
            className={`px-4 py-2 font-medium ${
              selectedTitleId === title._id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => {
              setSelectedTitleId(title._id);
              setSelectedCategoryId(null); // reset selected category
            }}
          >
            {title.title}
          </button>
        ))}
      </div>

      <div className="flex">
        {/* --- Left: Category Sidebar --- */}
        <div className="w-1/4 pr-4">
          {filteredCategories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => setSelectedCategoryId(cat._id)}
              className={`p-3 mb-2 rounded cursor-pointer ${
                selectedCategoryId === cat._id
                  ? "bg-orange-500 text-white font-bold"
                  : "bg-blue-900 text-white hover:bg-blue-700"
              }`}
            >
              {cat.name}
            </div>
          ))}
        </div>

        {/* --- Right: Subcategories Grid --- */}
        <div className="w-3/4 grid grid-cols-3 gap-4 bg-blue-100 p-4 rounded">
          {filteredSubcategories.map((subcat) => (
            <div
              key={subcat._id}
              className="bg-white p-4 rounded shadow hover:shadow-md transition text-center text-gray-700 font-medium"
            >
              {subcat.name}
            </div>
          ))}
          {filteredSubcategories.length === 0 && (
            <p className="col-span-3 text-center text-gray-500">
              No subcategories available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;


