"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewQuestionPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("operatorToken");
        const info = localStorage.getItem("operatorInfo");
        const parsedInfo = JSON.parse(info);
        const operatorId = parsedInfo?.operatorId;

        if (!token || !operatorId) {
          setMessage("Token or Operator ID missing.");
          return;
        }

        const res = await axios.get(
          `/api/admin/getOperatorQuestions/${operatorId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const allQuestions = res.data?.questions || [];
        const matched = allQuestions.find((q) => q._id === id);

        if (!matched) {
          setMessage("Question not found.");
        } else {
          setQuestion(matched);
        }
      } catch (err) {
        console.error(err);
        setMessage("Error fetching question.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (message) return <p className="text-red-500 p-6">{message}</p>;

  const getOptionLabel = (index) => String.fromCharCode(65 + index); // A, B, C, D

  return (
    <div className="bg-blue-50 p-6 rounded-lg w-[80vw] mx-auto">
      <h2
        className="text-xl font-semibold mb-4"
        dangerouslySetInnerHTML={{ __html: question.questionText }}
      />

      <div className="space-y-4">
        {question.options.map((opt, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg ${
              idx === question.correctOptionIndex
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            <div className="border border-blue-700 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {getOptionLabel(idx)}
            </div>
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: opt }}
            />
          </div>
        ))}
      </div>

      <hr className="my-6" />

      <p className="text-lg font-semibold">
        Correct Answer: Option {getOptionLabel(question.correctOptionIndex)}
      </p>

      {question.answerExplanation && (
        <p
          className="text-gray-600 mt-2"
          dangerouslySetInnerHTML={{
            __html: question.answerExplanation,
          }}
        />
      )}
    </div>
  );
}
