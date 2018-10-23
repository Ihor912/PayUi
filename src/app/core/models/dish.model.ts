export interface Dish {
    _id: string;
    title: string;
    categoryId: string;
    description: string;
    piecePrice: number;
    totalPrice: number;
    count: number;
    mass: number;
    code: string;
    mainPhotoUrl: string;
    pictures: [string];
}
