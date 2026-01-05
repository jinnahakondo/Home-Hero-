import React, { useState } from 'react';
import { Search, Phone, Mail, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

const Help = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            id: 1,
            question: "How do I book a service?",
            answer: "To book a service, browse our services page, select the service you need, choose your preferred date and time, and complete the booking process. You'll receive a confirmation email with all the details."
        },
        {
            id: 2,
            question: "Can I cancel or reschedule my booking?",
            answer: "Yes, you can cancel or reschedule your booking up to 24 hours before the scheduled time. Go to 'My Bookings' in your dashboard to make changes."
        },
        {
            id: 3,
            question: "How do I become a service provider?",
            answer: "To become a service provider, register for an account and apply for provider status. Once approved, you can add your services, set your rates, and start accepting bookings."
        },
        {
            id: 4,
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, debit cards, and digital payment methods. Payment is processed securely through our platform."
        },
        {
            id: 5,
            question: "How do I rate and review a service?",
            answer: "After your service is completed, you'll receive an email invitation to rate and review. You can also do this from your 'My Bookings' section in your dashboard."
        },
        {
            id: 6,
            question: "What if I'm not satisfied with a service?",
            answer: "If you're not satisfied with a service, please contact our support team within 48 hours. We'll work with you and the provider to resolve any issues."
        }
    ];

    const contactMethods = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone Support",
            description: "Call us for immediate assistance",
            contact: "+880 1403-703441",
            availability: "Mon-Fri, 9AM-6PM"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email Support",
            description: "Send us an email for detailed inquiries",
            contact: "mdjinnahakondo@gmail.com",
            availability: "Response within 24 hours"
        },
        {
            icon: <MessageCircle className="w-6 h-6" />,
            title: "Live Chat",
            description: "Chat with our support team",
            contact: "Available on website",
            availability: "Mon-Fri, 9AM-6PM EST"
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-base-100 pt-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                        How can we help you?
                    </h1>
                    <p className="text-lg text-base-content/70 mb-8">
                        Find answers to common questions or get in touch with our support team
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for help topics..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* FAQ Section */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-base-content mb-8">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-4">
                            {filteredFaqs.map((faq) => (
                                <div key={faq.id} className="bg-base-100 border border-base-300 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-base-200 transition-colors"
                                    >
                                        <span className="font-semibold text-base-content">{faq.question}</span>
                                        {openFaq === faq.id ? (
                                            <ChevronUp className="w-5 h-5 text-primary" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-primary" />
                                        )}
                                    </button>

                                    {openFaq === faq.id && (
                                        <div className="px-6 pb-4">
                                            <p className="text-base-content/70 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {filteredFaqs.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-base-content/50 text-lg">
                                    No FAQs found matching your search.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-base-content mb-6">
                            Contact Support
                        </h2>

                        <div className="space-y-6">
                            {contactMethods.map((method, index) => (
                                <div key={index} className="bg-base-100 border border-base-300 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                            {method.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-base-content mb-1">
                                                {method.title}
                                            </h3>
                                            <p className="text-base-content/70 text-sm mb-2">
                                                {method.description}
                                            </p>
                                            <p className="font-medium text-primary mb-1">
                                                {method.contact}
                                            </p>
                                            <p className="text-xs text-base-content/50">
                                                {method.availability}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;