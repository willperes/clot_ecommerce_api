import { Category } from "./category.interface";
import { ProductViewModel } from "./product.interface";

export interface HomeData {
    categories: Category[]
    products: ProductViewModel[]
    topSellingProducts: ProductViewModel[]
    newInProducts: ProductViewModel[]
}