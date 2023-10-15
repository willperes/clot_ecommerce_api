import { CategoryModel, CategoryModelData } from "src/models/category.model";
import { Category } from "src/interfaces/category.interface";

export class CategoryRepository {
    constructor() {}

    public findAll = async (): Promise<Category[]> => {
        const result = await CategoryModel.query().select("*")
        return result.map(this.mapCategoryModelToCategory)
    }

    public findByID = async (id: number): Promise<Category | null> => {
        const result = await CategoryModel.query().findById(id)

        if (!result) return null
        
        return this.mapCategoryModelToCategory(result)
    }

    public insert = async (data: Omit<Category, "id">): Promise<Category> => {
        const result = await CategoryModel.query().insertAndFetch(this.mapCategoryToCategoryModelData(data))
        return this.mapCategoryModelToCategory(result)
    }

    private mapCategoryToCategoryModelData = (data: Omit<Category, "id">): Omit<CategoryModelData, "id"> => ({
        image: data.image,
        title: data.title,
        created_at: data.createdAt,
        updated_at: data.createdAt
    })

    private mapCategoryModelToCategory = (model: CategoryModel): Category => ({
        id: model.id,
        image: model.image,
        title: model.title,
        createdAt: model.created_at,
        updatedAt: model.updated_at
    })
}