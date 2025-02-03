import { UserContext } from "@/app/Providers/UserProvider/UserProvider";
import { useContext, useEffect, useRef, useState } from "react";

interface Message {
    type: "join" | "message";
    user: string;
    room: string;
    payload?: {
        text: string;
    };
}
export function useChat() {
    const { name, room } = useContext(UserContext);

    const socket = useRef<WebSocket>();

    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<string[]>([]);

    const connect = () => {
        if (name && room && socket.current) {
            socket.current?.send(JSON.stringify({ type: "join", room, user: name }));

            socket.current.onmessage = async (message) => {
                const data = await JSON.parse(message.data);
                console.log(data);
                setMessages([...data.messages]);
                // setUsers([...data.users]);
            };

            socket.current.onclose = () => {
                // setConnected(false);
            };
        }
    };

    useEffect(() => {
        socket.current = new WebSocket("ws://localhost:5000");

        // if (socket.current?.readyState === 1) {
        //     socket.current?.send(JSON.stringify({ type: "join", room, user: name }));
        //     setConnected(true);
        // }

        socket.current.onopen = () => {
            setConnected(true);
            console.log("Connected");
        };
    }, []);

    console.log(socket);

    const sendMessage = (text: string) => {
        if (connected && socket.current) {
            console.log("send");
            socket.current.send(
                JSON.stringify({
                    type: "message",
                    user: name,
                    room,
                    payload: { text },
                })
            );
        }
    };

    return { connect, connected, messages, users, sendMessage };
}
