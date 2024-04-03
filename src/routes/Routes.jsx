import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Orders from "../components/Orders";
import PrivateRoute from "../components/PrivateRoute";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                index: true,
                element:<Login></Login>
            },
            {
                path: '/home',
                element:<PrivateRoute><Home></Home></PrivateRoute>
            },
            {
                path: '/login',
                element:<Login></Login>
            },
            {
                path: '/register',
                element:<Register></Register>
            },
            {
                path: '/orders',
                element:<PrivateRoute><Orders></Orders></PrivateRoute>
            },
        ]
    }
])

export default routes;