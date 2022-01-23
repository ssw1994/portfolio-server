import { CartItem } from "../schemas/cartItem.schema";

export class UpdateCartItemQuantityDto{
    cartItemId:CartItem;
    quantity:number;
}