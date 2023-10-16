export interface Product {
    id: number
    title: string
    subtitle: string
    type: ProductType
    categoryID: number
    description: string
    images: string[]
    price: number
    createdAt: Date
    updatedAt: Date
}

export interface ProductViewModel extends Product {
    sizes: string[]
}

export enum ProductType {
    Clothing = 1,
    FootWear = 2,
    Accessories = 3,
    Bags = 4,
}