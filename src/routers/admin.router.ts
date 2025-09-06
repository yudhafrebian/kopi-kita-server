import { Router } from "express";
import AdminController from "../controllers/admin.controller";

class AdminRouter {
    private route:Router;
    private adminController: AdminController;

    constructor(){
        this.route = Router();
        this.adminController = new AdminController();
        this.initializeRoutes();
    }

    private initializeRoutes():void{
        this.route.get("/all", this.adminController.getAllAdmin);
    }

    public getRouter():Router{
        return this.route;
    }
}

export default AdminRouter