// "use client";
// import axios from "axios";
// import { Suspense, useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import jsPDF from "jspdf";
// import Loading from "../Loading/page";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Select from "react-select";
// import { Raleway } from 'next/font/google';
// import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
// import { MdOutlinePlayArrow } from "react-icons/md";

// const raleway = Raleway({
//     subsets: ['latin'],
//     weight: ['400', '500', '600', '700'],
//     variable: '--font-raleway',
// });

// const SectionPageContent = () => {
//     const searchParams = useSearchParams();
//     const [downloading, setDownloading] = useState(false);
//     const subcategoryId = searchParams.get("id") || "No value";
//     const [userData, setUserData] = useState([]);
//     const [sections, setSections] = useState([]);
//     const [selectedSection, setSelectedSection] = useState(null);
//     const [questions, setQuestions] = useState([]);
//     const [answers, setAnswers] = useState({});
//     const [completedSections, setCompletedSections] = useState(new Set());
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [results, setResults] = useState(null);
//     const [subcategories, setSubcategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showExplanation, setShowExplanation] = useState({});
//     const [savedQuestions, setSavedQuestions] = useState([]);
//     const [subcategoryIds, setSubcategoryIds] = useState();

//     const router = useRouter();
//     const [userId, setUserId] = useState(null);
//     const [userName, setUserName] = useState(null);
//     const [token, setToken] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         setToken(token)
//         const storedUserId = localStorage.getItem("userId");
//         setUserId(storedUserId);
//         const storedUserName = localStorage.getItem("userName");
//         setUserName(storedUserName);
//     }, []);

//     useEffect(() => {
//         const fetchSubcategories = async () => {
//             try {
//                 setLoading(true);
//                 const response = await fetch(`/api/admin/getallsubcategory`);
//                 if (!response.ok) throw new Error('Failed to fetch subcategories');

//                 const data = await response.json();
//                 // Handle both array and object response formats
//                 const subcategoriesData = data?.subcategories || data?.data || data || [];
//                 setSubcategories(Array.isArray(subcategoriesData) ? subcategoriesData : []);
//             } catch (error) {
//                 console.error("Error fetching subcategories:", error);
//                 setSubcategories([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSubcategories();
//     }, [router]);

//     useEffect(() => {
//         const fetchSections = async () => {
//             if (!subcategoryId) return;
//             setLoading(true);
//             try {
//                 const response = await axios.get(`/api/admin/allsection`, {
//                     params: { subcategoryId },
//                 });

//                 console.log(response.data)
//                 setLoading(false);
//                 setSections(response.data.sections);
//                 if (response.data.sections.length > 0) {
//                     handleSectionClick(response.data.sections[0]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching sections:", error);
//             }
//         };

//         fetchSections();
//     }, [subcategoryId]);

//     const handleSectionClick = (section) => {
//         if (completedSections.has(section._id)) return;

//         setSelectedSection(section);
//         setQuestions(section.questions);

//         // ✅ Reset answers only for this section's questions
//         const freshAnswers = section.questions.reduce((acc, q) => {
//             acc[q._id] = null;
//             return acc;
//         }, {});

//         setAnswers(freshAnswers);
//         setCurrentPage(0);

//     };


//     const handleSubmitTest = async () => {
//         if (!selectedSection || isSubmitting) return;

//         setIsSubmitting(true);

//         try {
//             const responses = questions?.map((q) => {
//                 const isDirectAnswer = q.questionType === "direct";

//                 return {
//                     questionId: q._id,
//                     questionText: q.questionText,
//                     answer: answers[q._id] !== undefined ? answers[q._id] : null,
//                     correctOptionIndex: !isDirectAnswer ? q.correctOptionIndex : null,
//                     directAnswer: isDirectAnswer ? q.directAnswer : null,
//                 };
//             });

//             const response = await axios.post("/api/user/submittest", {
//                 userId,
//                 sectionId: selectedSection._id,
//                 responses,
//             });

//             if (response.status === 201) {
//                 alert("Test submitted successfully!");
//                 setCompletedSections((prev) => new Set([...prev, selectedSection._id]));
//                 setResults(response.data);
//                 setSelectedSection(null);
//             }
//         } catch (error) {
//             console.error("Error submitting test:", error);
//             alert("Failed to submit test. Try again.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };


