import { Router } from "express";
import CategoryController from "../controllers/category.controller";

class CategoryRouter{
    private route:Router
    private categoryController: CategoryController
    constructor(){
        this.route = Router()
        this.categoryController = new CategoryController()
        this.inizializeRoutes()
    }
    private inizializeRoutes():void {
        this.route.get("/all", this.categoryController.getAllCategories)
        this.route.post("/create", this.categoryController.createCategory)
        this.route.post("/delete/:id", this.categoryController.deleteCategory)
        this.route.patch("/update/:id", this.categoryController.updateCategory)
    }   
    public getRouter():Router{
        return this.route
    }
}

export default CategoryRouter