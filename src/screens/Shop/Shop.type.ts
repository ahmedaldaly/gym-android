export type CategoryType = {
    id: number;
    name: string;
    image: string;
}
export type ProductType = {
     id: string,
        name: string,
        price: number,
        image: string,
        external_link: string,
        description: string,
        category_id: string
}

export type OrderRequestType = {
    productId: string,
    quantity: number,
    
}

export type ShopStackParamList = {
    shop: undefined;
    productDetails: { product: ProductType };
    myCard: undefined;
};