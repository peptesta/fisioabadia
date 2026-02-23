import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";

export const router = createBrowserRouter([
    {path: "/", element: <App />},
    {path: "/signin", element: <SignIn />},
    {path: "/signup", element: <SignUp />},

])