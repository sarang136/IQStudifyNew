"use client";

import { Platypi } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";
import MainHomePage from "../homepage/page";
import Navbar from "@/app/component/NewNavbar/page";

const platypi = Platypi({
    subsets: ["latin"],
    weight: ["400", "400", "500"],
});

export default function NewHeroPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    // const [showModal, setShowModal] = useState(null)
    return <>
        {/* Navbar */}
        {/* <Navbar /> */}

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1F2937] via-[#1E3A8A] to-[#2563EB] text-white px-4 sm:px-8 pt-20 sm:pt-0 sm:h-screen lg:px-10 overflow-hidden flex items-center">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-1 relative z-10 h-full">
                {/* Left Image */}
                <div className="z-10">
                    <Image
                        src="/Group 37173.png"
                        alt="Students Group"
                        width={1400}
                        height={1200}
                        className="mx-auto sm:mt-20"
                    />

                </div>


                {/* Center Content */}
                <div className={`text-center z-10 ${platypi.className} `}>
                    <h1 className="text-3xl sm:text-4xl md:text-4xl  leading-relaxed">
                        Ace Every Competitive
                    </h1>
                    <h1 className="text-3xl sm:text-4xl md:text-4xl leading-relaxed">
                        Exam with <span className="text-orange-400">iQstudify</span> Practice
                    </h1>

                    <p className="mt-4 text-base text-gray-200">
                        Explore expertly crafted MCQs, real-time performance tracking, and smart
                        learning paths — all designed to help you master every subject and succeed
                        with confidence.
                    </p>
                    {/* <button className="mt-6 bg-orange-400 hover:bg-orange-500 transition-all duration-300 text-white font-semibold px-6 py-2 rounded shadow-md">
                        Start Exam
                    </button> */}
                </div>

                {/* Right Image */}
                <div className="z-10">
                    <Image
                        src="/Group 37171.png"
                        alt="Students Group"
                        width={1400}
                        height={1200}
                        className="mx-auto sm:mt-20"
                    />

                </div>
            </div>
        </section>


        {/* {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
                <div
                    className={`bg-white rounded-xl w-full relative
        ${showModal === 'category'
                            ? 'max-w-4xl max-h-[90vh] overflow-y-auto p-4'
                            : 'max-w-xl'
                        }
      `}
                >
                    <button
                        className="absolute top-5 right-8 text-gray-500 hover:text-black"
                        onClick={() => setShowModal(null)}
                    >
                        ✕
                    </button>

                    {showModal === 'login' && <LoginPage setShowModal={setShowModal} />}
                    {showModal === 'signup' && <SignupPage setShowModal={setShowModal} />}
                    {showModal === 'category' && <MainHomePage />}
                </div>
            </div>
        )} */}




    </>
}