import { Model } from "objection";

export interface CategoryModelData {
    id: number
    title: string
    image: string
    created_at: Date
    updated_at: Date
}

export class CategoryModel extends Model {
    public id: number
    public title: string
    public image: string
    public created_at: Date
    public updated_at: Date

    static get tableName(): string {
        return "category"
    }
}
