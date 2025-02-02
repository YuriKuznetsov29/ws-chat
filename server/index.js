const ws = require("ws");

const wss = new ws.Server({ port: 5080, host: "localhost" }, () => {
    console.log("Server is started");
});

const db = {};

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        message = JSON.parse(message);
        console.log(message);

        if (message.room in db) {
            const room = db[message.room];

            if (room.users.includes(message.user)) {
                db[message.room].messages.push(message.text);
            } else {
                db[message.room] = {
                    users: [...room.users, message.user],
                    messages: [...room.messages, message.text],
                };
            }

            ws.send(JSON.stringify(db[message.room]));
        } else {
            db[message.room] = {
                users: [message.user],
                messages: [message.text],
            };
            ws.send(JSON.stringify(db[message.room]));
        }
    });
});
