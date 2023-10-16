import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { ProductType } from "src/interfaces/product.interface";

export class CreateProductDTO {
    @MinLength(5)
    @IsString()
    public title: string

    @MinLength(5)
    @IsString()
    public subtitle: string

    @IsEnum(ProductType)
    public type: ProductType

    @IsNumber()
    public categoryID: number

    @MinLength(20)
    @IsString()
    public description: string

    // TODO: validate URL
    @ArrayMinSize(2)
    @IsArray()
    public images: string[]

    @IsPositive()
    @IsNumber()
    public price: number
}
