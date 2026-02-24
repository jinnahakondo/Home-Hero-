// Simple analytics utility for tracking user interactions
export const trackEvent = (eventName, properties = {}) => {
    // In a real application, you would send this to your analytics service
    // For now, we'll just log it to the console in development
    if (process.env.NODE_ENV === 'development') {
        console.log('Analytics Event:', eventName, properties);
    }

    // Example: Send to Google Analytics, Mixpanel, etc.
    // gtag('event', eventName, properties);
    // mixpanel.track(eventName, properties);
};

export const trackCategoryClick = (category, source = 'unknown') => {
    trackEvent('category_clicked', {
        category,
        source, // 'home_page', 'services_page', etc.
        timestamp: new Date().toISOString()
    });
};

export const trackServiceView = (serviceId, serviceName, category) => {
    trackEvent('service_viewed', {
        service_id: serviceId,
        service_name: serviceName,
        category,
        timestamp: new Date().toISOString()
    });
};

export const trackSearch = (searchTerm, resultsCount) => {
    trackEvent('search_performed', {
        search_term: searchTerm,
        results_count: resultsCount,
        timestamp: new Date().toISOString()
    });
};