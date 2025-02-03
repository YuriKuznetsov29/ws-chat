import { useChat } from "@/hooks/useChat";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
    const [message, setMessage] = useState("");

    const { connected, messages, users, sendMessage } = useChat();

    return (
        <Container maxWidth="sm">
            {connected ? <h1>Connected</h1> : <h1>Not connected</h1>}
            {users.map((user, index) => (
                <div key={index}>{user}</div>
            ))}
            <Stack spacing={2}>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        minHeight: 400,
                        borderRadius: 1,
                        border: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                    }}
                >
                    {messages.map((message, index) => (
                        <div key={index}>{message?.payload?.text}</div>
                    ))}
                </Box>

                <Stack spacing={2} direction={"row"}>
                    <TextField
                        sx={{ width: "100%" }}
                        id="outlined-basic"
                        label="Type something"
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setMessage(event.target.value);
                        }}
                    />
                    <Button variant="contained" onClick={() => sendMessage(message)}>
                        Send
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}
