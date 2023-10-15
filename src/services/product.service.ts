import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { ProductRepository } from 'src/repositories/product.repository';
import { Product } from 'src/interfaces/product.interface';
import { CategoryService } from './category.service';
import { HomeData } from 'src/interfaces/home-data.interface';

@Injectable()
export class ProductService {
    constructor(private readonly repository: ProductRepository, private readonly categoryService: CategoryService) {}

    public findAll = (): Promise<Product[]> => {
      return this.repository.findAll()
    }

    public findHomeData = async (): Promise<HomeData> => {
      const products = await this.findAll()

      const topSellingProducts = this.findTopSelling(products)
      const newInProducts = this.findNewIn(products)

      // TODO: get from products with relationship
      const categories = await this.categoryService.getCategoriesFromProducts(products)

      return {
        products,
        categories,
        topSellingProducts,
        newInProducts
      }
    }

    public findByCategory = (categoryID: number): Promise<Product[]> => {
      return this.repository.findByCategory(categoryID)
    }
    
    public findByID = (id: number): Promise<Product | null> => {
        return this.repository.findByID(id)
    }

    public insertProduct = async (dto: CreateProductDTO): Promise<Product> => {
      const category = await this.categoryService.findByID(dto.categoryID)

      if (!category) {
        throw new BadRequestException("Invalid category ID")
      }
      
      const now = new Date()
      const insertionData: Omit<Product, "id"> = {
        title: dto.title,
        subtitle: dto.subtitle,
        description: dto.description,
        categoryID: dto.categoryID,
        price: dto.price,
        images: dto.images,
        createdAt: now,
        updatedAt: now
      }
      return this.repository.insert(insertionData)
    }

    private findTopSelling = (products: Product[]): Product[] => {
      // TODO: implement this feature when orders are also implemented
      return products.splice(0, 20)
    }

    private findNewIn = (products: Product[]): Product[] => {
      const sortedArray = products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      return sortedArray.splice(0, 20)
    }
}
