export default function FooterSection() {
    return (
        <footer className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
                {/* Brand */}
                <div>
                    <h3 className="font-bold text-lg mb-2">IQstudy</h3>
                    <p className="text-sm">
                        Our mission is to simplify exam prep through smart MCQs and personalized learning.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-semibold mb-2">Quick Links</h4>
                    <ul className="text-sm space-y-1">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Category</a></li>
                        <li><a href="#">All MCQs</a></li>
                    </ul>
                </div>

                {/* Utilities */}
                <div>
                    <h4 className="font-semibold mb-2">Utilities</h4>
                    <ul className="text-sm space-y-1">
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Refund Policy</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-semibold mb-2">Contact Us</h4>
                    <ul className="text-sm space-y-1">
                        <li>Email: vijayadhav011@gmail.com</li>
                        <li>Phone: +91-9767806690</li>
                        <li>Mon - Fri (10AM to 6PM)</li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-sm mt-6 border-t border-white/20 pt-4">
                &copy; 2025 All Rights Reserved | Developed by <span className="font-semibold">Tech Sutra</span>
            </div>
        </footer>
    );
}
