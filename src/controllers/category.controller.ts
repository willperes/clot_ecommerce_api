import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreateCategoryDTO } from 'src/dto/create-category.dto';
import { CategoryService } from 'src/services/category.service';
import { Category } from 'src/interfaces/category.interface';

@Controller("category")
export class CategoryController {
  constructor(private readonly service: CategoryService, private logger: Logger) {}

  @Get()
  public findAll(): Promise<Category[]> {
    this.logger.debug("Category Controller » Request received to find all categories")
    return this.service.findAll()
  }

  @Post()
  public createCategory(@Body() dto: CreateCategoryDTO): Promise<Category> {
    this.logger.debug("Category Controller » Request received to create a new category")
    return this.service.insertCategory(dto)
  }
}
