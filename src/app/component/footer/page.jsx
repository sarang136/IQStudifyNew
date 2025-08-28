import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-[#0575E6] to-[#021B79] text-white py-5 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Top section */}
                <div className="text-center md:text-left mb-10">
                    <h2 className="text-2xl font-semibold">Let’s Connect With Us</h2>
                    <p className="text-sm text-white/80 mt-1">Connect. Collaborate. Learn.</p>
                </div>

                <div className="grid md:grid-cols-4 gap-10 text-sm border-t border-white/20 pt-10">
                    {/* Logo & About */}
                    <div>
                        <img src="/logo.png" alt="Logo" className="w-24 mb-3" />
                        <p className="text-white/80 leading-relaxed text-sm">
                            Helping you clear exams through smart, AI-driven learning content and
                            detailed performance insights.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-white/90">
                            <li><a href="/">Home</a></li>
                            <li><a href="/">Category</a></li>
                            <li><a href="#about">About Us</a></li>
                        </ul>
                    </div>

                    {/* Utilities */}
                    <div>
                        <h4 className="font-semibold mb-3">Utilities</h4>
                        <ul className="space-y-2 text-white/90">
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Support</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-3">Contact Us</h4>
                        <ul className="space-y-2 text-white/90">
                            <li>Email: vijayadhav011@gmail.com</li>
                            <li>Phone: +91-9767806690</li>
                            <li>Address: IQstudy Pvt. Ltd., 123 India Gate, New Delhi</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 flex flex-col md:flex-row items-center justify-between text-sm border-t border-white/20 pt-5 gap-2">
                    <p className="text-white/70">&copy;2025 All Rights Reserved</p>
                    <div className="flex items-center gap-2">
                        <span>Developed By</span>
                        <img
                            src="/tech_surya_logo.png"
                            alt="Tech Sutra"
                            className="h-5 object-contain"
                        />
                    </div>
                </div>
            </div>
        </footer>

    );
}