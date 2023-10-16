import { Model } from "objection";
import { CategoryModel } from "./category.model";
import { ProductType } from "src/interfaces/product.interface";

export interface ProductModelData {
    id: number
    title: string
    subtitle: string
    type: ProductType
    category_id: number
    description: string
    images: string // string[] JSON
    price: number
    created_at: Date
    updated_at: Date
}

export class ProductModel extends Model {
    public id: number
    public title: string
    public subtitle: string
    public type: ProductType
    public category_id: number
    public description: string
    public images: string
    public price: number
    public created_at: Date
    public updated_at: Date

    static get tableName(): string {
        return "product"
    }
    
    static get relationMappings() {
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: CategoryModel,
                join: {
                    from: 'product.category_id',
                    to: 'category.id',
                },
            },
        };
    }

    // TODO: images JSON structure validator
}
