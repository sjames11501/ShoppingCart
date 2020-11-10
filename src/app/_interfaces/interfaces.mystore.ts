
export interface TaxRate {
    rate: string;
    label: string;
}

export interface OrderMiscItem {
    label: string;
    total: number;
}

export class Order {
    taxes: OrderMiscItem[];
    surecharges: OrderMiscItem[];
    // tslint:disable-next-line:variable-name
    order_items: CartItem[];

}

export interface MenuItem {
    id: number;
    name: string;
    price: string;
    description: string;
    position: number;
    image_url: string;
    tax_rates: TaxRate[];
}

export interface Category {
    id: number;
    name: string;
    items: MenuItem[];
}

export interface StoreRoot {

    categories: Category[];
}

export interface SurchargeConfiguration {
    amount: string;
    percent: string;
    label: string;
}

export interface Location {
    name: string;
    menu_url: string;
    surcharge_configuration: SurchargeConfiguration[];
}

export class Cart {
    CartId: string;
    CartItems: Array<CartItem>;
    CartTotal: number;
    public CheckoutComplete: boolean;

    constructor() {
        this.CheckoutComplete = false;
    }
}

export class CartItem implements MenuItem {
    id: number;
    name: string;
    price: string;
    description: string;
    position: number;
    // tslint:disable-next-line:variable-name
    image_url: string;
    // tslint:disable-next-line:variable-name
    tax_rates: TaxRate[];
    qty: number;



}
