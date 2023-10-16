import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { ProductRepository } from 'src/repositories/product.repository';
import { Product, ProductType, ProductViewModel } from 'src/interfaces/product.interface';
import { CategoryService } from './category.service';
import { HomeData } from 'src/interfaces/home-data.interface';

@Injectable()
export class ProductService {
    constructor(private readonly repository: ProductRepository, private readonly categoryService: CategoryService) {}

    public findAll = async (): Promise<ProductViewModel[]> => {
      const products = await this.repository.findAll()
      return products.map(this.mapProductToProductViewModel)
    }

    public findHomeData = async (): Promise<HomeData> => {
      await new Promise((res) => setTimeout(() => res(true), 1000))
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

    public findByCategory = async (categoryID: number): Promise<ProductViewModel[]> => {
      const products = await this.repository.findByCategory(categoryID)
      return products.map(this.mapProductToProductViewModel)
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
        type: dto.type,
        categoryID: dto.categoryID,
        price: dto.price,
        images: dto.images,
        createdAt: now,
        updatedAt: now
      }
      return this.repository.insert(insertionData)
    }

    private findTopSelling = (products: ProductViewModel[]): ProductViewModel[] => {
      // TODO: implement this feature when orders are also implemented
      return products.splice(0, 20)
    }

    private findNewIn = (products: ProductViewModel[]): ProductViewModel[] => {
      const sortedArray = products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      return sortedArray.splice(0, 20)
    }

    private mapProductToProductViewModel = (product: Product): ProductViewModel => {
      const sizes = this.getSizesForAProduct(product.type)
      return {
        ...product,
        sizes
      }
    }

    public getSizesForAProduct = (type: ProductType) => {
      switch (type) {
          case ProductType.Accessories: return ['S', 'M', 'L', 'XL']
          case ProductType.Clothing: return ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL']
          case ProductType.FootWear: return ['35', '37', '38', '39', '40', '41', '42', '43', '44', '45']
          case ProductType.Bags: return ['S', 'M', 'L']
      }
  }
}
