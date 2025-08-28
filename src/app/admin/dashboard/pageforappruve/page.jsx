
// 'use client';

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function ApprovalPage() {
//     const [questions, setQuestions] = useState([]);
//     const [filteredQuestions, setFilteredQuestions] = useState([]);
//     const [selectedQuestions, setSelectedQuestions] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [selectAll, setSelectAll] = useState(false);
//     const [filter, setFilter] = useState("all");

//     const fetchUpdatedQuestions = async () => {
//         const token = localStorage.getItem("operatorToken");
//         const info = localStorage.getItem("operatorInfo");
//         const parsedInfo = JSON.parse(info);
//         const operatorId = parsedInfo?.operatorId;
//         setLoading(true)

//         if (!token || !operatorId) {
//             setMessage("Authentication token or Operator ID is missing.");
//             return;
//         }
//         try {
//             const response = await axios.get(`/api/admin/getOperatorQuestions/${operatorId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (response.status === 200) {
//                 setLoading(false)
//                 const allQuestions = response.data.questions;

//                 setQuestions(allQuestions); // ✅ Save full list always

//                 // ✅ Apply filter from state
//                 setFilteredQuestions(
//                     allQuestions.filter((q) =>
//                         filter === "all" ? true : q.status === filter
//                     )
//                 );

//                 localStorage.setItem("submittedQuestions", JSON.stringify(allQuestions.map(q => q._id)));
//             } else {
//                 setMessage("Failed to fetch updated questions.");
//             }
//         } catch (error) {
//             console.error("Error fetching updated questions:", error);
//             setMessage("Error fetching updated questions.");
//         }
//     };

//     useEffect(() => {
//         fetchUpdatedQuestions();
//     }, []);

//     useEffect(() => {
//         // Update selectAll state based on current selection
//         const selectableQuestions = filteredQuestions.filter(
//             q => q.status !== "pending" &&
//                 q.status !== "approved" &&
//                 q.status !== "rejected"
//         );
//         const allSelectableSelected = selectableQuestions.length > 0 &&
//             selectableQuestions.every(q => selectedQuestions.includes(q._id));
//         setSelectAll(allSelectableSelected);
//     }, [selectedQuestions, filteredQuestions]);

//     useEffect(() => {
//         // Reset selectAll when filter changes
//         setSelectAll(false);
//     }, [filter]);

//     const handleFilterChange = (status) => {
//         setFilter(status);
//         if (status === "all") {
//             setFilteredQuestions(questions);
//         } else {
//             setFilteredQuestions(questions.filter(q => q.status === status));
//         }
//     };

//     const handleSelectQuestion = (id) => {
//         setSelectedQuestions((prev) =>
//             prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
//         );
//     };

//     const handleSelectAll = () => {
//         if (selectAll) {
//             setSelectedQuestions([]);
//         } else {
//             // Only select questions that are not pending, approved, or rejected
//             const selectableQuestions = filteredQuestions.filter(
//                 q => q.status !== "pending" &&
//                     q.status !== "approved" &&
//                     q.status !== "rejected"
//             );
//             setSelectedQuestions(selectableQuestions.map(q => q._id));
//         }
//         setSelectAll(!selectAll);
//     };

//     const handleSubmitApproval = async () => {
//         if (selectedQuestions.length === 0) {
//             setMessage("No questions selected for approval.");
//             return;
//         }

//         setLoading(true);
//         setMessage("");

//         const token = localStorage.getItem("operatorToken");

//         if (!token) {
//             setMessage("Authentication token is missing. Please log in again.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 "/api/admin/sendForApproval",
//                 { questionIds: selectedQuestions },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             if (response.status === 200) {
//                 setMessage("Selected questions sent for approval successfully.");

//                 // ✅ Update full list
//                 const updatedQuestions = questions.map((q) =>
//                     selectedQuestions.includes(q._id)
//                         ? { ...q, status: "pending" }
//                         : q
//                 );
//                 setQuestions(updatedQuestions);

//                 // ✅ Re-apply current filter
//                 setFilteredQuestions(
//                     updatedQuestions.filter((q) =>
//                         filter === "all" ? true : q.status === filter
//                     )
//                 );

//                 localStorage.setItem("submittedQuestions", JSON.stringify(selectedQuestions));
//                 setSelectedQuestions([]);
//             } else {
//                 setMessage(response.data.message);
//             }
//         } catch (error) {
//             console.error("Error sending questions for approval:", error);
//             setMessage("Failed to send selected questions for approval.");
//         }

//         setLoading(false);
//     };

//     console.log("filteredQuestions", filteredQuestions)
//     // console.log("selectedQuestions", selectedQuestions)

//     return (
//         <div className="p-4 text-white max-w-6xl mx-auto">
//             <div className="flex flex-wrap justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Submit Questions for Approval </h2>
//                 <button
//                     onClick={handleSelectAll}
//                     className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
//                 >
//                     {selectAll ? "Deselect All" : "Select All"}
//                 </button>
//             </div>

//             {message && <p className="mb-4 text-yellow-400">{message}</p>}

//             {/* Filter Section */}
//             <div className="flex gap-2 mb-4">
//                 {["all", "pending", "approved", "rejected", "draft"].map((status) => (
//                     <button
//                         key={status}
//                         onClick={() => handleFilterChange(status)}
//                         className={`px-4 py-2 rounded ${filter === status ? "bg-blue-500 text-white" : "bg-gray-600 hover:bg-gray-700 text-gray-300"
//                             }`}
//                     >
//                         {status.charAt(0).toUpperCase() + status.slice(1)}
//                     </button>
//                 ))}
//             </div>


//             {loading ? (
//                 <div className="flex justify-center items-center h-40">
//                     <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
//                 </div>
//             ) : filteredQuestions?.length === 0 ? (
//                 <p className="text-center text-gray-400">No questions found.</p>
//             ) : (
//                 <div className="max-h-96 overflow-y-auto border border-gray-600 rounded-lg">
//                     <table className="min-w-full table-auto text-sm text-gray-700 ">
//                         <thead className="bg-gray-200 sticky top-0">
//                             <tr className="border">
//                                 <th className=" p-2">Select</th>
//                                 <th className=" p-2">Question</th>
//                                 <th className=" p-2">Status</th>
//                                 <th className=" p-2">Created At</th>
//                                 <th className=" p-2">View options</th>
//                                 <th className=" p-2">Rejection Reason</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredQuestions?.map((q) => (
//                                 <tr key={q._id} className=" bg-gray-100 text-gray-700 ">
//                                     <td className="border p-2 text-center">
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedQuestions.includes(q._id)}
//                                             onChange={() => handleSelectQuestion(q._id)}
//                                             disabled={
//                                                 q.status === "pending" ||
//                                                 q.status === "approved" ||
//                                                 q.status === "rejected"
//                                             }
//                                             className="text-gray-700 cursor-pointer disabled:opacity-50"
//                                         />
//                                     </td>
//                                     <td className="border p-2">
//                                         <div
//                                             className="prose prose-sm max-w-none"
//                                             dangerouslySetInnerHTML={{ __html: q.questionText }}
//                                         />
//                                     </td>
//                                     <td className="border p-2">
//                                         {q.status === "approved"
//                                             ? "✅ Approved"
//                                             : q.status === "rejected"
//                                                 ? "❌ Rejected"
//                                                 : q.status === "pending"
//                                                     ? "⏳ Pending"
//                                                     : "📄 Draft"}
//                                     </td>
//                                     <td className="border p-2">
//                                         {new Date(q.createdAt).toLocaleString()}
//                                     </td>
//                                     <td className="border p-2">
//                                        <p>View</p>
//                                        <p>{q?.options.map((opt) => opt)}</p>
//                                     </td>

