import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import prisma from "./configs/prisma";
import CategoryRouter from "./routers/category.router";
import ProductRouter from "./routers/product.router";

const port = process.env.PORT || 3000;

class App {
  app: Application;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.errorHandler();
  }

  private configure() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private routes() {
    const categoryRouter = new CategoryRouter();
    const productRouter = new ProductRouter();
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).send("Base API");
    });
    this.app.use("/categories", categoryRouter.getRouter());
    this.app.use("/products", productRouter.getRouter());
  }

  private errorHandler() {
    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        console.log(error);
        res.status(500).send({
          success: false,
          message: error.message,
          error,
        });
      }
    );
  }

  public async start(): Promise<void> {
    try {
      await prisma.$connect();
      console.log("Database connected");
      this.app.listen(port, () => {
        console.log("Server is running on port:", port);
      });
    } catch (error) {
      console.log("Database connection error", error);
    }
  }
}

export default App;
