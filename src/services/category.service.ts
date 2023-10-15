import { Injectable } from "@nestjs/common";
import { CreateCategoryDTO } from "src/dto/create-category.dto";
import { CategoryRepository } from "src/repositories/category.repository";
import { Category } from "src/interfaces/category.interface";
import { Product } from "src/interfaces/product.interface";

@Injectable()
export class CategoryService {
    constructor(private readonly repository: CategoryRepository) {}

    public findAll = (): Promise<Category[]> => {
        return this.repository.findAll()
    }
    
    public findByID = (id: number): Promise<Category | null> => {
        return this.repository.findByID(id)
    }

    public getCategoriesFromProducts = async (products: Product[]): Promise<Category[]> => {
        const categories = await this.findAll()
        const availableCategories = new Set(categories.filter(category => products.some(product => product.categoryID === category.id)))
        
        return [...availableCategories]
    }

    public insertCategory = async (dto: CreateCategoryDTO): Promise<Category> => {
        const now = new Date()
        const insertionData: Omit<Category, "id"> = {
            title: dto.title,
            image: dto.image,
            createdAt: now,
            updatedAt: now
          }
        return this.repository.insert(insertionData)
    }
}
