import Chat from "@/components/Chat/Chat";
import UserProvider from "./Providers/UserProvider/UserProvider";
import RouterProvider from "@/app/Providers/Router/Router";

function App() {
    return (
        <UserProvider>
            <Chat />
        </UserProvider>
    );
}

export default App;
