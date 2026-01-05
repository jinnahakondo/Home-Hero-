import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Login from "../Pages/Login/Login";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import PrivateRoutes from "./PrivateRoutes";
import Services from "../Pages/Services/Services";
import Profile from "../Pages/MyProfile/Profile";
import AddServices from "../Pages/Add services/AddServices";
import MyServices from "../Pages/MyServicess/MyServices";
import UpdateService from "../Components/UpdateService/UpdateService";
import ServiceDetails from "../Components/ServiceDetails/ServiceDetails";
import MyBookings from "../Pages/MyBookings/MyBookings";
import Errorpage from "../Pages/Error page/Errorpage";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Help from "../Pages/Help/Help";
import DashBoardLayout from "../Layouts/DashBoardLayout/DashBoardLayout";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import DashboardOverview from "../Pages/Dashboard/DashboardOverview";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/services',
                element: <Services />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/help',
                element: <Help />
            },
            {
                path: '/service-details/:id',
                element: <ServiceDetails />
            },
            {
                path: `/update-service/:id`,
                loader: ({ params }) => {
                    return fetch(`https://b-12-a10-home-hero-server.vercel.app/services/${params.id}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Response("Service not found", { status: 404 });
                            }
                            return response.json();
                        })
                        .catch(error => {
                            console.error('Error loading service:', error);
                            throw new Response("Failed to load service", { status: 500 });
                        });
                },
                element: <PrivateRoutes>
                    <UpdateService />
                </PrivateRoutes>
            },
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: '/auth/register',
                element: <Register />
            }
        ]
    },
    {
        path: '*',
        element: <Errorpage />
    },
    {
        path: '/dashboard/admin',
        element: <AdminRoutes>
            <DashBoardLayout />
        </AdminRoutes>,
        children: [
            {
                index: true,
                element: <DashboardOverview />
            },
            {
                path: 'add-services',
                element: <AddServices />
            },
            {
                path: 'my-services',
                element: <MyServices />
            },
            {
                path: 'my-profile',
                element: <Profile />
            },
        ]
    },
    {
        path: '/dashboard/user',
        element: <UserRoutes>
            <DashBoardLayout />
        </UserRoutes>,
        children: [
            {
                index: true,
                element: <DashboardOverview />
            },
            {
                path: 'my-bookings',
                element: <MyBookings />
            },
            {
                path: 'my-profile',
                element: <Profile />
            },
        ]
    }
])