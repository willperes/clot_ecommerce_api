import { Body, Controller, Get, Logger, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { ProductService } from 'src/services/product.service';
import { Product } from 'src/interfaces/product.interface';
import { HomeData } from 'src/interfaces/home-data.interface';

@Controller("product")
export class ProductController {
  constructor(private readonly service: ProductService, private readonly logger: Logger) {}

  @Get()
  public findAll(): Promise<Product[]> {
    this.logger.debug("Product Controller » Request received to find all products")
    return this.service.findAll()
  }

  @Get("home")
  public findHomeData(): Promise<HomeData> {
    this.logger.debug("Product Controller » Request received to fetch home data")
    return this.service.findHomeData()
  }

  @Get("category/:categoryID")
  public findByCategory(@Param("categoryID", ParseIntPipe) categoryID: number): Promise<Product[]> {
    this.logger.debug("Product Controller » Request received to find all products by category")
    return this.service.findByCategory(categoryID)
  }

  @Post()
  public createProduct(@Body() dto: CreateProductDTO): Promise<Product> {
    this.logger.debug("Product Controller » Request received to create a new product")
    return this.service.insertProduct(dto)
  }
}