//     const handleSaveQuestion = (question) => {
//         const savedQuestion = {
//             ...question,
//             userAnswer: answers[question._id], // Include the user's answer
//         };

//         // Ensure it fetches the previous data safely
//         const currentQuestions = JSON.parse(localStorage.getItem("savedQuestions")) || [];
//         const updatedSavedQuestions = [...currentQuestions, savedQuestion];

//         // Update localStorage
//         localStorage.setItem("savedQuestions", JSON.stringify(updatedSavedQuestions));
//         setSavedQuestions(updatedSavedQuestions);

//         alert("Question saved!");
//     };

//     const handleShowExplanation = (questionId) => {
//         setShowExplanation((prev) => ({
//             ...prev,
//             [questionId]: !prev[questionId],
//         }));
//     };

//     const [currentPage, setCurrentPage] = useState(0);
//     const questionsPerPage = 5;
//     const totalPages = Math.ceil(questions.length / questionsPerPage);
//     const startIndex = currentPage * questionsPerPage;
//     const endIndex = startIndex + questionsPerPage;
//     const displayedQuestions = questions.slice(startIndex, endIndex);

//     const handlePageClick = (page) => {
//         setCurrentPage(page);
//     };

//     const downloadQuestions = async () => {
//         setDownloading(true); // start loading
//         toast.info("Preparing your download...", {
//             position: "top-right",
//             autoClose: 2000,
//             hideProgressBar: false,
//         });

//         try {
//             const response = await axios.get(
//                 "/api/admin/getallquestion?status=approved",
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             const questions = response.data;

//             if (!Array.isArray(questions) || questions.length === 0) {
//                 toast.warn("No approved questions available to download.");
//                 setDownloading(false);
//                 return;
//             }

//             const doc = new jsPDF();
//             let yOffset = 10;

//             doc.setFontSize(12);
//             doc.text("Approved Question Bank", 105, yOffset, { align: "center" });

//             questions.forEach((question, index) => {
//                 yOffset += 10;
//                 if (yOffset > 280) {
//                     doc.addPage();
//                     yOffset = 10;
//                 }

//                 doc.setFontSize(10);
//                 doc.text(`Q${index + 1}: ${stripHtml(question.questionText)}`, 10, yOffset);

//                 if (question.options?.length) {
//                     question.options.forEach((option, optIndex) => {
//                         yOffset += 6;
//                         doc.text(`  ${String.fromCharCode(65 + optIndex)}. ${option}`, 15, yOffset);
//                     });
//                 }

//                 yOffset += 8;
//             });

//             doc.save("Downloaded_Questions.pdf");
//             toast.success("Download complete!");

//         } catch (error) {
//             console.error("Error downloading approved questions:", error);
//             toast.error("Error occurred while downloading.");
//         } finally {
//             setDownloading(false); // end loading
//         }
//     };

//     // Utility to strip HTML tags
//     function stripHtml(html) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = html;
//         return tempDiv.textContent || tempDiv.innerText || "";
//     }

//     const customStyles = {
//         control: (base) => ({
//             ...base,
//             padding: '2px',
//             borderRadius: '0.5rem',
//             backgroundColor: '#f3f4f6', // Tailwind bg-gray-100
//             border: 'none',
//             boxShadow: 'none',

//             ':hover': {
//                 backgroundColor: '#dbeafe', // Tailwind hover:bg-blue-100
//             },
//         }),
//         option: (base, state) => ({
//             ...base,
//             backgroundColor: state.isSelected
//                 ? '#3b82f6' // Tailwind bg-blue-500
//                 : state.isFocused
//                     ? '#dbeafe' // Tailwind hover:bg-blue-100
//                     : '#f3f4f6', // Tailwind bg-gray-100
//             color: state.isSelected ? 'white' : '#1f2937', // Tailwind text-white or text-gray-800
//             cursor: 'pointer',
//             padding: '10px',
//         }),
//         menuPortal: (base) => ({
//             ...base,
//             zIndex: 99999, // 🔥 bumped higher than 999
//           }),
//     };

