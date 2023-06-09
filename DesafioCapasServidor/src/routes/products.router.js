import { passportCall } from "../services/auth.js";
import BaseRouter from "./Router.js";
import productControllers from "../controllers/product.controllers.js";


export default class ProductRouter extends BaseRouter {
    init() {
        //GET PRODUCTS
        this.get('/', ['PUBLIC'], passportCall('jwt', { strategyType: 'jwt', session: false }), productControllers.getProducts)

        // //CATEGORY FILTER
        this.get('/:category', ['PUBLIC'], passportCall('jwt', { strategyType: 'jwt', session: false }), productControllers.getProductsByCategory)

        // //GET BY ID
        this.get('/:pid', ['PUBLIC'], passportCall('jwt', { strategyType: 'jwt', session: false }), productControllers.getProductsById)

        // //POST
        this.post('/', ['PUBLIC'], passportCall('jwt', { strategyType: 'jwt', session: false }), productControllers.createProduct)

        // // //PUT
        this.put('/:pid', ['PUBLIC'], passportCall('jwt', { strategyType: 'jwt', session: false }), productControllers.updateProduct)

        // //DELETE
        this.delete('/:pid', ['PUBLIC'], passportCall('jwt', { strategyType: 'jwt', session: false }), productControllers.deleteProduct)

    }
}
