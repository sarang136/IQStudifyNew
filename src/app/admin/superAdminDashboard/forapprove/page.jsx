
'use client';
import { useEffect, useState } from "react";
import axios from "axios";

function Modal({ open, onClose, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
                    aria-label="Close"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [message, setMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOptions, setModalOptions] = useState([]);
    const [modalQuestion, setModalQuestion] = useState(null);

    useEffect(() => {
        const fetchPendingQuestions = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setMessage("Authentication required. Please log in.");
                    return;
                }

                const response = await axios.get("/api/admin/questionstatus?status=pending", {
                    headers: {
                        Authorization: `Bearer ${token.trim()}`,
                    },
                });

                if (response.data.questions.length === 0) {
                    setMessage("No pending questions available.");
                } else {
                    setQuestions(response.data.questions);
                    setMessage("");
                }
            } catch (error) {
                if (error.response?.status === 404) {
                    setMessage("No pending questions found or API route not available.");
                } else {
                    setMessage(`Error: ${error.response?.data?.message || error.message}`);
                }
            }
        };

        fetchPendingQuestions();
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedQuestions((prev) =>
            prev.includes(id) ? prev.filter((qid) => qid !== id) : [...prev, id]
        );
    };

    const handleApproveSelected = async (id = null) => {
        const questionsToApprove = id ? [id] : selectedQuestions;

        if (questionsToApprove.length === 0) {
            alert("No questions selected");
            return;
        }

        try {
            await axios.put("/api/superadmin/appruvequestions", {
                questionIds: questionsToApprove,
            });

            alert("Questions Approved Successfully");

            setQuestions((prev) => prev.filter((q) => !questionsToApprove.includes(q._id)));
            setSelectedQuestions((prev) => prev.filter((qid) => !questionsToApprove.includes(qid)));

        } catch (error) {
            alert(`Error: ${error.response?.data?.error || error.message}`);
        }
    };

    const handleReject = async (id) => {
        const reason = prompt("Enter rejection reason:");
        if (!reason) return;

        try {
            await axios.put(`/api/superadmin/approverejectquestion/${id}`, {
                status: "rejected",
                rejectionReason: reason,
            });

            alert("Question Rejected");

            setQuestions((prev) => prev.filter((q) => q._id !== id));
            setSelectedQuestions((prev) => prev.filter((qid) => qid !== id));
        } catch (error) {
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleViewOptions = (q) => {
        setModalOptions(q.options || []);
        setModalQuestion(q);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalOptions([]);
        setModalQuestion(null);
    };

    return (
        <div className="p-4  text-gray-800 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <button
                onClick={handleApproveSelected}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
            >
                Approve Selected
            </button>

            {message && <p className="text-red-400 mb-4">{message}</p>}

            <div className="overflow-x-auto w-full">
                <table className="min-w-full table-auto border border-gray-700 text-sm">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="p-2 border">
                                <input
                                    type="checkbox"
                                    onChange={(e) =>
                                        setSelectedQuestions(
                                            e.target.checked ? questions.map((q) => q._id) : []
                                        )
                                    }
                                    checked={selectedQuestions.length === questions.length && questions.length > 0}
                                />
                            </th>
                            <th className="p-2 border">Subcategory</th>
                            <th className="p-2 border">Question</th>
                            <th className="p-2 border">Options</th>
                            <th className="p-2 border">DirectAnswer</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((q) => (
                            <tr key={q._id} className="">
                                <td className="p-2 border">
                                    <input
                                        type="checkbox"
                                        checked={selectedQuestions.includes(q._id)}
                                        onChange={() => handleCheckboxChange(q._id)}
                                    />
                                </td>

                                {/* Sub Category */}
                                <td className="p-2 border">{q.subCategory}</td>

                                {/* Question */}
                                <td className="p-2 border">
                                    <div
                                        className="prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: q.questionText }}
                                    />
                                </td>

                                {/* Options */}
                                <td className="p-2 border">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                        onClick={() => handleViewOptions(q)}
                                        type="button"
                                    >
                                        View
                                    </button>
                                </td>

                                {/* Answer (NEW added) */}
                                <td className="p-2 border font-semibold text-green-400">
                                    <div
                                        className="prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: q.directAnswer }}
                                    />
                                </td>

                                {/* Approve / Reject buttons */}
                                <td className="p-2 border space-x-2">
                                    <button
                                        onClick={() => handleApproveSelected(q._id)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(q._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Options */}
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <h2 className="text-lg font-bold mb-4">Options</h2>
                {modalQuestion && (
                    <div className="mb-2">
                        <div className="text-gray-700 font-semibold mb-2">Question:</div>
                        <div
                            className="prose prose-sm max-w-none mb-4"
                            dangerouslySetInnerHTML={{ __html: modalQuestion.questionText }}
                        />
                    </div>
                )}
                {modalOptions && modalOptions.length > 0 ? (
                    <ul className="list-disc pl-4">
                        {modalOptions.map((op, idx) => (
                            <li key={idx} className="mb-2">
                                <div
                                    className="prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: op }}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-gray-500">No options available.</div>
                )}
            </Modal>
        </div>
    );
}
