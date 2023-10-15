import { ProductModel, ProductModelData } from "src/models/product.model";
import { Product } from "src/interfaces/product.interface";

export class ProductRepository {
    constructor() {}

    public findAll = async (): Promise<Product[]> => {
        const result = await ProductModel.query().select("*")
        return result.map(this.mapProductModelToProduct)
    }
    
    public findByCategory = async (categoryID: number): Promise<Product[]> => {
        const result = await ProductModel.query().where({ category_id: categoryID })
        return result.map(this.mapProductModelToProduct)
    }

    public findByID = async (id: number): Promise<Product | null> => {
        const result = await ProductModel.query().findById(id)

        if (!result) return null
        
        return this.mapProductModelToProduct(result)
    }

    public insert = async (data: Omit<Product, "id">): Promise<Product> => {
        const result = await ProductModel.query().insertAndFetch(this.mapProductToProductModelData(data))
        return this.mapProductModelToProduct(result)
    }

    private mapProductToProductModelData = (data: Omit<Product, "id">): Omit<ProductModelData, "id"> => ({
        category_id: data.categoryID,
        description: data.description,
        images: JSON.stringify(data.images),
        subtitle: data.subtitle,
        title: data.title,
        price: data.price,
        created_at: data.createdAt,
        updated_at: data.updatedAt
    })

    private mapProductModelToProduct = (model: ProductModel): Product => ({
        id: model.id,
        categoryID: model.category_id,
        description: model.description,
        images: JSON.parse(JSON.stringify(model.images)),
        subtitle: model.subtitle,
        title: model.title,
        price: model.price,
        createdAt: model.created_at,
        updatedAt: model.updated_at,
    })
}