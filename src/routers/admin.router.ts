import { Router } from "express";
import AdminController from "../controllers/admin.controller";
import { verifyToken } from "../middleware/token";

class AdminRouter {
  private route: Router;
  private adminController: AdminController;

  constructor() {
    this.route = Router();
    this.adminController = new AdminController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post("/signin", this.adminController.signIn);
    this.route.post("/signup", this.adminController.signUp);
    this.route.get("/all", this.adminController.getAllAdmin);
    this.route.get("/keep-login", verifyToken, this.adminController.keepLogin);
    this.route.patch("/update/:id",verifyToken, this.adminController.updateAdmin);
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default AdminRouter;
