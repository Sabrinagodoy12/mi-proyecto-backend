import FileSystem from "../utils/fileSystem.js";

export default class cartManager {
    #filename;
    #fileSystem;
    #carts;

    constructor() {
        this.#filename = "carts.json";
        this.#fileSystem = new FileSystem(this.#filename);
        this.#carts = [];
    }

    persist = async (cart) => {
        const cartRegistered = await this.readOneId(cart.id);

        if (cartRegistered) {
            cartRegistered.products = cart.products;
        } else {
            this.#carts.push(this.#carts);
        }
        await this.#fileSystem.write(this.#carts,
        );
    };

    readAll = async () => {
        this.#carts = await this.#fileSystem.read() ?? [];
        return this.#carts;
    };

    readOneId = async (id) => {
        this.readAll();
        const cart = this.#carts.find((cart) => cart.id === Number(id));

        return cart;
    };
}