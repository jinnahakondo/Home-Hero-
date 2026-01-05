// Test data to verify the Service component handles edge cases properly

export const testServices = [
    // Normal service
    {
        _id: "test1",
        serviceName: "Test Service 1",
        price: 100,
        category: "Testing",
        image: "https://via.placeholder.com/400x300",
        description: "A test service with all properties",
        rating: 4.5
    },
    // Service with missing rating
    {
        _id: "test2",
        serviceName: "Test Service 2",
        price: 200,
        category: "Testing",
        image: "https://via.placeholder.com/400x300",
        description: "A test service with no rating"
        // rating is undefined
    },
    // Service with zero rating
    {
        _id: "test3",
        serviceName: "Test Service 3",
        price: 150,
        category: "Testing",
        image: "https://via.placeholder.com/400x300",
        description: "A test service with zero rating",
        rating: 0
    },
    // Service with alternative property names
    {
        _id: "test4",
        title: "Test Service 4", // using title instead of serviceName
        Price: 75, // using Price instead of price
        Category: "Testing", // using Category instead of category
        serviceImage: "https://via.placeholder.com/400x300", // using serviceImage instead of image
        serviceDescription: "A test service with alternative property names",
        ratings: 3.8 // using ratings instead of rating
    },
    // Service with minimal properties
    {
        _id: "test5"
        // Only has _id, everything else will use defaults
    }
];

export default testServices;