//                                     <td className="border text-gray-700 p-2">{q.rejectionReason || ""}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}


//             <button
//                 onClick={handleSubmitApproval}
//                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
//                 disabled={loading}
//             >
//                 {loading ? "Submitting..." : "Submit for Approval"}
//             </button>
//         </div>
//     );
// }

// export default ApprovalPage;



'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateQuestionForm from "../updateQuestion/page";
import { toast } from "react-toastify";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function ApprovalPage() {
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const [filter, setFilter] = useState("all");
    const [questionList, setQuestionList] = useState([]);
    const [viewQuestion, setViewQuestion] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [questionToUpdate, setQuestionToUpdate] = useState(null);

    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    const fetchUpdatedQuestions = async () => {
        const token = localStorage.getItem("operatorToken");
        const info = localStorage.getItem("operatorInfo");
        const parsedInfo = JSON.parse(info);
        const operatorId = parsedInfo?.operatorId;
        setLoading(true);

        if (!token || !operatorId) {
            setMessage("Authentication token or Operator ID is missing.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`/api/admin/getOperatorQuestions/${operatorId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                const allQuestions = response.data.questions || [];
                setQuestions(allQuestions);
                setFilteredQuestions(
                    allQuestions.filter((q) =>
                        filter === "all" ? true : q.status === filter
                    )
                );
                localStorage.setItem(
                    "submittedQuestions",
                    JSON.stringify(allQuestions.map(q => q._id))
                );
            } else {
                setMessage("Failed to fetch updated questions.");
            }
        } catch (error) {
            setMessage(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUpdatedQuestions();
        // eslint-disable-next-line
    }, []);

    const handleFilterChange = (status) => {
        setFilter(status);
        if (status === "all") {
            setFilteredQuestions(questions);
        } else {
            setFilteredQuestions(questions.filter(q => q.status === status));
        }
    };

    const handleSelectQuestion = (id) => {
        setSelectedQuestions((prev) =>
            prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedQuestions([]);
        } else {
            const selectableQuestions = filteredQuestions.filter(
                q => q.status !== "pending" &&
                    q.status !== "approved" &&
                    q.status !== "rejected"
            );
            setSelectedQuestions(selectableQuestions.map(q => q._id));
        }
        setSelectAll(!selectAll);
    };

    const handleSubmitApproval = async () => {
        if (selectedQuestions.length === 0) {
            setMessage("No questions selected for approval.");
            return;
        }

        setLoading(true);
        setMessage("");

        const token = localStorage.getItem("operatorToken");

        if (!token) {
            setMessage("Authentication token is missing. Please log in again.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                "/api/admin/sendForApproval",
                { questionIds: selectedQuestions },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                setMessage("Selected questions sent for approval successfully.");

                const updatedQuestions = questions.map((q) =>
                    selectedQuestions.includes(q._id)
                        ? { ...q, status: "pending" }
                        : q
                );
                setQuestions(updatedQuestions);

                setFilteredQuestions(
                    updatedQuestions.filter((q) =>
                        filter === "all" ? true : q.status === filter
                    )
                );

                localStorage.setItem("submittedQuestions", JSON.stringify(selectedQuestions));
                setSelectedQuestions([]);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage("Failed to send selected questions for approval.");
        } finally {
            setLoading(false);
        }
    };

    const deleteQuestion = async (id) => {
        setDeleting(true);
        try {
            const response = await axios.delete(`/api/admin/deletequestion/${id}`);

            if (response.status === 200) {
                const updatedQuestions = questionList.filter((q) => q._id !== id);
                setQuestionList(updatedQuestions);
                localStorage.setItem("addedQuestions", JSON.stringify(updatedQuestions));
                toast.success("Question deleted successfully!");
                fetchUpdatedQuestions();
            } else {
                toast.error("Failed to delete question from the database.");
            }
        } catch (error) {
            toast.error("Failed to delete question. Please try again.");
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
            setQuestionToDelete(null);
        }
    };

    const handleDeleteClick = (q) => {
        setQuestionToDelete(q);
        setShowDeleteModal(true);
    };

    const handleEdit = (question) => {
        setQuestionToUpdate(question);
        setShowUpdateForm(true);
    };

    // --- UI Section ---
    return (
        <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-extrabold text-blue-900 tracking-tight">
                    Questions Approval Dashboard
                </h2>
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => router.push("/admin/dashboard/addquestion")}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add Question
                    </button>
                    <button
                        onClick={handleSelectAll}
                        className={`px-4 py-2 rounded-lg font-medium shadow ${selectAll
                            ? "bg-gray-400 text-white"
                            : "bg-gray-700 text-white hover:bg-gray-800"
                            }`}
                    >
                        {selectAll ? "Deselect All" : "Select All"}
                    </button>
                </div>
            </div>

            {message && (
                <div className="mb-4 px-4 py-2 rounded bg-yellow-100 text-yellow-800 border border-yellow-300 shadow">
                    {message}
                </div>
            )}

            {/* Filter Section */}
            <div className="flex flex-wrap gap-2 mb-6">
                {["all", "pending", "approved", "rejected", "draft"].map((status) => (
                    <button
                        key={status}
                        onClick={() => handleFilterChange(status)}
                        className={`px-4 py-2 rounded-full font-semibold border transition-all duration-150
                            ${filter === status
                                ? "bg-blue-600 text-white border-blue-700 shadow"
                                : "bg-white text-blue-700 border-blue-200 hover:bg-blue-100"
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            <div className="relative rounded-xl shadow-lg overflow-hidden border border-blue-200 bg-white">
                {loading ? (
                    <div className="flex justify-center items-center h-60">
                        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredQuestions?.length === 0 ? (
                    <div className="py-16 text-center text-gray-400 text-lg font-medium">
                        No questions found.
                    </div>
                ) : (
                    <div className="overflow-x-auto max-h-[32rem]">
                        <table className="min-w-full text-sm text-blue-900">
                            <thead className="bg-gradient-to-r from-blue-100 to-blue-200 sticky top-0 z-10">
                                <tr>
                                    <th className="p-3 text-left font-bold">Select</th>
                                    <th className="p-3 text-left font-bold">Question</th>
                                    <th className="p-3 text-left font-bold">Status</th>
                                    <th className="p-3 text-left font-bold">Created At</th>
                                    <th className="p-3 text-left font-bold">View</th>
                                    <th className="p-3 text-left font-bold">Actions</th>
                                    <th className="p-3 text-left font-bold">Rejection Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredQuestions?.map((q, idx) => (
                                    <tr
                                        key={q._id}
                                        className={`transition-colors duration-100 ${idx % 2 === 0 ? "bg-blue-50" : "bg-white"} hover:bg-blue-100`}
                                    >
                                        <td className="p-3 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedQuestions.includes(q._id)}
                                                onChange={() => handleSelectQuestion(q._id)}
                                                disabled={
                                                    q.status === "pending" ||
                                                    q.status === "approved" ||
                                                    q.status === "rejected"
                                                }
                                                className="accent-blue-600 w-5 h-5 cursor-pointer disabled:opacity-40"
                                            />
                                        </td>
                                        <td className="p-3 max-w-xs">
                                            <div
                                                className="prose prose-sm max-w-none text-blue-900"
                                                dangerouslySetInnerHTML={{ __html: q.questionText }}
                                            />
                                        </td>
                                        <td className="p-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
                                                ${q.status === "approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : q.status === "rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : q.status === "pending"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-gray-100 text-gray-700"
                                                }`}>
                                                {q.status === "approved"
                                                    ? <>✅ Approved</>
                                                    : q.status === "rejected"
                                                        ? <>❌ Rejected</>
                                                        : q.status === "pending"
                                                            ? <>⏳ Pending</>
                                                            : <>📄 Draft</>
                                                }
                                            </span>
                                        </td>
                                        <td className="p-3 whitespace-nowrap">
                                            <span className="text-xs text-gray-500">
                                                {new Date(q.createdAt).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => setViewQuestion(q)}
                                                className="px-3 py-1 rounded bg-blue-500 text-white font-medium hover:bg-blue-700 transition"
                                            >
                                                View
                                            </button>
                                        </td>
                                        <td className="p-3 flex gap-2">
                                            <button
                                                onClick={() => handleEdit(q)}
                                                className="px-3 py-1 rounded bg-yellow-400 text-yellow-900 font-semibold hover:bg-yellow-500 transition text-xs"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(q)}
                                                className="px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        <td className="p-3 text-sm text-red-700">
                                            {q.rejectionReason || ""}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={handleSubmitApproval}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition w-full md:w-auto"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Submitting...
                        </span>
                    ) : (
                        "Submit for Approval"
                    )}
                </button>
            </div>

            {/* Modal - View */}
            {viewQuestion && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative border-2 border-blue-200">
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-blue-700 text-2xl"
                            onClick={() => setViewQuestion(null)}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-bold mb-4 text-blue-900">Question Details</h3>
                        <div
                            className="mb-4 text-blue-900 prose prose-sm"
                            dangerouslySetInnerHTML={{ __html: viewQuestion.questionText }}
                        />
                        <h4 className="font-semibold mb-2 text-blue-700">Options</h4>
                        <ul className="list-disc pl-6 space-y-1 text-blue-800">
                            {viewQuestion.options?.map((opt, idx) => (
                                <li
                                    key={idx}
                                    className={
                                        opt === viewQuestion.correctAnswer
                                            ? "text-green-600 font-semibold"
                                            : ""
                                    }
                                    dangerouslySetInnerHTML={{ __html: opt }}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Modal - Edit */}
            {showUpdateForm && questionToUpdate && (
                <UpdateQuestionForm
                    question={questionToUpdate}
                    onUpdate={(updatedQuestion) => {
                        setQuestions(questions.map(q =>
                            q._id === updatedQuestion._id ? updatedQuestion : q
                        ));
                        setShowUpdateForm(false);
                        setQuestionToUpdate(null);
                    }}
                    onCancel={() => {
                        setShowUpdateForm(false);
                        setQuestionToUpdate(null);
                    }}
                />
            )}

            {/* Modal - Delete Confirmation */}
            {showDeleteModal && questionToDelete && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 border-2 border-red-200">
                        <h3 className="text-lg font-bold text-red-700 mb-4">
                            Delete this question permanently?
                        </h3>
                        <div className="prose prose-sm text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: questionToDelete.questionText }} />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setQuestionToDelete(null);
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => deleteQuestion(questionToDelete._id)}
                                className={`px-4 py-2 rounded text-white font-semibold ${deleting ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
                                disabled={deleting}
                            >
                                {deleting ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Deleting...
                                    </span>
                                ) : (
                                    "Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApprovalPage;










































// // 'use client';

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // function ApprovalPage() {
// //     const [questions, setQuestions] = useState([]);
// //     const [filteredQuestions, setFilteredQuestions] = useState([]);
// //     const [selectedQuestions, setSelectedQuestions] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [message, setMessage] = useState("");
// //     const [selectAll, setSelectAll] = useState(false);
// //     const [filter, setFilter] = useState("all");

// //     const fetchUpdatedQuestions = async () => {
// //         const token = localStorage.getItem("operatorToken");
// //         const info = localStorage.getItem("operatorInfo");
// //         const parsedInfo = JSON.parse(info);
// //         const operatorId = parsedInfo?.operatorId;
// //         setLoading(true)

// //         if (!token || !operatorId) {
// //             setMessage("Authentication token or Operator ID is missing.");
// //             return;
// //         }
// //         try {
// //             const response = await axios.get(`/api/admin/getOperatorQuestions/${operatorId}`, {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });

// //             if (response.status === 200) {
// //                 setLoading(false)
// //                 const allQuestions = response.data.questions;

// //                 setQuestions(allQuestions); // ✅ Save full list always

// //                 // ✅ Apply filter from state
// //                 setFilteredQuestions(
// //                     allQuestions.filter((q) =>
// //                         filter === "all" ? true : q.status === filter
// //                     )
// //                 );

// //                 localStorage.setItem("submittedQuestions", JSON.stringify(allQuestions.map(q => q._id)));
// //             } else {
// //                 setMessage("Failed to fetch updated questions.");
// //             }
// //         } catch (error) {
// //             console.error("Error fetching updated questions:", error);
// //             setMessage("Error fetching updated questions.");
// //         }
// //     };


// //     useEffect(() => {
// //         fetchUpdatedQuestions();
// //     }, []);

// //     const handleFilterChange = (status) => {
// //         setFilter(status);
// //         if (status === "all") {
// //             setFilteredQuestions(questions);
// //         } else {
// //             setFilteredQuestions(questions.filter(q => q.status === status));
// //         }
// //     };

// //     const handleSelectQuestion = (id) => {
// //         setSelectedQuestions((prev) =>
// //             prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
// //         );
// //     };

// //     const handleSelectAll = () => {
// //         if (selectAll) {
// //             setSelectedQuestions([]);
// //         } else {
// //             setSelectedQuestions(filteredQuestions.map(q => q._id));
// //         }
// //         setSelectAll(!selectAll);
// //     };

// //     // const handleSubmitApproval = async () => {
// //     //     if (selectedQuestions.length === 0) {
// //     //         setMessage("No questions selected for approval.");
// //     //         return;
// //     //     }

// //     //     setLoading(true);
// //     //     setMessage("");

// //     //     const token = localStorage.getItem("operatorToken");

// //     //     if (!token) {
// //     //         setMessage("Authentication token is missing. Please log in again.");
// //     //         setLoading(false);
// //     //         return;
// //     //     }

// //     //     try {
// //     //         const response = await axios.post(
// //     //             "/api/admin/sendForApproval",
// //     //             { questionIds: selectedQuestions },
// //     //             { headers: { Authorization: `Bearer ${token}` } }
// //     //         );

// //     //         if (response.status === 200) {
// //     //             setMessage("Selected questions sent for approval successfully.");
// //     //             fetchUpdatedQuestions();
// //     //             localStorage.setItem("submittedQuestions", JSON.stringify(selectedQuestions));
// //     //             setSelectedQuestions([]);
// //     //         } else {
// //     //             setMessage(response.data.message);
// //     //         }
// //     //     } catch (error) {
// //     //         console.error("Error sending questions for approval:", error);
// //     //         setMessage("Failed to send selected questions for approval.");
// //     //     }

// //     //     setLoading(false);
// //     // };
// //     console.log(questions, " Questions");
// //     console.log(filteredQuestions, "Filtered Questions");
// //     const handleSubmitApproval = async () => {
// //         if (selectedQuestions.length === 0) {
// //             setMessage("No questions selected for approval.");
// //             return;
// //         }

// //         setLoading(true);
// //         setMessage("");

// //         const token = localStorage.getItem("operatorToken");

// //         if (!token) {
// //             setMessage("Authentication token is missing. Please log in again.");
// //             setLoading(false);
// //             return;
// //         }

// //         try {
// //             const response = await axios.post(
// //                 "/api/admin/sendForApproval",
// //                 { questionIds: selectedQuestions },
// //                 { headers: { Authorization: `Bearer ${token}` } }
// //             );

// //             if (response.status === 200) {
// //                 setMessage("Selected questions sent for approval successfully.");

// //                 // ✅ Update full list
// //                 const updatedQuestions = questions.map((q) =>
// //                     selectedQuestions.includes(q._id)
// //                         ? { ...q, status: "pending" }
// //                         : q
// //                 );
// //                 setQuestions(updatedQuestions);

// //                 // ✅ Re-apply current filter
// //                 setFilteredQuestions(
// //                     updatedQuestions.filter((q) =>
// //                         filter === "all" ? true : q.status === filter
// //                     )
// //                 );

// //                 localStorage.setItem("submittedQuestions", JSON.stringify(selectedQuestions));
// //                 setSelectedQuestions([]);
// //             } else {
// //                 setMessage(response.data.message);
// //             }
// //         } catch (error) {
// //             console.error("Error sending questions for approval:", error);
// //             setMessage("Failed to send selected questions for approval.");
// //         }

// //         setLoading(false);
// //     };

// //     return (
// //         <div className="p-4 text-white max-w-6xl mx-auto">
// //             <div className="flex flex-wrap justify-between items-center mb-4">
// //                 <h2 className="text-xl font-bold">Submit Questions for Approval </h2>
// //                 <button
// //                     onClick={handleSelectAll}
// //                     className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
// //                 >
// //                     {selectAll ? "Deselect All" : "Select All"}
// //                 </button>
// //             </div>

// //             {message && <p className="mb-4 text-yellow-400">{message}</p>}

// //             {/* Filter Section */}
// //             <div className="flex gap-2 mb-4">
// //                 {["all", "pending", "approved", "rejected", "draft"].map((status) => (
// //                     <button
// //                         key={status}
// //                         onClick={() => handleFilterChange(status)}
// //                         className={`px-4 py-2 rounded ${filter === status ? "bg-blue-500 text-white" : "bg-gray-600 hover:bg-gray-700 text-gray-300"
// //                             }`}
// //                     >
// //                         {status.charAt(0).toUpperCase() + status.slice(1)}
// //                     </button>
// //                 ))}
// //             </div>


// //             {loading ? (
// //                 <div className="flex justify-center items-center h-40">
// //                     <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
// //                 </div>
// //             ) : filteredQuestions?.length === 0 ? (
// //                 <p className="text-center text-gray-400">No questions found.</p>
// //             ) : (
// //                 <div className="max-h-96 overflow-y-auto border border-gray-600 rounded-lg">
// //                     <table className="min-w-full table-auto text-sm text-gray-700 ">
// //                         <thead className="bg-gray-200 sticky top-0">
// //                             <tr className="border">
// //                                 <th className=" p-2">Select</th>
// //                                 <th className=" p-2">Question</th>
// //                                 <th className=" p-2">Status</th>
// //                                 <th className=" p-2">Created At</th>
// //                                 <th className=" p-2">Rejection Reason</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {filteredQuestions?.map((q) => (
// //                                 <tr key={q._id} className=" bg-gray-100 text-gray-700 ">
// //                                     <td className="border p-2 text-center">
// //                                         <input
// //                                             type="checkbox"
// //                                             checked={selectedQuestions.includes(q._id)}
// //                                             onChange={() => handleSelectQuestion(q._id)}
// //                                             disabled={
// //                                                 q.status === "pending" ||
// //                                                 q.status === "approved" ||
// //                                                 q.status === "rejected"
// //                                             }
// //                                             className="text-gray-700 cursor-pointer disabled:opacity-50"
// //                                         />
// //                                     </td>
// //                                     <td className="border p-2">
// //                                         <div
// //                                             className="prose prose-sm max-w-none"
// //                                             dangerouslySetInnerHTML={{ __html: q.questionText }}
// //                                         />
// //                                     </td>
// //                                     <td className="border p-2">
// //                                         {q.status === "approved"
// //                                             ? "✅ Approved"
// //                                             : q.status === "rejected"
// //                                                 ? "❌ Rejected"
// //                                                 : q.status === "pending"
// //                                                     ? "⏳ Pending"
// //                                                     : "📄 Draft"}
// //                                     </td>
// //                                     <td className="border p-2">
// //                                         {new Date(q.createdAt).toLocaleString()}
// //                                     </td>
// //                                     <td className="border text-gray-700 p-2">{q.rejectionReason || ""}</td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             )}


// //             <button
// //                 onClick={handleSubmitApproval}
// //                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
// //                 disabled={loading}
// //             >
// //                 {loading ? "Submitting..." : "Submit for Approval"}
// //             </button>
// //         </div>
// //     );
// // }

// // export default ApprovalPage;
