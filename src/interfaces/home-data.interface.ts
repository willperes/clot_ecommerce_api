import { Category } from "./category.interface";
import { Product } from "./product.interface";

export interface HomeData {
    categories: Category[]
    products: Product[]
    topSellingProducts: Product[]
    newInProducts: Product[]
}