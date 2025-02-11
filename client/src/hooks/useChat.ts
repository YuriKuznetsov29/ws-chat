import { UserContext } from "@/app/Providers/UserProvider/UserProvider";
import { useContext, useEffect, useRef, useState } from "react";

interface MessagePayload {
    text: string;
    date: string;
    author: string;
}
export function useChat() {
    const { name, room } = useContext(UserContext);

    const socket = useRef<WebSocket>();

    const [connected, setConnected] = useState(false);
    const [joined, setJoined] = useState(false);
    const [messages, setMessages] = useState<MessagePayload[]>([]);
    const [users, setUsers] = useState<string[]>([]);

    const join = () => {
        console.log("join");

        if (name && room && socket.current?.readyState === 1) {
            socket.current?.send(JSON.stringify({ type: "join", room, user: name }));
        }
    };

    const connect = () => {
        socket.current = new WebSocket("ws://localhost:5000");

        socket.current.onopen = () => {
            setConnected(true);
        };

        socket.current.onmessage = async (message) => {
            const data = await JSON.parse(message.data);
            console.log(data);
            if (data.type === "join" && data.joined) {
                setJoined(true);
            }
            if (data.type === "message") {
                setMessages([...data.messages]);
                setUsers([...Object.keys(data.users)]);
            }
        };

        socket.current.onerror = () => {
            setConnected(false);
            reconnect();
        };

        socket.current.onclose = () => {
            setConnected(false);
            reconnect();
        };
    };

    let intervalId: any = null;
    const reconnect = () => {
        if (
            socket.current !== undefined &&
            socket.current?.readyState !== 1 &&
            intervalId === null
        ) {
            let count = 1;
            intervalId = setInterval(() => {
                if (count > 5 || socket.current?.readyState === 1) {
                    clearInterval(intervalId);
                    intervalId = null;
                    count = 1;
                    console.log(
                        `reconnect ${socket.current?.readyState === 1 ? "success" : "failed"}`
                    );
                    return;
                }
                connect();
                console.log("reconnect", `attempt ${count}`);
                count++;
            }, 5000);
        }
    };

    useEffect(() => {
        connect();
    }, []);

    const sendMessage = (text: string) => {
        if (connected && socket.current) {
            console.log("send");
            socket.current.send(
                JSON.stringify({
                    type: "message",
                    user: name,
                    room,
                    payload: { text, date: new Date(), author: name },
                })
            );
        }
    };

    return { join, joined, connected, messages, users, sendMessage };
}
