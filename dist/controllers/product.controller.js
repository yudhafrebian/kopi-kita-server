import { createProductService, getAllProductsService, } from "../services/product.service";
import { successResponse } from "../utils/response";
import { slugConverter } from "../utils/slugConverter";
class ProductController {
    async getAllProducts(req, res, next) {
        try {
            const { category } = req.query;
            const getAllProducts = await getAllProductsService(category);
            successResponse(res, "Success", getAllProducts);
        }
        catch (error) {
            next(error);
        }
    }
    async createProduct(req, res, next) {
        try {
            const { name, description, price, image_url, category_id } = req.body;
            const createProduct = await createProductService({
                name,
                slug: slugConverter(name),
                description,
                price: Number(price),
                image_url: image_url || "",
                category_id: Number(category_id),
                created_at: new Date(),
            }, req.file);
            successResponse(res, "Success", createProduct);
        }
        catch (error) {
            next(error);
        }
    }
}
export default ProductController;
