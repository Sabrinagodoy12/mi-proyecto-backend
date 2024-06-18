import { Router } from "express";

const router = Router();
const carts = [];

router.get("/", (req, res) => {
    res.send({ carts });
});

router.post("/", (req, res) => {
    const { id, products } = req.body;
    const newCart = { id: Number(id), products };

    if(!id || !products){
        return res.status(400).send({ "Error": "No se ha agregado ningún producto" });
    }
    carts.push(newCart);

    res.status(201).send({ state: "success", data: cart });
});

router.delete("/api/carts/:id", ( req, res) => {
    const { id } = req.params;
    const indice = carts.findIndex((item) => item.id === Number(id));

    if(indice < 0){
        return res.status(400).send({ "Error": "no se encontró ningún producto" });
    }
    carts.splice(indice, 1);
    res.status(200).send({ data: "Producto eliminado" });
});

export default router;