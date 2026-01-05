import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubscribed(true);
            setIsLoading(false);
            toast.success('Successfully subscribed to newsletter!');
            setEmail('');
        }, 1000);
    };

    if (isSubscribed) {
        return (
            <section className="py-16 text-center gradient-primary-to-secondary">
                <div className="max-w-2xl mx-auto">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                        <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Thank You for Subscribing!
                    </h2>
                    <p className="text-white/90 text-lg">
                        You'll receive our latest updates and exclusive offers in your inbox.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 text-center gradient-primary-to-secondary">
            <div className="max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                    <Mail className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Stay Updated with HomeHero
                </h2>

                <p className="text-white/90 text-lg mb-8">
                    Get the latest service updates, exclusive offers, and home maintenance tips delivered to your inbox.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <div className="flex-1">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/30 bg-white/20 text-white placeholder-white/70 backdrop-blur-sm"
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn bg-white text-primary hover:bg-white/90 border-0 px-8 font-semibold transition-all duration-200"
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            'Subscribe'
                        )}
                    </button>
                </form>

                <p className="text-white/70 text-sm mt-4">
                    No spam, unsubscribe at any time. We respect your privacy.
                </p>

                <div className="flex flex-wrap justify-center gap-6 mt-8 text-white/80">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Weekly Tips</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Exclusive Offers</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Service Updates</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;