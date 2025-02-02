import UserProvider from "./Providers/UserProvider/UserProvider";
import RouterProvider from "@/app/Providers/Router/Router";

function App() {
    return (
        <UserProvider>
            <RouterProvider />
        </UserProvider>
    );
}

export default App;
