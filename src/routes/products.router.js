import { Router } from "express";
import products from "../products.js";

const router = Router();

const generateId = () => {
    const number = Math.floor(Math.random()* 100000);
    const albs = [..."abcdefghijklmnopqrstuvwxyz"];
    let stringPart = "";

    for( let i=0; i<10; i++){
        const index = randomIndex(25);
        stringPart += albs[index];
    }
    const id = stringPart+number;
    return id;
};
const randomIndex = (maxNumber) => {
    return Math.floor(Math.random()*maxNumber);
};

router.get("/", (req, res) => {
    res.status(200).send({ state: "success", data: products });
});

router.get("/api/products/:pid", ( req, res) => {
    const { id } = req.params;
    const products = products.find((item) => item.id === Number(id));

    if(!products){
        return res.status(400).send({ "Error": "no se encontró ningún producto" });
    }
    res.status(200).send({ data: products });
},
);

router.post("/", (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const newProduct = { id: generateId(), title, description, code, price, status, stock, category, thumbnails };

    if(!title || !description|| !code || !price || !category){
        return res.status(400).send({ "Error": "Faltan datos" });
    }
    products.push(newProduct);

    res.status(201).redirect("http://localhost:8080/public/") ;
});

router.delete("/api/products/:id", ( req, res) => {
    const { id } = req.params;
    const indice = products.findIndex((item) => item.id === Number(id));

    if(indice < 0){
        return res.status(400).send({ "Error": "no se encontró ningún producto" });
    }
    products.splice(indice, 1);
    res.status(200).send({ data: "Producto eliminado" });
});

export default router;