//     return (
//         <div className={` ${raleway.className} flex flex-col lg:flex-row h-screen bg-gradient-to-r from-gray-100 to-gray-200 `} >
//             {/* Sidebar */}

//             <div className="lg:w-1/4 w-full h-[800px] sm:h-screen p-4 bg-white shadow-md overflow-auto">
//                 <h2 className="text-2xl font-bold text-blue-600 mb-4 mt-20">Sub Categories</h2>
//                 {loading ? (
//                     <ul className="space-y-2">
//                         {Array.from({ length: 5 }).map((_, index) => (
//                             <li
//                                 key={index}
//                                 className="p-3 bg-gray-300 animate-pulse rounded-lg"
//                             ></li>
//                         ))}
//                     </ul>
//                 ) : subcategories.length > 0 ? (

//                     <>
//                         <div className="lg:hidden mb-4 w-full">
//                             <Select
//                                 styles={customStyles}
//                                 className="react-select-container "
//                                 classNamePrefix="react-select"

//                                 options={subcategories.map((category) => ({
//                                     value: category._id,
//                                     label: category.name,
//                                 }))}
//                                 value={subcategories.find((sub) => sub._id === subcategoryId) || null}
//                                 onChange={(selectedOption) => {
//                                     if (selectedOption) {
//                                         const selectedSubcategory = subcategories.find(
//                                             (sub) => sub._id === selectedOption.value
//                                         );
//                                         if (selectedSubcategory) {
//                                             handleSectionClick(selectedSubcategory);
//                                         }
//                                     }
//                                 }}
//                                 placeholder="Select a subcategory"
//                                 isClearable
//                             />
//                         </div>

//                         <div className="hidden lg:block  overflow-y-auto space-y-2 pr-2 ">
//                             <ul className="space-y-2">
//                                 {subcategories?.map((category) => (
//                                     <li
//                                         key={category._id}
//                                         className={`p-3 rounded-lg transition duration-300 cursor-pointer ${category._id === subcategoryId
//                                             ? "bg-blue-500 text-white hover:bg-blue-600"
//                                             : "bg-gray-100 hover:bg-blue-100"
//                                             }`}
//                                         onClick={() => setSubcategoryIds(category._id)}
//                                     >
//                                         {category.name}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </>
//                 ) : (
//                     <p className="text-gray-500">No categories available</p>
//                 )}
//             </div>

//             {/* Main Content */}
//             <main className=" w-full p-6 bg-gray-50 overflow-y-scroll">
//                 {loading && <Loading />}
//                 <h2 className="text-xl font-bold text-gray-800 mb-4 text-center md:mt-20 ">
//                     Each Section Contains Maximum 50 Questions
//                 </h2>
//                 <aside className="flex flex-wrap gap-3 justify-center mb-6">
//                     {sections?.length > 0 ? (
//                         sections?.map((section) => (
//                             <button
//                                 key={section._id}
//                                 className={`px-4 py-2 font-bold rounded-lg transition-colors ${selectedSection?._id === section._id
//                                     ? "bg-blue-500 text-white"
//                                     : "bg-gray-300 hover:bg-blue-400 hover:text-white"
//                                     }`}
//                                 onClick={() => handleSectionClick(section)}
//                             >
//                                 {section.name}
//                             </button>
//                         ))
//                     ) : (
//                         <p className="text-gray-500">Wait for the sections to load.</p>
//                     )}
//                 </aside>

//                 <div className="w-full max-w-4xl mx-auto">
//                     {selectedSection ? (
//                         <div className="bg-white p-6 shadow-lg rounded-lg">
//                             {questions.length > 0 ? (
//                                 <div>
//                                     {displayedQuestions?.map((question, index) => (
//                                         <div key={question._id} className="mb-6 border-b pb-4">
//                                             <div className="mb-6  bg-white">
//                                                 {/* Question Number */}
//                                                 <div className="inline-block overscroll-x-auto mb-3 px-1 py-1 rounded-full bg-sky-100 text-sky-700 font-bold text-sm">
//                                                     Question {startIndex + index + 1}
//                                                 </div>

//                                                 {/* Question Text */}
//                                                 <div
//                                                     className="text-base text-gray-800 font-medium prose prose-sm max-w-none"
//                                                     dangerouslySetInnerHTML={{ __html: question?.questionText }}
//                                                 />
//                                             </div>


