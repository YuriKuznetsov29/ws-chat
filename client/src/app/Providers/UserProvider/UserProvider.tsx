import { ReactNode, createContext, useState } from "react";

interface UserContextProps {
    name?: string;
    setName?: (name: string) => void;
    room?: string;
    setRoom?: (room: string) => void;
}

export const UserContext = createContext<UserContextProps>({});

export default function UserProvider({ children }: { children: ReactNode }) {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    const defaultProps = {
        name,
        setName,
        room,
        setRoom,
    };

    return <UserContext.Provider value={defaultProps}>{children}</UserContext.Provider>;
}
