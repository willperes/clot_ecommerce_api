import { IsString, IsUrl, MinLength } from "class-validator";

export class CreateCategoryDTO {
    @MinLength(5)
    @IsString()
    public title: string

    @IsUrl()
    public image: string
}