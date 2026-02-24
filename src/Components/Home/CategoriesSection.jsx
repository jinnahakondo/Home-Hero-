import React from 'react';
import { Link } from 'react-router';
import useCategoryNavigation from '../../Hooks/useCategoryNavigation';
import { trackCategoryClick } from '../../utils/analytics';
import {
    Wrench,
    Zap,
    Droplets,
    Paintbrush,
    Scissors,
    Car,
    Laptop,
    Home,
    ArrowRight
} from 'lucide-react';

const CategoriesSection = () => {
    const { navigateToCategory } = useCategoryNavigation();

    const handleCategoryClick = (category) => {
        trackCategoryClick(category.category, 'home_page');
        navigateToCategory(category.category);
    };

    const categories = [
        {
            icon: <Wrench className="w-8 h-8" />,
            title: "Home Repair",
            description: "Fix and maintain your home",
            serviceCount: "150+ services",
            color: "bg-blue-500",
            category: "Carpentry" // Maps to backend category
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Electrical",
            description: "Professional electrical work",
            serviceCount: "80+ services",
            color: "bg-yellow-500",
            category: "Electrical"
        },
        {
            icon: <Droplets className="w-8 h-8" />,
            title: "Plumbing",
            description: "Water and pipe solutions",
            serviceCount: "120+ services",
            color: "bg-blue-600",
            category: "Plumbing"
        },
        {
            icon: <Paintbrush className="w-8 h-8" />,
            title: "Painting",
            description: "Interior and exterior painting",
            serviceCount: "90+ services",
            color: "bg-purple-500",
            category: "Painting"
        },
        {
            icon: <Scissors className="w-8 h-8" />,
            title: "Landscaping",
            description: "Garden and lawn care",
            serviceCount: "70+ services",
            color: "bg-green-500",
            category: "Gardening"
        },
        {
            icon: <Car className="w-8 h-8" />,
            title: "Automotive",
            description: "Car maintenance and repair",
            serviceCount: "60+ services",
            color: "bg-red-500",
            category: "HVAC" // Using HVAC as closest match
        },
        {
            icon: <Laptop className="w-8 h-8" />,
            title: "Tech Support",
            description: "Computer and device help",
            serviceCount: "45+ services",
            color: "bg-indigo-500",
            category: "Electrical" // Tech support can be categorized under electrical
        },
        {
            icon: <Home className="w-8 h-8" />,
            title: "Cleaning",
            description: "Home and office cleaning",
            serviceCount: "100+ services",
            color: "bg-pink-500",
            category: "Cleaning"
        }
    ];

    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
                    Popular Service Categories
                </h2>
                <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                    Explore our wide range of professional services to meet all your home and lifestyle needs
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                        className="group bg-base-100 border border-base-300 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30 text-left w-full"
                    >
                        <div className={`inline-flex items-center justify-center w-12 h-12 ${category.color} text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            {category.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-base-content mb-2 group-hover:text-primary transition-colors">
                            {category.title}
                        </h3>
                        <p className="text-base-content/70 text-sm mb-3">
                            {category.description}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-base-content/50">
                                {category.serviceCount}
                            </span>
                            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </button>
                ))}
            </div>

            <div className="text-center">
                <Link
                    to="/services"
                    className="btn btn-primary btn-lg"
                >
                    View All Services
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
            </div>
        </section>
    );
};

export default CategoriesSection;