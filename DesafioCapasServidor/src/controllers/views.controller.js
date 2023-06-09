import productModel from "../dao/mongo/models/product.js";
import cartService from "../services/carts.services.js";

//GET PRODUCTS
const getProducts = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const { limit = 10 } = req.query;
        const { sort } = req.query;

        let ordenar = ''

        if (sort == 1 || sort == -1 || sort == 'asc' || sort == 'desc') {
            ordenar = { price: sort }
        }

        const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, ...rest } = await productModel.paginate({}, {
            page, limit, sort: ordenar, lean: true
        });

        const products = docs;
        res.render("home", {
            products,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page: rest.page,
            limit: rest.limit,
            user: req.user
        });


    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al obtener productos" });
    }
}

//REGISTER
const register = (req, res) => {
    res.render('register')
}

//LOGIN
const login = (req, res) => {
    res.render('login')
}

//CURRENT
const current = (req, res) => {
    let user = req.user
    res.render('current', { user })
}

//GET CART BY ID
const getCartById = async (req, res) => {
    try {
        const { cid } = req.params
        const cartId = await cartService.getCartById({ _id: cid })
        if (!cartId) return res.status(404).send({ status: "error", error: "Cart not found" });
        res.render("cart", cartId)
    } catch (error) {
        console.log(error)
    }
};

//Real Time Products
const realTimeProducts = (req, res) => {
    res.render("realtimeproducts");
}

//CHAT
const chat = (req, res) => {
    res.render("chat");
}

export default {
    getProducts, register, login, current, getCartById, realTimeProducts, chat
}

