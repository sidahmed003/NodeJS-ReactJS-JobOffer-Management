import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import Entreprise from "../components/Entreprise/Entreprise";  
import AddEntreprise from "../components/Entreprise/AddEntreprise";
import Dashboard from "../pages/Dashboard";
import ModifyEntreprise from "../components/Entreprise/ModifyEntreprise";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />, 
        children: [
            { path: "/", element: <Home /> },
            { path: "/entreprise", element: <Entreprise /> },  
            { path: "/ajouter-entreprise", element: <AddEntreprise /> },
            { path: "/modifier-entreprise/:id", element: <ModifyEntreprise /> },
        ]
    }
]);

export default router;