//                                             {question.questionType === "direct" ? (
//                                                 <div className="mt-2">
//                                                     <input
//                                                         type="text"
//                                                         className="w-full p-2 border rounded-lg"
//                                                         placeholder="Enter your answer"
//                                                         value={answers[question._id] || ""}
//                                                         onChange={(e) =>
//                                                             setAnswers((prev) => ({
//                                                                 ...prev,
//                                                                 [question._id]: e.target.value,
//                                                             }))
//                                                         }
//                                                     />
//                                                 </div>
//                                             ) : (

//                                                 <ul className="mt-4 space-y-4">
//                                                     {question.options
//                                                         ?.filter((option) => option && option.trim() !== "")
//                                                         ?.map((option, optIndex) => {
//                                                             const originalIndex = question.options.indexOf(option);
//                                                             const isCorrect = originalIndex === question.correctOptionIndex;
//                                                             const isSelected = answers[question._id] === option;

//                                                             let baseClasses =
//                                                                 "w-full border rounded-lg px-4 py-3 flex items-center space-x-3 cursor-pointer transition-all duration-200";

//                                                             let bgClass = "border-gray-300 bg-white";
//                                                             if (isSelected) {
//                                                                 bgClass = isCorrect
//                                                                     ? "border-green-500 bg-green-100"
//                                                                     : "border-red-500 bg-red-100";
//                                                             } else {
//                                                                 bgClass = "border-gray-300 bg-white hover:bg-blue-50";
//                                                             }

//                                                             return (
//                                                                 <li key={originalIndex}>
//                                                                     <label
//                                                                         htmlFor={`mcq-${question._id}-${optIndex}`}
//                                                                         className={`${baseClasses} ${bgClass}`}
//                                                                     >
//                                                                         <input
//                                                                             type="radio"
//                                                                             id={`mcq-${question._id}-${optIndex}`}
//                                                                             name={`mcq-${question._id}`}
//                                                                             value={option}
//                                                                             checked={isSelected}
//                                                                             onChange={() =>
//                                                                                 setAnswers((prev) => ({
//                                                                                     ...prev,
//                                                                                     [question._id]: option,
//                                                                                 }))
//                                                                             }
//                                                                             className="accent-blue-600"
//                                                                         />
//                                                                         <span
//                                                                             className={`text-gray-800 ${isSelected && isCorrect ? "font-semibold" : ""
//                                                                                 }`}
//                                                                             dangerouslySetInnerHTML={{ __html: option }}
//                                                                         />
//                                                                     </label>
//                                                                 </li>
//                                                             );
//                                                         })}
//                                                 </ul>


//                                             )}

//                                             <div className="flex gap-4 mt-4">
//                                                 <button
//                                                     onClick={() => handleShowExplanation(question._id)}
//                                                     className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                                                 >
//                                                     Explanation
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleSaveQuestion(question)}
//                                                     className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//                                                 >
//                                                     Save
//                                                 </button>
//                                             </div>

//                                             {showExplanation[question._id] && (
//                                                 <div className="mt-2 p-2 bg-gray-100 rounded-lg">
//                                                     <p className="text-sm text-gray-700">
//                                                         {question.answerExplanation}
//                                                     </p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}

//                                     <div className="flex flex-col gap-4 mt-6">
//                                         {/* Top row: Prev & Next buttons */}
//                                         <div className="flex justify-between">
//                                             <button
//                                                 onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
//                                                 disabled={currentPage === 0}
//                                                 className={`px-4 py-2 rounded-lg ${currentPage === 0
//                                                     ? "bg-gray-300 cursor-not-allowed"
//                                                     : "bg-blue-500 text-white hover:bg-blue-600"
//                                                     }`}
//                                             >
//                                                 Previous
//                                             </button>

//                                             <button
//                                                 onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
//                                                 disabled={currentPage === totalPages - 1}
//                                                 className={`flex items-center justify-center gap-2 px-6 py-2 rounded-md font-semibold shadow-sm transition duration-200 ${currentPage === totalPages - 1
//                                                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                                     : "bg-[#072B78] text-white hover:bg-blue-700"
//                                                     }`}
//                                             >
//                                                 Next <MdOutlinePlayArrow className="text-lg" />
//                                             </button>
//                                         </div>

