import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import AdminAvailability from "./components/AdminAvailability";
import BookingCalendar from "./components/BookingCalendar";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import MainLayout from "./MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminHub from "./components/AdminHub";

export const router = createBrowserRouter([
    {
        // Rotta genitore che definisce il Layout
        element: <MainLayout />, 
        children: [
            { path: "/", element: <App /> },
            {
                element: <ProtectedAdminRoute />, // Protegge tutte le rotte figlie
                children: [
                    { path: "/admin", element: <AdminHub /> },
                    { path: "/admin/availability", element: <AdminAvailability /> },
                    { path: "/admin/dashboard", element: <AdminDashboard /> },
                ]
            },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "/user/booking", element: <BookingCalendar /> },
                    { path: "/user/dashboard", element: <UserDashboard /> },
                ]
            }
        ]
    },
    // Rotte che NON vogliono la Navbar (es. Login e Register)
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
]);