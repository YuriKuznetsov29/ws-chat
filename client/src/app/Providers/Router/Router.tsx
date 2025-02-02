import Chat from "@/components/Chat/Chat";
import Form from "@/components/Form/Form";
import { BrowserRouter, Route, Routes } from "react-router";

export default function RouterProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}
