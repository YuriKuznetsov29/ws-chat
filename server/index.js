const ws = require("ws");

const wss = new ws.Server({ port: 5000, host: "localhost" }, () => {
    console.log("Server is started");
});

const db = { rooms: {} };

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(message);
        message = JSON.parse(message);
        switch (message.type) {
            case "join": {
                const room = message.room;

                if (!db.rooms[room]) {
                    db.rooms[room] = { sockets: new Set(), users: {}, messages: [] };
                }

                db.rooms[room].sockets.add(ws);
                db.rooms[room].users[message.user] = message.user;
                ws.room = message.room;
                ws.user = message.user;

                ws.send(JSON.stringify({ type: "join", joined: true }));

                db.rooms[room].sockets.forEach((ws) => {
                    const { users, messages } = db.rooms[room];
                    ws.send(
                        JSON.stringify({
                            type: "message",
                            users,
                            messages,
                        })
                    );
                });
                break;
            }

            case "message": {
                if (ws.room === undefined || !db.rooms[ws.room]) {
                    break;
                }

                db.rooms[ws.room].messages.push(message.payload);
                db.rooms[ws.room].sockets.forEach((ws) => {
                    const { users, messages } = db.rooms[ws.room];
                    ws.send(
                        JSON.stringify({
                            type: "message",
                            users,
                            messages,
                        })
                    );
                });
                break;
            }
        }
    });

    ws.on("close", () => {
        if (ws.room && db.rooms[ws.room]) {
            const room = ws.room;
            db.rooms[room].sockets.delete(ws);
            delete db.rooms[room].users[ws.user];
            db.rooms[room].sockets.forEach((ws) => {
                ws.send(JSON.stringify(db.rooms[room]));
            });
            console.log(ws.room, "close", db.rooms[room].users[ws.user]);
        }
    });
});
