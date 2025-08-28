
import Image from "next/image";
import { Raleway } from 'next/font/google';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // You can include other weights if needed
    variable: '--font-raleway',
});

export default function ContactFormSection() {
    return (
        <section className={`py-10 ${raleway.className} bg-white `} >
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center px-4">
                {/* Form Section */}
                <form className="space-y-4 p-6 ">
                    <h2 className="text-2xl font-semibold text-gray-800">Get in touch</h2>
                    <p className="text-sm text-gray-500 mb-4">
                        Our friendly team would love to hear from you.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">First Name</label>
                            <input type="text" className="border p-2 rounded w-full" placeholder="First name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Last Name</label>
                            <input type="text" className="border p-2 rounded w-full" placeholder="Last name" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" className="border p-2 rounded w-full" placeholder="you@company.com" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input type="tel" className="border p-2 rounded w-full" placeholder="+91 (951) 000-0000" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Message</label>
                        <textarea className="border p-2 rounded w-full h-24" placeholder="Message" />
                    </div>

                    <div className="flex items-start gap-2 text-sm">
                        <input type="checkbox" className="mt-1" />
                        <span>
                            You agree to our friendly <a href="#" className="underline">privacy policy</a>
                        </span>
                    </div>

                    <button type="submit" className="bg-[#072B78] text-white px-4 py-2 rounded w-full">
                        Send message
                    </button>
                </form>

                {/* Image Section */}
                <div className="h-full">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <Image
                            src="/Image.png" // update this path as per your image
                            alt="Students group"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

