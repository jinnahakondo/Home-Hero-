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
import UserDashBoard from "../Layouts/userDashBoard/UserDashBoard";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/services',
                Component: Services
            },
            {
                path: '/service-details/:id',
                element: <PrivateRoutes>
                    <ServiceDetails />
                </PrivateRoutes>
            },
            {
                path: '/my-services',
                element: <PrivateRoutes>
                    <MyServices />
                </PrivateRoutes>
            },
            {
                path: `/update-service/:id`,
                loader: ({ params }) => fetch(`https://home-hero-server-api.vercel.app/services/${params.id}`),
                element: <PrivateRoutes>
                    <UpdateService />
                </PrivateRoutes>
            },
            {
                path: '/add-services',
                element: <PrivateRoutes>
                    <AddServices />
                </PrivateRoutes>
            },
            {
                path: '/my-profile',
                element: <PrivateRoutes>
                    <Profile />
                </PrivateRoutes>
            },
            {
                path: '/my-bookings',
                element: <PrivateRoutes>
                    <MyBookings />
                </PrivateRoutes>
            },
        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children: [
            {
                index: true,
                Component: Login
            },
            {
                path: '/auth/register',
                Component: Register
            }
        ]
    },
    {
        path: '*',
        Component: Errorpage
    },
    {
        path: '/dashboard',
        Component: UserDashBoard
    }
])