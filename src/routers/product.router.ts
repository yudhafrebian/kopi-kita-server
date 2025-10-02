import { Router } from "express";
import ProductController from "../controllers/product.controller";
import { uploaderMemory } from "../middleware/uploader";
import { verifyToken } from "../middleware/token";

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
    this.route.get(
      "/all/:id",
      this.productController.getProductDetails
    );
    this.route.post(
      "/create",
      uploaderMemory().single("image_url"),
      this.productController.createProduct
    );
    this.route.patch(
      "/update/:id",
      uploaderMemory().single("image_url"),
      this.productController.updateProduct
    );
    this.route.patch("/delete/:id", this.productController.deleteProduct);
  }
  public getRouter(): Router {
    return this.route;
  }
}

export default ProductRouter;
