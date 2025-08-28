"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
// import {Image}

export default function OperatorLoginPage() {
    const [formData, setFormData] = useState({ email: "varsha@gmail.com", password: "123" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const baseURL = "http://localhost:3000/api";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true); // Set loading to true

        try {
            const response = await axios.post(`${baseURL}/admin/operatorlogin`, formData);
            console.log(response, "response");

            // Save token and user info in localStorage
            localStorage.setItem("operatorToken", response.data.result.token);
            localStorage.setItem("operatorInfo", JSON.stringify(response.data.result));

            // Show success toast
            toast.success("Login successful!");

            // Redirect to dashboard
            setTimeout(() => {
                router.push("/admin/dashboard");
            }, 1000);
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Login failed. Please try again.");

            // Show error toast
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#74CDFF26] p-6">
            <ToastContainer /> 
            <div className=" rounded-lg p-8 w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col justify-center items-cente gap-8">
                {/* <h1 className="text-2xl font-bold mb-6 text-center">Operator Login</h1> */}
                <div className="flex flex-col items-center gap-2">
                    <Image 
                    height={100}
                    width={100}
                    className="h-[100px] w-[250px]"
                    src='/logo.png'
                    />
                    <Image 
                    height={100}
                    width={100}
                    className="h-[80px] w-[80px] "
                    src='/icon.png'
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className={`w-full bg-[#EF9C01] text-white p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading} 
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="text-right mt-2 text-blue-500 cursor-pointer" onClick={() => router.push("./forgotpassword")}>
                    Forgot Password?
                </p>
            </div>
        </div>
    );
}
