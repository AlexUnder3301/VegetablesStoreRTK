export interface DataItemType {
    id: number,
    name: string,
    price: number,
    image: string,
    category: string
}

export interface CardDataItemType extends DataItemType {
    quantity: number
}

export interface AppContextType {
    handleAddToCart: (product: CardDataItemType) => void,
    handleCartModalSwitch: () => void,
    cart: CardDataItemType[]
}