//                                         {/* Scrollable page number bar */}
//                                         <div className="overflow-x-auto">
//                                             <div className="flex gap-2 w-max">
//                                                 {Array.from({ length: totalPages }, (_, index) => (
//                                                     <button
//                                                         key={index}
//                                                         onClick={() => handlePageClick(index)}
//                                                         className={`px-4 py-2 rounded-lg whitespace-nowrap ${currentPage === index
//                                                             ? "bg-blue-500 text-white"
//                                                             : "bg-gray-300 hover:bg-blue-400 hover:text-white"
//                                                             }`}
//                                                     >
//                                                         {index + 1}
//                                                     </button>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>
//                             ) : (
//                                 <p className="text-center text-gray-500">No questions available.</p>
//                             )}
//                         </div>
//                     ) : (
//                         <p className="text-center text-lg text-gray-500 mt-4">
//                             Select a section to begin.
//                         </p>
//                     )}
//                     <div className="mt-6 text-center">
//                         <button
//                             onClick={downloadQuestions}
//                             className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
//                             disabled={downloading}
//                         >
//                             {downloading ? "Downloading..." : "Download Questions as PDF"}
//                         </button>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// const SectionPage = () => (
//     <Suspense fallback={<p>Loading...</p>}>
//         <SectionPageContent />
//     </Suspense>
// );

// export default SectionPage;




"use client";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import jsPDF from "jspdf";
import Loading from "../Loading/page";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { Raleway } from 'next/font/google';
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { MdOutlinePlayArrow } from "react-icons/md";

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-raleway',
});

