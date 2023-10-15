import { ArrayMinSize, IsArray, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDTO {
    @MinLength(5)
    @IsString()
    public title: string

    @MinLength(5)
    @IsString()
    public subtitle: string

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
