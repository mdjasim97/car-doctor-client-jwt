import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main"
import ErrorPage from "../Pages/NotFound/ErrorPage";
import HomePage from "../Pages/Home/HomePage";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import BookService from "../Pages/BookService/BookService";
import BookingsData from "../Pages/Bookings/BookingsData";
import PrivateRoute from "./PrivateRoute"
import About from "../Pages/Home/About/About";
import Services from "../Pages/Home/Services/Services";

const route = createBrowserRouter([
    {
        path : "/",
        element : <Main></Main>,
        errorElement : <ErrorPage></ErrorPage>,


        children : [
            {
                path : "/",
                element : <HomePage/>,
            },

            {
                path : "/login",
                element : <Login/>
            },

            {
                path : "/signup",
                element : <SignUp/>
            },

            {
                path : "/about",
                element : <About/>
            },

            {
                path : "/services",
                element : <Services/>
            },

            {
                path : "/book/:id",
                element : <PrivateRoute><BookService/></PrivateRoute>,
                loader : ({params})=> fetch(`http://localhost:4000/services/${params.id}`)
            },

            {
                path : "/bookings",
                element : <PrivateRoute><BookingsData/></PrivateRoute>
            }
        ]
    }
])


export default route