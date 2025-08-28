// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Navbar from "../component/Navbar/page";
// import Footer from "../component/footer/page";

// export default function ClientLayout({ children }) {
//     const router = useRouter();
//     const [loading, setLoading] = useState(true);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         // Ensure this runs only on the client
//         if (typeof window !== "undefined") {
//             const token = localStorage.getItem("token");

//             if (token) {
//                 setIsAuthenticated(true);
//             } else {
//                 router.replace("/user/login");
//             }

//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         const handleStorageChange = () => {
//             const token = localStorage.getItem("token");
//             setIsAuthenticated(!!token);
//         };

//         window.addEventListener("storage", handleStorageChange);
//         return () => window.removeEventListener("storage", handleStorageChange);
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <h1 className="text-2xl font-semibold">Loading...</h1>
//             </div>
//         );
//     }

//     return (
//         <div className="flex flex-col min-h-screen">
//             {isAuthenticated && <Navbar />}

//             {/* Content Section */}
//             <main className="flex-1 p-4">{children}</main>

//             {/* Footer Section */}
//             {isAuthenticated && <Footer className="mt-auto " />}
//         </div>


//     );
// }
///////////////////////////bottom main code


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Navbar from "../component/Navbar/page";
// import Footer from "../component/footer/page";
// // import { usePathname } from "next/navigation";


// export default function ClientLayout({ children }) {
//     const router = useRouter();
//     const pathname = usePathname(); // Get current route
//     const [loading, setLoading] = useState(true);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             const token = localStorage.getItem("token");
//             if (token) {
//                 setIsAuthenticated(true);
//             } else {
//                 router.replace("/user/login");
//             }
//             setLoading(false);
//         }
//     }, [router]);

//     useEffect(() => {
//         const handleStorageChange = () => {
//             const token = localStorage.getItem("token");
//             setIsAuthenticated(!!token);
//         };

//         window.addEventListener("storage", handleStorageChange);
//         return () => window.removeEventListener("storage", handleStorageChange);
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <h1 className="text-2xl font-semibold">Loading...</h1>
//             </div>
//         );
//     }

//     // Check if the path is in the admin panel
//     const isAdminRoute = pathname.startsWith("/admin");

//     return (
//         <div className="flex flex-col min-h-screen">
//             {!isAdminRoute && isAuthenticated && <Navbar />}

//             {/* Main Content */}
//             <main className="flex-1 p-4">{children}</main>

//             {/* Footer Section */}
//             {!isAdminRoute && isAuthenticated && <Footer className="mt-auto " />}
//         </div>
//     );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Navbar from "../component/Navbar/page";
// import MainHomePage from "../user/homepage/page";
// import Footer from "../component/footer/page";



// export default function ClientLayout({ children }) {
//     const pathname = usePathname(); // Get current route
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         setIsAuthenticated(!!token);
//     }, []);

//     const isAdminRoute = pathname.startsWith("/admin");

//     return (
//         <div className="flex flex-col min-h-screen">
//             {!isAdminRoute && <Navbar />}

//             <main className="flex-1 p-4">
//                 {isAuthenticated ? children : <MainHomePage />}
//             </main>

//             {!isAdminRoute && <Footer className="mt-auto" />}
//         </div>
//     );
// }
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
// import Navbar from "../component/Navbar/page";
import MainHomePage from "../user/homepage/page";
import Footer from "../component/footer/page";
import NewHeroPage from "../user/newLandingPage/page";
import Navbar from "../component/NewNavbar/page";
import { FiMenu, FiX } from "react-icons/fi";
import LoginPage from "../user/login/page";
import SignupPage from "../user/signup/page";

export default function ClientLayout({ children }) {
    const pathname = usePathname();
    // Footer hide
    const isFooterHidden =
        pathname.startsWith("/admin") || pathname.startsWith("/user/categorydetails");

    const [showModal, setShowModal] = useState(null);
    const [navKey, setNavKey] = useState(0)
    useEffect(() => {
        setShowModal(null); // closes modal automatically
    }, [pathname]);

    useEffect(() => {
        const handleAuthChange = () => {
            setNavKey((prev) => prev + 1); // 👈 force Navbar to remount
        };
        window.addEventListener("user-auth-changed", handleAuthChange);
        return () => window.removeEventListener("user-auth-changed", handleAuthChange);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {!pathname.startsWith("/admin") && <Navbar key={navKey} setShowModal={setShowModal} />}

            <main className="flex-1">{children}</main>
            {!isFooterHidden && <Footer className="mt-auto" />}

            {/* Modal Handling */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
                    <div
                        className={`bg-white rounded-xl w-full relative ${showModal === 'category'
                            ? 'max-w-4xl max-h-[90vh] overflow-y-auto p-4'
                            : 'max-w-xl'
                            }`}
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
            )}
        </div>
    );
}
