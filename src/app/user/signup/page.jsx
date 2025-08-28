"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Raleway } from 'next/font/google';


const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // You can include other weights if needed
    variable: '--font-raleway',
});

export default function SignupPage({ setShowModal }) {
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        username: "",
        password: "",
        contactNumber: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();


            if (!response.ok) {
                setError(data.message || "Something went wrong");
                toast.error(data.message || "Signup failed!");
                return;
            }

            toast.success("Signup successful! Redirecting to login...");
            setTimeout(() => {
                router.push("/user/login");
            }, 2000);
        } catch (err) {
            setError("An error occurred. Please try again.");
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className={` ${raleway.className} max-w-lg mx-auto mt-10 px-2 bg-white  rounded-md `} >
            <ToastContainer />

            <h1 className="text-3xl font-bold mb-1">Create account <span>🎉</span></h1>
            <p className="text-gray-500 mb-6">Join us and kickstart your smart learning journey!</p>



            {/* Error */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
                {/* First Name */}
                <div className="mb-4">
                    <label className="block text-sm mb-1">First Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Last Name */}
                <div className="mb-4">
                    <label className="block text-sm mb-1">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Username */}
                <div className="mb-4">
                    <label className="block text-sm mb-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Contact Number */}
                <div className="mb-4">
                    <label className="block text-sm mb-1">Contact Number</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-sm mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition"
                >
                    Signup
                </button>
            </form>

            {/* Already have an account */}
            <p className="text-sm text-center mt-4">
                Already have an account?{' '}
                <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => setShowModal('login')}
                >
                    Login here
                </span>
            </p>
        </div>
    );
}