import { RouterProvider } from "react-router-dom";
import router from "./routes/routes"; // On importe les routes

function App() {
    return <RouterProvider router={router} />;
}

export default App;
