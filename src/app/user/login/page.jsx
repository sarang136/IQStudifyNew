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

export default function LoginPage({ setShowModal }) {
    const [formData, setFormData] = useState({
        username: "user@gmail.com",
        password: "123",
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
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Invalid credentials");
                toast.error(data.message || "Login failed!");
                return;
            }

            // Save token to localStorage
            localStorage.setItem("userId", data.user._id);
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("userToken", data.userToken);
            // localStorage.setItem("userId", response.data.userId);
            window.dispatchEvent(new Event("user-auth-changed")); // ✅ must be after localStorage set

            toast.success("Login successful! Redirecting...");

            setTimeout(() => {
                router.push("/");
                setShowModal(null);

            }, 2000);
        } catch (err) {
            setError("An error occurred. Please try again.");
            toast.error("An error occurred. Please try again.");
        }
    };

    return (

        <div className={` ${raleway.className} w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-md `} >
            <ToastContainer />

            <h1 className="text-3xl font-bold mb-1">Welcome back <span>👋</span></h1>
            <p className="text-gray-500 mb-6">Welcome back! Let’s continue your smart learning journey</p>



            {/* Error */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
                {/* Email / Username */}
                <div className="mb-4">
                    <label className="block text-sm mb-1">Email address</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Remember Me */}
                <div className="flex items-center mb-4">
                    <input type="checkbox" id="remember" className="mr-2" />
                    <label htmlFor="remember" className="text-sm">Remember me</label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition"
                >
                    Login
                </button>
            </form>

            {/* Forgot Password */}
            <p
                className="text-right mt-4 text-sm text-blue-500 hover:underline cursor-pointer"
                onClick={() => router.push('./ForgotPasswordPage')}
            >
                Forgot Password?
            </p>

            {/* Sign Up Link */}
            <p className="text-sm text-center mt-4">
                Don’t have an account?{' '}
                <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => setShowModal('signup')}
                >
                    Sign up here
                </span>
            </p>
        </div>
    );
}