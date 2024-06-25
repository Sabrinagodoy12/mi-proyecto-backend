/* eslint-disable camelcase */
import { Router } from "express";

import CartManager from "../managers/cartManager.js";

const router = Router();
const cartManager = new CartManager();

// router.get("/", (req, res) => {
//     res.render("carts", { title: "carts" });
// });

router.get("/", async (req, res) => {
    const carts = await cartManager.readAll();
    res.render({ carts });
});

router.post("/", async (req, res) => {
    const { id, id_product } = req.body;
    const product = { id_product };
    let cart = await carts.readOneId(id);

    if(cart){
        cart.products.push(product);
    }else{
        cart = { id, products:[product] };
    }

    await cartManager.persist(cart);

    res.send({ status: true, cart });
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