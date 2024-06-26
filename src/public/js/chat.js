const socket = io();
const chatText = document.getElementById("message");
let user = null;

Swal.fire({
    title: "Identifícate",
    input: "text",
    confirmButtonText: "Ingresar",
    inputValidator: (value) => {
        return !value && "Ingresa tu nombre de usuario";
    },
}).then((result) => {
    user = { name: result.value };
    socket.emit("authenticated", user );
});

chatText.onkeyup = (event) => {
    if (event.key === "Enter"){
        socket.emit("message", { user: user, message: chatText.value });
        chatText.value = "";
    }
};

socket.on("message-logs", (data) => {
    if (!user) return;

    const messageLogs = document.getElementById("message-logs");
    messageLogs.innerText = "";

    data.messages.forEach((message) => {
        const li = document.createElement("li");
        li.innerHTML = `${message.user.name} dice: <b>${message.message}</b>`;
        messageLogs.append(li);
    });
});

socket.on("new-user", (data) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        timer: 3000,
        timeProgressBar: true,
        title: `${data.name} se ha unido al chat`,
        icon: "success",
    });
});