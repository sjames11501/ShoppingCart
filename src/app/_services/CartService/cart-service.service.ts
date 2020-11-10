import { Injectable } from '@angular/core';
import { MenuItem } from '../../_interfaces/interfaces.mystore';
import { Cart } from '../../_interfaces/interfaces.mystore';
import { CartItem } from '../../_interfaces/interfaces.mystore';
import { BehaviorSubject, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuidv4 } from 'uuid';
import { ItemsService } from '../../_services/ItemsService/items.service';

@Injectable({
  providedIn: 'root'
})


export class CartService {
  private Cart: Cart;
  private UserCartItems = new BehaviorSubject(0);
  getNumberOfCartItems = this.UserCartItems.asObservable();


  constructor(private cookieService: CookieService, private itemsService: ItemsService) { }


  emit() {

    try {
      this.UserCartItems.next(this.Cart.CartItems.length);

    } catch (err) {
      this.UserCartItems.next(0);
    }



  }

  clearCart = () => {
    const MyCart = new Cart();
    MyCart.CartId = uuidv4();
    if (!this.SaveCart(MyCart)) {
      return false;
    }
    this.emit();
    return true;
  }

  getCartItem = (id) => {
    try {
      const myCart = this.getCart();
      const cartItem = myCart.CartItems.find(item => item.id === id);
      return (cartItem);
    } catch (err) {
      return null;
    }
  }

  // Returns a new cart instance, or gets the stored instance if the user already has an existing cart
  public getCart(): Cart {
    let MyCart: Cart;
    let CartNull: boolean;
    try {
      MyCart = JSON.parse(this.cookieService.get('cart'));
      CartNull = false;
    } catch {

      CartNull = true;
    }
    if (CartNull) {

      MyCart = new Cart();
      MyCart.CartId = uuidv4();
      if (!this.SaveCart(MyCart)) {
        return null;
      }

    }
    MyCart = JSON.parse(this.cookieService.get('cart'));
    this.Cart = MyCart;
    this.emit();
    return MyCart;

  }

  public RemoveItemFromCart(id) {
    const MyCart = this.getCart();
    if (this.CartItemExists(MyCart, id)) {
      MyCart.CartItems = MyCart.CartItems.filter(item => item.id !== id);
      if (this.SaveCart(MyCart)) {
        this.Cart = MyCart;
        this.emit();
        return true;
      }
      return false;

    }
    return true;
  }

  public CartItemExists(MyCart: Cart, id: number) {
    // Cart is entirely empty
    if (!MyCart.CartItems) {
      return false;
    }

    if (MyCart.CartItems.length >= 1) {
      const found = MyCart.CartItems.find(item => item.id === id);
      if (found) { return true; }
      return false;

    }
    return false;

  }

  private SaveCart(MyCart: Cart) {

    try {
      this.cookieService.set('cart', JSON.stringify(MyCart));
      this.Cart = MyCart;
      this.emit();
      return true;

    } catch (err) {
      // Error saving Cart
      return false;
    }

  }

  updateCartItem(id, qty) {
    const MyCart = this.getCart();
    const SelectedItem = MyCart.CartItems.find(item => item.id === id);

    try {
      // tslint:disable-next-line:max-line-length
      MyCart.CartItems = MyCart.CartItems.filter(item => item.id !== SelectedItem.id); // Retreive the CartItems array without the selectedItem
      SelectedItem.qty = qty; // set the new qty
      MyCart.CartItems.push(SelectedItem);
      if (this.SaveCart(MyCart)) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  }
  public async addItemToCart(id: number, qty: number) {

    const MyCart = this.getCart();

    try {

      const SelectedItem = await this.itemsService.getMenuItem(id); // retreive item from db
      if (!MyCart.CartItems) {
        MyCart.CartItems = [];
      }
      SelectedItem.qty = qty;
      MyCart.CartItems.push(SelectedItem);

      if (this.SaveCart(MyCart)) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;

    }

  }

}