const SectionPageContent = () => {
    const searchParams = useSearchParams();
    const [downloading, setDownloading] = useState(false);
    const subcategoryId = searchParams.get("id") || "No value";
    const [userData, setUserData] = useState([]);
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [completedSections, setCompletedSections] = useState(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [results, setResults] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showExplanation, setShowExplanation] = useState({});
    const [savedQuestions, setSavedQuestions] = useState([]);
    const [subcategoryIds, setSubcategoryIds] = useState();

    const router = useRouter();
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token)
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
        const storedUserName = localStorage.getItem("userName");
        setUserName(storedUserName);
    }, []);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/admin/getallsubcategory`);
                if (!response.ok) throw new Error('Failed to fetch subcategories');

                const data = await response.json();
                // Handle both array and object response formats
                const subcategoriesData = data?.subcategories || data?.data || data || [];
                setSubcategories(Array.isArray(subcategoriesData) ? subcategoriesData : []);
            } catch (error) {
                console.error("Error fetching subcategories:", error);
                setSubcategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSubcategories();
    }, [router]);

    useEffect(() => {
        const fetchSections = async () => {
            if (!subcategoryId) return;
            setLoading(true);
            try {
                const response = await axios.get(`/api/admin/allsection`, {
                    params: { subcategoryId },
                });

                console.log(response.data)
                setLoading(false);
                setSections(response.data.sections);
                if (response.data.sections.length > 0) {
                    handleSectionClick(response.data.sections[0]);
                }
            } catch (error) {
                console.error("Error fetching sections:", error);
            }
        };

        fetchSections();
    }, [subcategoryId]);

    const handleSectionClick = (section) => {
        if (completedSections.has(section._id)) return;

        setSelectedSection(section);
        setQuestions(section.questions);

        // ✅ Reset answers only for this section's questions
        const freshAnswers = section.questions.reduce((acc, q) => {
            acc[q._id] = null;
            return acc;
        }, {});

        setAnswers(freshAnswers);
        setCurrentPage(0);

    };


    const handleSubmitTest = async () => {
        if (!selectedSection || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const responses = questions?.map((q) => {
                const isDirectAnswer = q.questionType === "direct";

                return {
                    questionId: q._id,
                    questionText: q.questionText,
                    answer: answers[q._id] !== undefined ? answers[q._id] : null,
                    correctOptionIndex: !isDirectAnswer ? q.correctOptionIndex : null,
                    directAnswer: isDirectAnswer ? q.directAnswer : null,
                };
            });

            const response = await axios.post("/api/user/submittest", {
                userId,
                sectionId: selectedSection._id,
                responses,
            });

            if (response.status === 201) {
                alert("Test submitted successfully!");
                setCompletedSections((prev) => new Set([...prev, selectedSection._id]));
                setResults(response.data);
                setSelectedSection(null);
            }
        } catch (error) {
            console.error("Error submitting test:", error);
            alert("Failed to submit test. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleSaveQuestion = (question) => {
        const savedQuestion = {
            ...question,
            userAnswer: answers[question._id], // Include the user's answer
        };

        // Ensure it fetches the previous data safely
        const currentQuestions = JSON.parse(localStorage.getItem("savedQuestions")) || [];
        const updatedSavedQuestions = [...currentQuestions, savedQuestion];

        // Update localStorage
        localStorage.setItem("savedQuestions", JSON.stringify(updatedSavedQuestions));
        setSavedQuestions(updatedSavedQuestions);

        alert("Question saved!");
    };

    const handleShowExplanation = (questionId) => {
        setShowExplanation((prev) => ({
            ...prev,
            [questionId]: !prev[questionId],
        }));
    };

    const [currentPage, setCurrentPage] = useState(0);
    const questionsPerPage = 5;
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const displayedQuestions = questions.slice(startIndex, endIndex);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const downloadQuestions = async () => {
        setDownloading(true); // start loading
        toast.info("Preparing your download...", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
        });

        try {
            const response = await axios.get(
                "/api/admin/getallquestion?status=approved",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const questions = response.data;

            if (!Array.isArray(questions) || questions.length === 0) {
                toast.warn("No approved questions available to download.");
                setDownloading(false);
                return;
            }

            const doc = new jsPDF();
            let yOffset = 10;

            doc.setFontSize(12);
            doc.text("Approved Question Bank", 105, yOffset, { align: "center" });

            questions.forEach((question, index) => {
                yOffset += 10;
                if (yOffset > 280) {
                    doc.addPage();
                    yOffset = 10;
                }

                doc.setFontSize(10);
                doc.text(`Q${index + 1}: ${stripHtml(question.questionText)}`, 10, yOffset);

                if (question.options?.length) {
                    question.options.forEach((option, optIndex) => {
                        yOffset += 6;
                        doc.text(`  ${String.fromCharCode(65 + optIndex)}. ${option}`, 15, yOffset);
                    });
                }

                yOffset += 8;
            });

            doc.save("Downloaded_Questions.pdf");
            toast.success("Download complete!");

        } catch (error) {
            console.error("Error downloading approved questions:", error);
            toast.error("Error occurred while downloading.");
        } finally {
            setDownloading(false); // end loading
        }
    };

    // Utility to strip HTML tags
    function stripHtml(html) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    }

    const customStyles = {
        control: (base) => ({
            ...base,
            padding: '2px',
            borderRadius: '0.5rem',
            backgroundColor: '#f3f4f6', // Tailwind bg-gray-100
            border: 'none',
            boxShadow: 'none',

            ':hover': {
                backgroundColor: '#dbeafe', // Tailwind hover:bg-blue-100
            },
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? '#3b82f6' // Tailwind bg-blue-500
                : state.isFocused
                    ? '#dbeafe' // Tailwind hover:bg-blue-100
                    : '#f3f4f6', // Tailwind bg-gray-100
            color: state.isSelected ? 'white' : '#1f2937', // Tailwind text-white or text-gray-800
            cursor: 'pointer',
            padding: '10px',
        }),
        menuPortal: (base) => ({
            ...base,
            zIndex: 99999, // 🔥 bumped higher than 999
        }),
        menu: (base) => ({
            ...base,
            zIndex: 99999, // Ensure the menu has high z-index
            position: 'absolute',
        }),
    };

    console.log("subcategories", subcategories)

    return (
        <div className={` ${raleway.className} flex flex-col lg:flex-row h-screen bg-gradient-to-r from-gray-100 to-gray-200 `} >
            {/* Sidebar */}

            <div className="lg:w-1/4 w-full h-[800px] sm:h-screen p-4 bg-white shadow-md overflow-auto">
                <h2 className="text-2xl font-bold text-blue-600  mt-20">Sub Categories</h2>
                {loading ? (
                    <ul className="space-y-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <li
                                key={index}
                                className="p-3 bg-gray-300 animate-pulse rounded-lg"
                            ></li>
                        ))}
                    </ul>
                ) : subcategories.length > 0 ? (

                    <>
                        <div className="lg:hidden  w-full relative z-50">
                            <div className="lg:hidden w-full relative z-50 mt-4">
                                <Select
                                    styles={customStyles}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                                    menuPosition="fixed"
                                    options={subcategories.map((category) => ({
                                        value: category._id,
                                        label: category.name,
                                    }))}
                                    // 👇 value set karo taki selected input ke andar dikhe
                                    value={
                                        subcategories.find((sub) => sub._id === subcategoryId)
                                            ? {
                                                value: subcategoryId,
                                                label: subcategories.find((sub) => sub._id === subcategoryId).name,
                                            }
                                            : null
                                    }
                                    onChange={(selectedOption) => {
                                        if (selectedOption) {
                                            router.push(`?id=${selectedOption.value}`); // ✅ URL update karo
                                        }
                                    }}
                                    placeholder="Select a subcategory"
                                    isClearable
                                />
                            </div>

                        </div>

                        <div className="hidden lg:block  overflow-y-auto space-y-2 pr-2 ">
                            <ul className="space-y-2">
                                {subcategories?.map((category) => (
                                    <li
                                        key={category._id}
                                        className={`p-3 rounded-lg transition duration-300 cursor-pointer ${category._id === subcategoryId
                                            ? "bg-blue-500 text-white hover:bg-blue-600"
                                            : "bg-gray-100 hover:bg-blue-100"
                                            }`}
                                        onClick={() => setSubcategoryIds(category._id)}
                                    >
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500">No categories available</p>
                )}
            </div>

            {/* Main Content */}
            <main className=" w-full p-6 bg-gray-50 overflow-y-scroll">
                {loading && <Loading />}
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center md:mt-20 ">
                    Each Section Contains Maximum 50 Questions
                </h2>
                <aside className="flex flex-wrap gap-3 justify-center mb-6">
                    {sections?.length > 0 ? (
                        sections?.map((section) => (
                            <button
                                key={section._id}
                                className={`px-4 py-2 font-bold rounded-lg transition-colors ${selectedSection?._id === section._id
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 hover:bg-blue-400 hover:text-white"
                                    }`}
                                onClick={() => handleSectionClick(section)}
                            >
                                {section.name}
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-500">Wait for the sections to load.</p>
                    )}
                </aside>

                <div className="w-full max-w-4xl mx-auto">
                    {selectedSection ? (
                        <div className="bg-white p-6 shadow-lg rounded-lg">
                            {questions.length > 0 ? (
                                <div>
                                    {displayedQuestions?.map((question, index) => (
                                        <div key={question._id} className="mb-6 border-b pb-4">
                                            <div className="mb-6  bg-white">
                                                {/* Question Number */}
                                                <div className="inline-block overscroll-x-auto mb-3 px-1 py-1 rounded-full bg-sky-100 text-sky-700 font-bold text-sm">
                                                    Question {startIndex + index + 1}
                                                </div>

                                                {/* Question Text */}
                                                <div
                                                    className="text-base text-gray-800 font-medium prose prose-sm max-w-none"
                                                    dangerouslySetInnerHTML={{ __html: question?.questionText }}
                                                />
                                            </div>


                                            {question.questionType === "direct" ? (
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        className="w-full p-2 border rounded-lg"
                                                        placeholder="Enter your answer"
                                                        value={answers[question._id] || ""}
                                                        onChange={(e) =>
                                                            setAnswers((prev) => ({
                                                                ...prev,
                                                                [question._id]: e.target.value,
                                                            }))
                                                        }
                                                    />
                                                </div>
                                            ) : (

                                                <ul className="mt-4 space-y-4">
                                                    {question.options
                                                        ?.filter((option) => option && option.trim() !== "")
                                                        ?.map((option, optIndex) => {
                                                            const originalIndex = question.options.indexOf(option);
                                                            const isCorrect = originalIndex === question.correctOptionIndex;
                                                            const isSelected = answers[question._id] === option;

                                                            let baseClasses =
                                                                "w-full border rounded-lg px-4 py-3 flex items-center space-x-3 cursor-pointer transition-all duration-200";

                                                            let bgClass = "border-gray-300 bg-white";
                                                            if (isSelected) {
                                                                bgClass = isCorrect
                                                                    ? "border-green-500 bg-green-100"
                                                                    : "border-red-500 bg-red-100";
                                                            } else {
                                                                bgClass = "border-gray-300 bg-white hover:bg-blue-50";
                                                            }

                                                            return (
                                                                <li key={originalIndex}>
                                                                    <label
                                                                        htmlFor={`mcq-${question._id}-${optIndex}`}
                                                                        className={`${baseClasses} ${bgClass}`}
                                                                    >
                                                                        <input
                                                                            type="radio"
                                                                            id={`mcq-${question._id}-${optIndex}`}
                                                                            name={`mcq-${question._id}`}
                                                                            value={option}
                                                                            checked={isSelected}
                                                                            onChange={() =>
                                                                                setAnswers((prev) => ({
                                                                                    ...prev,
                                                                                    [question._id]: option,
                                                                                }))
                                                                            }
                                                                            className="accent-blue-600"
                                                                        />
                                                                        <span
                                                                            className={`text-gray-800 ${isSelected && isCorrect ? "font-semibold" : ""
                                                                                }`}
                                                                            dangerouslySetInnerHTML={{ __html: option }}
                                                                        />
                                                                    </label>
                                                                </li>
                                                            );
                                                        })}
                                                </ul>


                                            )}

                                            <div className="flex gap-4 mt-4">
                                                <button
                                                    onClick={() => handleShowExplanation(question._id)}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                                >
                                                    Explanation
                                                </button>
                                                <button
                                                    onClick={() => handleSaveQuestion(question)}
                                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                                >
                                                    Save
                                                </button>
                                            </div>

                                            {showExplanation[question._id] && (
                                                <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                                                    <p className="text-sm text-gray-700">
                                                        {question.answerExplanation}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <div className="flex flex-col gap-4 mt-6">
                                        {/* Top row: Prev & Next buttons */}
                                        <div className="flex justify-between">
                                            <button
                                                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                                                disabled={currentPage === 0}
                                                className={`px-4 py-2 rounded-lg ${currentPage === 0
                                                    ? "bg-gray-300 cursor-not-allowed"
                                                    : "bg-blue-500 text-white hover:bg-blue-600"
                                                    }`}
                                            >
                                                Previous
                                            </button>

                                            <button
                                                onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                                                disabled={currentPage === totalPages - 1}
                                                className={`flex items-center justify-center gap-2 px-6 py-2 rounded-md font-semibold shadow-sm transition duration-200 ${currentPage === totalPages - 1
                                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    : "bg-[#072B78] text-white hover:bg-blue-700"
                                                    }`}
                                            >
                                                Next <MdOutlinePlayArrow className="text-lg" />
                                            </button>
                                        </div>

                                        {/* Scrollable page number bar */}
                                        <div className="overflow-x-auto">
                                            <div className="flex gap-2 w-max">
                                                {Array.from({ length: totalPages }, (_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handlePageClick(index)}
                                                        className={`px-4 py-2 rounded-lg whitespace-nowrap ${currentPage === index
                                                            ? "bg-blue-500 text-white"
                                                            : "bg-gray-300 hover:bg-blue-400 hover:text-white"
                                                            }`}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                <p className="text-center text-gray-500">No questions available.</p>
                            )}
                        </div>
                    ) : (
                        <p className="text-center text-lg text-gray-500 mt-4">
                            Select a section to begin.
                        </p>
                    )}
                    <div className="mt-6 text-center">
                        <button
                            onClick={downloadQuestions}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                            disabled={downloading}
                        >
                            {downloading ? "Downloading..." : "Download Questions as PDF"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

const SectionPage = () => (
    <Suspense fallback={<p>Loading...</p>}>
        <SectionPageContent />
    </Suspense>
);

export default SectionPage;
