import { Router } from "express";
import ProductController from "../controllers/product.controller";
import { uploaderMemory } from "../middleware/uploader";
class ProductRouter {
    constructor() {
        this.route = Router();
        this.productController = new ProductController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/all", this.productController.getAllProducts);
        this.route.post("/create", uploaderMemory().single("image_url"), this.productController.createProduct);
    }
    getRouter() {
        return this.route;
    }
}
export default ProductRouter;
