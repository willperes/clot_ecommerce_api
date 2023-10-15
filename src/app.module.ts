import { Logger, Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from './repositories/category.repository';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repositories/product.repository';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [],
  controllers: [
    CategoryController,
    ProductController
  ],
  providers: [
    Logger,
    CategoryService,
    CategoryRepository,
    ProductService,
    ProductRepository,
  ],
})
export class AppModule {}
