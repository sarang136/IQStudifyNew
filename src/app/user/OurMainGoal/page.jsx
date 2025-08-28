import Image from "next/image";
import { FaCheckCircle, FaChartLine, FaKey } from "react-icons/fa";

export default function MainGoal() {
    return (
        <section id="about" className="py-12 bg-white">
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-11">
                {/* Left Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Row 1 */}
                    <div className="flex flex-col gap-4">
                        {/* Student Count (Compact) */}
                        <div className="bg-blue-500 text-white p-3 rounded-lg text-sm font-medium flex items-center justify-center flex-col">
                            <FaCheckCircle className="text-xl mb-1" />
                            <p className="text-center text-sm">1000+ Students<br />Learning Every Day</p>
                        </div>

                        {/* Image 2 */}
                        <div className="relative h-52 w-full rounded-lg overflow-hidden">
                            <div className="rounded-lg overflow-hidden">
                                <Image
                                    src="/Rectangle 75.png"
                                    alt="Student 1"
                                    width={200}
                                    height={100}
                                    className="object-contain object-top"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col  gap-4">
                        {/* Image 1 */}
                        <div className="rounded-lg overflow-hidden">
                            <Image
                                src="/Rectangle 74.png"
                                alt="Student 1"
                                width={300}
                                height={10}
                                className="object-contain object-top"
                            />
                        </div>




                        {/* Track Progress (Compact) */}
                        <div className="bg-yellow-400  text-black p-3 rounded-lg text-sm font-medium flex items-center justify-center flex-col">
                            <FaChartLine className="text-xl mb-1" />
                            <p className="text-center text-sm">Track Your<br />Progress in Real Time</p>
                        </div>
                    </div>
                </div>




                {/* Right Content */}
                <div className="text-gray-700">
                    <h2 className="text-2xl font-bold mb-4">Our Main Goal</h2>
                    <p className="mb-4">
                        To simplify exam preparation and make learning accessible, engaging, and effective for every student.
                    </p>
                    <p className="mb-4">
                        At IQStudy, our mission is to empower students with smart MCQ tools focused on clarity, improvement, and readiness.
                    </p>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <FaKey className="text-yellow-500" /> Core Objectives:
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Provide high-quality, exam-aligned MCQs</li>
                        <li>Help students identify strengths and weaknesses</li>
                        <li>Promote daily, focused, and trackable learning</li>
                        <li>Make learning enjoyable with clean, intuitive design</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
