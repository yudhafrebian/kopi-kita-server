import { Router } from "express";
import DashboardController from "../controllers/dashboard.controller";
import { verifyToken } from "../middleware/token";

class DashboardRouter {
  private route: Router;
  private DahsboardController: DashboardController;
  constructor() {
    this.route = Router();
    this.DahsboardController = new DashboardController();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.route.get("/summary", verifyToken, this.DahsboardController.summary);
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default DashboardRouter;
