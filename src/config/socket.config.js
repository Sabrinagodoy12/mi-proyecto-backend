import { Server } from "socket.io";
const messages = [];

const config = (serverHTTP) => {
    const serverIO = new Server(serverHTTP) ;

    serverIO.on("connection", (socket) => {
        const id = socket.client.id;
        console.log("Cliente conectado", id);

        socket.on("message", (data) => {
            const { user, message } = data;
            messages.push({ user, message });

            serverIO.emit("message-logs", { messages });
        });

        socket.on("authenticated", (data) => {
            socket.broadcast.emit("new-user", data);
        });

        socket.on("disconnect", () => {
            console.log("Se ha desconectado un cliente");
        });
    });
};

export default { config };