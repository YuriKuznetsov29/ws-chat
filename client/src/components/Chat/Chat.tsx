import { useChat } from "@/hooks/useChat";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useState } from "react";
import Form from "@/components/Form/Form";

export default function Chat() {
    const [message, setMessage] = useState("");

    const { join, joined, connected, messages, users, sendMessage } = useChat();

    return (
        <>
            {connected ? <h1>Connected</h1> : <h1>Not connected</h1>}
            {joined ? (
                <Container maxWidth="sm">
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
                                <Stack key={index}>
                                    <Stack spacing={2} direction={"row"}>
                                        <div>{message?.author}</div>
                                        <div>{message?.date}</div>
                                    </Stack>
                                    <div>{message?.text}</div>
                                </Stack>
                            ))}
                        </Box>
                        <Stack spacing={2} direction={"row"}>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-basic"
                                label="Type something"
                                variant="outlined"
                                value={message}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setMessage(event.target.value);
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={() => {
                                    sendMessage(message);
                                    setMessage("");
                                }}
                            >
                                Send
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            ) : (
                <Form join={join} />
            )}
        </>
    );
}
