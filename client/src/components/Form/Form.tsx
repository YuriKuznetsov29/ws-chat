import { Button, TextField } from "@mui/material";
import cls from "./Form.module.scss";
import { useContext } from "react";
import { UserContext } from "@/app/Providers/UserProvider/UserProvider";
import { useChat } from "@/hooks/useChat";
import { useNavigate } from "react-router";
export default function Form() {
    const { name, room, setName, setRoom } = useContext(UserContext);

    const navigate = useNavigate();

    const { connect, connected } = useChat();

    if (connected) {
        navigate("/chat");
    }

    return (
        <form className={cls.form}>
            <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Ваше имя"
                variant="outlined"
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setName?.(event.target.value);
                }}
            />
            <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Название комнаты"
                variant="outlined"
                value={room}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setRoom?.(event.target.value);
                }}
            />
            <Button variant="contained" onClick={connect}>
                Войти
            </Button>
        </form>
    );
}
