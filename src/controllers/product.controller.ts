import { NextFunction, Request, Response } from "express";
import {
  createProductService,
  getAllProductsService,
  getProductDetailservice,
  updateProductService,
} from "../services/product.service";
import { successResponse } from "../utils/response";
import { Products } from "../types/products.type";
import { slugConverter } from "../utils/slugConverter";

class ProductController {
  async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { category } = req.query;
      const getAllProducts = await getAllProductsService(category as string);
      successResponse(res, "Success", getAllProducts);
    } catch (error) {
      next(error);
    }
  }

  async getProductDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const getProductDetails = await getProductDetailservice(Number(id));
      successResponse(res, "Success", { getProductDetails });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, description, price, image_url, category_id }: Products =
        req.body;
      const createProduct = await createProductService(
        {
          name,
          slug: slugConverter(name),
          description,
          price: Number(price),
          image_url: image_url || "",
          category_id: Number(category_id),
          created_at: new Date(),
        },
        req.file
      );
      successResponse(res, "Success", createProduct);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description, price, image_url, category_id }: Products =
        req.body;
      const updateProduct = await updateProductService(
        Number(id),
        {
          name,
          slug: slugConverter(name),
          description,
          price: Number(price),
          image_url: image_url || "",
          category_id: Number(category_id),
          created_at: new Date(),
        },
        req.file
      );
      successResponse(res, "Success", updateProduct);
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
