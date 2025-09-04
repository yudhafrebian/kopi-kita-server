import { Router } from "express";
import ProductController from "../controllers/product.controller";
import { uploaderMemory } from "../middleware/uploader";

class ProductRouter {
  private route: Router;
  private productController: ProductController;
  constructor() {
    this.route = Router();
    this.productController = new ProductController();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.route.get("/all", this.productController.getAllProducts);
    this.route.post(
      "/create",
      uploaderMemory().single("image_url"),
      this.productController.createProduct
    );
  }
  public getRouter(): Router {
    return this.route;
  }
}

export default ProductRouter;
