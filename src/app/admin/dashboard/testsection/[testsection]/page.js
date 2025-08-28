"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from 'next/navigation';

function Page() {
  const { testsection: subId } = useParams(); 
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setQuestionsLoading(true);

        const token = localStorage.getItem("operatorToken");
        const info = localStorage.getItem("operatorInfo");
        const parsedInfo = JSON.parse(info);
        const operatorId = parsedInfo?.operatorId;

        if (!token || !operatorId) {
          setMessage("Authentication token or Operator ID is missing.");
          return;
        }

        const response = await axios.get(
          `/api/admin/getOperatorQuestions/${operatorId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data)

        const allQuestions = response.data.questions || [];

        // ✅ Filter by subcategory ID
        const filtered = allQuestions.filter(q => q.subCategory === subId);
        setQuestions(filtered);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setMessage("Error fetching questions.");
      } finally {
        setQuestionsLoading(false);
      }
    };

    if (subId) fetchQuestions(); 
  }, [subId]);

  const handleView = (id) => {
    router.push(`/admin/dashboard/viewquestions/${id}`);
  };

  if (questionsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="">
      {message && <div className="text-red-500 mb-4">{message}</div>}

      {questions.length === 0 ? (
        <p className="text-gray-500">No questions found for this subcategory.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-sm">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="text-left text-sm font-medium text-gray-700 border-b p-6">Sr.</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Question</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Answer & Explanation</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Operator Name</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, index) => (
                <tr key={q._id} className="hover:bg-gray-50">
                  <td className="p-6 text-sm text-gray-700 border-b">{index + 1}</td>
                  <td className="text-sm text-gray-700 border-b">
                    {(() => {
                      const tempElement = document.createElement("div");
                      tempElement.innerHTML = q.questionText;
                      const text = tempElement.innerText.trim();
                      return text.endsWith("?") ? text : text + "?";
                    })()}
                  </td>
                  <td className="p-6 text-sm text-blue-600 underline cursor-pointer border-b">
                    <button onClick={() => handleView(q._id)}>View</button>
                  </td>
                  <td className="p-6 text-sm text-gray-700 border-b">{q?.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Page;
