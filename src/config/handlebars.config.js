import handlebars from "express-handlebars";
import paths from "../utils/path.js";

const config = (serverHTTP) => {
    //Configuración de handlebars
    serverHTTP.engine("handlebars", handlebars.engine());
    serverHTTP.set("views", paths.views);
    serverHTTP.set("view engine", "handlebars");
};

export default { config };