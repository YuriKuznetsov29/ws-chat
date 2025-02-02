import { UserContext } from "@/app/Providers/UserProvider/UserProvider";
import { useContext, useEffect, useRef, useState } from "react";

export function useChat() {
    const { name, room } = useContext(UserContext);

    const socket = useRef<WebSocket>();

    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        if (name && room) {
            socket.current = new WebSocket("ws://localhost:5080");

            socket.current.onopen = () => {
                setConnected(true);
            };

            socket.current.onmessage = async (message) => {
                const data = await JSON.parse(message.data);
                console.log(data);
                setMessages([...data.messages]);
                setUsers([...data.users]);
            };

            socket.current.onclose = () => {
                setConnected(false);
            };
        }
    }, [name, room]);

    const sendMessage = (text: string) => {
        if (connected && socket.current) {
            socket.current.send(
                JSON.stringify({
                    user: name,
                    room,
                    text,
                })
            );
        }
    };

    return { connected, messages, users, sendMessage };
}
