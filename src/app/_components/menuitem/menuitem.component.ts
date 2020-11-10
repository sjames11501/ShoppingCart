import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../_services/CartService/cart-service.service';
import { MenuItem, Cart } from '../../_interfaces/interfaces.mystore';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.scss']
})
export class MenuitemComponent implements OnInit {

  constructor(private cartService: CartService, private ref: ChangeDetectorRef) { }

  @Input() inputModel: MenuItem;

  qty: number;
  ItemInCart = false;
  menuItem: MenuItem;

  async ngOnInit() {

    this.menuItem = this.inputModel;
    const cart = this.cartService.getCart();
    this.ItemInCart = this.cartService.CartItemExists(cart, this.menuItem.id);
    if (this.ItemInCart) {
      const selected = await cart.CartItems.find(item => item.id === this.menuItem.id);
      this.qty = selected.qty;

    } else {
      this.qty = 1;
    }



  }


  removeFromCart = () => {
    const res = this.cartService.RemoveItemFromCart(this.menuItem.id);
    // Item succesfully removed from cart
    if (res) {
      this.ItemInCart = false;
      this.qty = 1;
      alert(this.menuItem.name + ' was removed from your cart.');
    }

  }
  updateCartItem = () => {

    const cartItemDB = this.cartService.getCartItem(this.menuItem.id);
    if (this.qty !== cartItemDB.qty) {
      try {
        const res = this.cartService.updateCartItem(this.menuItem.id, this.qty);
        alert('Cart item sucesfully updated');
      } catch (err) {
        console.log(err);
      }
    }
  }
  addToCart = async () => {
    const res = await this.cartService.addItemToCart(this.menuItem.id, this.qty);
    if (res) {
      alert(this.menuItem.name + ' was added to your cart');
      this.ItemInCart = true;
      return;
    }

  }

}
