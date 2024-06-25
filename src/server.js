import express from "express";
import paths from "./utils/path.js";
import products from "./products.js";
import homeRouter from "./routes/home.router.js";
import serverSocketIO from "./config/socket.config.js";
import configHandlebars from "./config/handlebars.config.js";
import realTimeProducts from "./routes/realTimeProducts.router.js";
import cartsRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chat.router.js";
import productRouter from "./routes/products.router.js";

const PORT = 8080;
const HOST = "localhost";
const server = express();

server.use("/carts", cartsRouter);
server.use("/realtimeproducts", realTimeProducts);
server.use("/chat", chatRouter);
server.use("/products", productRouter);
server.use("/home", homeRouter);

//Configuración de handlebars
configHandlebars.config(server);

server.use("/api/public", express.static(paths.public));

// server.use("*", (req, res)=> {
//     res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
// });

// server.use("*", (req, res)=> {
//     console.log("Error:", error.message);
//     res.status(500).send("<h1>Error 404</h1><h3>Se ha generado un error en el servidor</h3>");
// });

//Endpoint de productos
server.get("/api/products", (req, res) => {
    const randomID = Math.floor(Math.random() * products.length);
    const product = products[randomID];

    res.render("products", { title: "productos", product });
});

const serverHTTP = server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});

//Configuración del servidor de websocket
serverSocketIO.config(serverHTTP);