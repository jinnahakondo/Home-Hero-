import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router';

const FAQSection = () => {
    const [openFaq, setOpenFaq] = useState(0);

    const faqs = [
        {
            question: "How do I book a service?",
            answer: "Booking a service is simple! Browse our services, select what you need, choose your preferred date and time, and complete the booking. You'll receive instant confirmation."
        },
        {
            question: "Are all service providers verified?",
            answer: "Yes, all our service providers go through a comprehensive background check and verification process. We ensure they have the necessary licenses, insurance, and experience."
        },
        {
            question: "What if I need to cancel or reschedule?",
            answer: "You can cancel or reschedule your booking up to 24 hours before the scheduled time through your dashboard. For last-minute changes, please contact our support team."
        },
        {
            question: "How do payments work?",
            answer: "We accept all major credit cards and digital payment methods. Payment is processed securely after the service is completed to your satisfaction."
        },
        {
            question: "What if I'm not satisfied with the service?",
            answer: "Your satisfaction is our priority. If you're not happy with a service, contact us within 48 hours and we'll work to resolve the issue, including potential refunds or re-service."
        },
        {
            question: "Do you offer emergency services?",
            answer: "Yes, we have emergency services available 24/7 for urgent issues like plumbing leaks, electrical problems, and lockouts. Additional fees may apply for emergency calls."
        }
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? -1 : index);
    };

    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                    Find answers to common questions about our services and platform
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-base-100 border border-base-300 rounded-xl overflow-hidden">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-base-200 transition-colors"
                            >
                                <span className="font-semibold text-base-content pr-4">
                                    {faq.question}
                                </span>
                                {openFaq === index ? (
                                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                                )}
                            </button>

                            {openFaq === index && (
                                <div className="px-6 pb-4 border-t border-base-200">
                                    <p className="text-base-content/70 leading-relaxed pt-4">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <div className="bg-base-200 rounded-xl p-8">
                        <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-base-content mb-2">
                            Still have questions?
                        </h3>
                        <p className="text-base-content/70 mb-6">
                            Our support team is here to help you with any questions or concerns.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/help" className="btn btn-primary">
                                Visit Help Center
                            </Link>
                            <Link to="/contact" className="btn btn-outline">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;