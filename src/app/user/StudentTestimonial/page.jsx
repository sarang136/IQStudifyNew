import Image from "next/image";
import { Raleway } from 'next/font/google';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // You can include other weights if needed
    variable: '--font-raleway',
});

export default function TestimonialSection() {
    return (
        <section className={`py-10 ${raleway.className} bg-white `} >
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto grid md:grid-cols-2 gap-8  px-4">
                <div>
                    <p className="text-3xl font-medium text-gray-700 leading-tight">
                        <span className="text-5xl text-blue-500">“</span>
                        Students now recognize that regular MCQ practice means better performance and visible progress

                    </p>

                    <p className="text-lg mt-5 text-gray-500 leading-relaxed">
                        With IQStudify, our learners are now able to focus on specific weak areas through data-driven practice sessions. The platform helps identify their knowledge gaps and goals — and based on this, teachers and mentors can step in and provide support exactly where it's needed
                    </p>

                    <p className="mt-4 font-semibold text-gray-900">Riya Sharma</p>
                    <p className="text-sm text-gray-500">Engineering Student</p>
                    <p className="text-5xl text-end text-blue-500">”</p>
                </div>
                <div className="relative h-96 w-full rounded-lg overflow-hidden">
                    <Image
                        src="/Rectangle.png" // Rename your file accordingly
                        alt="Student studying"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
