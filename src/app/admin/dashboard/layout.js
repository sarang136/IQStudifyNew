"use client";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter, usePathname } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaShieldAlt,
  FaQuestionCircle,
  FaPlusSquare,
  FaEdit,
  FaFolderOpen,
  FaSitemap,
  FaUserCircle,
  FaUser,
} from "react-icons/fa";
import Image from "next/image";
import axios from "axios";

export default function DashboardLayout({ children }) {
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [operatorName, setOperatorName] = useState("");
  const [operatorMail, setOperatorMail] = useState("");
  const [permissions, setPermissions] = useState({});
  const [message, setMessage] = useState("");
  const [loggedInOperator, setLoggedInOperator] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  const sidebarRef = useRef(null); // 👈 ref for profile sidebar

  const menuItems = [
    { title: "Dashboard", path: "/admin/dashboard/dashboard", icon: <FaShieldAlt /> },
    { title: "Total MCQ's", path: "/admin/dashboard/totalmcqs", icon: <FaSitemap /> },
    { title: "Add Questions", path: "/admin/dashboard/pageforappruve", icon: <FaQuestionCircle /> },
    { title: "Add Title Category", path: "/admin/dashboard/addtitlecategory", icon: <FaPlusSquare /> },
    { title: "Add Category", path: "/admin/dashboard/addcategory", icon: <FaEdit /> },
    { title: "Add Section", path: "/admin/dashboard/addSection", icon: <FaFolderOpen /> },
    { title: "Categories and Subcategories", path: "/admin/dashboard/titles", icon: <FaSitemap /> },
  ];

  useEffect(() => {
    const operator = localStorage.getItem("operatorInfo");
    if (operator) {
      try {
        const parsed = JSON.parse(operator);
        setOperatorName(parsed?.name || "Operator Name");
        setOperatorMail(parsed?.email || "Operator Email");
        fetchOperators(parsed?.email); // ✅ fetch operator from DB using email
      } catch (err) {
        console.error("Invalid operatorInfo in storage");
      }
    }
  }, []);

  const fetchOperators = async (email) => {
    try {
      const response = await axios.get("/api/admin/getoperator");
      const allOperators = response.data;
      const matchedOperator = allOperators.find((op) => op.email === email);
      if (matchedOperator) {
        console.log("✅ loggedInOperator", matchedOperator);
        setPermissions(matchedOperator.permissionId || {});
        setLoggedInOperator(matchedOperator); // save full operator info
      }
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || err.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("operatorInfo");
    localStorage.removeItem("operatorToken");
    toast.success("Logged Out");
    setTimeout(() => {
      router.push("/admin/OperatorLogin");
    }, 1000);
  };

  // 👇 Detect click outside profile sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setProfileSidebarOpen(false);
      }
    }

    if (profileSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileSidebarOpen]);

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="text-black flex items-center justify-between bg-[#072B78] h-[12vh] shadow-md z-10">
          <div className="flex items-center">
            <button
              className="md:hidden text-white ml-4"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
            </button>

            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="bg-white h-[15vh] w-64 py-6 px-12 hidden md:block "
            />
          </div>

          <div className="p-4 text-white flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4"></div>
            <div className="">
              <FaUserCircle
                size={48}
                className="text-white transition-[0.5s] cursor-pointer hover:text-gray-300"
                onClick={() => setProfileSidebarOpen(true)}
              />
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden z-40">
          {/* Sidebar */}
          <aside
            className={`w-64 p-4 transition-transform duration-300 overflow-y-auto z-30 shadow-lg bg-white
              fixed md:relative md:translate-x-0 md:block h-full 
              ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            {/* User Info */}
            <div className="flex flex-col items-center mb-6">
              <div className="p-2 rounded-full text-white text-3xl mb-2 bg-orange-500">
                <FaUser />
              </div>
              <p className="font-medium">Operator</p>
            </div>

            <nav className="space-y-4">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <p
                      className={`text-xl transition-[0.3s] p-2 bg-[#74CDFF26] rounded-full ${
                        isActive ? "text-white bg-[#EF9C01]" : "text-gray-600"
                      }`}
                    >
                      {item?.icon}
                    </p>
                    <a
                      href={item.path}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-[0.3s] ${
                        isActive ? "text-blue-800" : "hover:text-blue-800"
                      }`}
                    >
                      {item.title}
                    </a>
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Sidebar overlay for mobile */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 md:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>

      {/* Toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />

      {/* Profile Sidebar */}
      <div
        ref={sidebarRef} // 👈 ref added
        className={`fixed top-0 right-0 h w-64 bg-white shadow-lg z-[100] transform transition-transform duration-300 ${
          profileSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            onClick={() => setProfileSidebarOpen(false)}
            className="text-black transition-[0.5s] text-3xl bg-white"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col gap-6 h-full p-6">
          <div className="flex flex-col items-center gap-2">
            <FaUserCircle size={60} className="text-[#072B78]" />
            <h2 className="text-lg font-bold text-gray-800 text-center">
              {loggedInOperator
                ? `${loggedInOperator.name.toUpperCase()} ${loggedInOperator.lastName?.toUpperCase()}`
                : operatorName}
            </h2>
          </div>

          {/* Form-style layout */}
          <div className="bg-gray-100 rounded-xl p-4 w-full shadow-inner">
            <div className="mb-3">
              <label className="block text-xs font-semibold text-gray-500">E-mail</label>
              <input
                type="text"
                value={loggedInOperator?.email || operatorMail}
                readOnly
                className="w-full bg-white text-sm px-3 py-2 mt-1 rounded border border-gray-300"
              />
            </div>

            {loggedInOperator?.contactNumber && (
              <div className="mb-3">
                <label className="block text-xs font-semibold text-gray-500">Contact Number</label>
                <input
                  type="text"
                  value={loggedInOperator.contactNumber}
                  readOnly
                  className="w-full bg-white text-sm px-3 py-2 mt-1 rounded border border-gray-300"
                />
              </div>
            )}

            {loggedInOperator?.joiningDate && (
              <div>
                <label className="block text-xs font-semibold text-gray-500">Account Opened On</label>
                <input
                  type="text"
                  value={new Date(loggedInOperator.joiningDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                  readOnly
                  className="w-full bg-white text-sm px-3 py-2 mt-1 rounded border border-gray-300"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="w-full max-w-[200px] bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm shadow-md transition"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
