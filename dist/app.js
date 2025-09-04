"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = __importDefault(require("./configs/prisma"));
const category_router_1 = __importDefault(require("./routers/category.router"));
const product_router_1 = __importDefault(require("./routers/product.router"));
const port = process.env.PORT || 3000;
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.configure();
        this.routes();
        this.errorHandler();
    }
    configure() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
    }
    routes() {
        const categoryRouter = new category_router_1.default();
        const productRouter = new product_router_1.default();
        this.app.get("/", (req, res) => {
            res.status(200).send("Base API");
        });
        this.app.use("/categories", categoryRouter.getRouter());
        this.app.use("/products", productRouter.getRouter());
    }
    errorHandler() {
        this.app.use((error, req, res, next) => {
            console.log(error);
            res.status(500).send({
                success: false,
                message: error.message,
                error,
            });
        });
    }
    async start() {
        try {
            await prisma_1.default.$connect();
            console.log("Database connected");
            this.app.listen(port, () => {
                console.log("Server is running on port:", port);
            });
        }
        catch (error) {
            console.log("Database connection error", error);
        }
    }
}
exports.default = App;
