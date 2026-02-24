import { useNavigate } from 'react-router';

const useCategoryNavigation = () => {
    const navigate = useNavigate();

    const navigateToCategory = (category) => {
        if (category && category !== "All Categories") {
            navigate(`/services?category=${encodeURIComponent(category)}`);
        } else {
            navigate('/services');
        }
    };

    const navigateToServices = (filters = {}) => {
        const searchParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== "" && value !== "All Categories") {
                searchParams.set(key, value);
            }
        });

        const queryString = searchParams.toString();
        navigate(`/services${queryString ? `?${queryString}` : ''}`);
    };

    return {
        navigateToCategory,
        navigateToServices
    };
};

export default useCategoryNavigation;