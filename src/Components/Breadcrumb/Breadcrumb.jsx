import React from 'react';
import { Link } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items = [] }) => {
    return (
        <nav className="flex items-center space-x-2 text-sm text-base-content/60 mb-6">
            <Link
                to="/"
                className="flex items-center hover:text-primary transition-colors"
            >
                <Home className="w-4 h-4 mr-1" />
                Home
            </Link>

            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className="w-4 h-4" />
                    {item.href ? (
                        <Link
                            to={item.href}
                            className="hover:text-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-base-content font-medium">
                            {item.label}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;