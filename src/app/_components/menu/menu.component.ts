import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../_services/CartService/cart-service.service';
import { StoreRoot, Cart } from '../../_interfaces/interfaces.mystore';
import { ItemsService } from '../../_services/ItemsService/items.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  StoreMenu: StoreRoot;
  loading = false;
  ShowMenu = false;
  NumberOfCartItems = 0;
  CartIsActive = false;
  showCheckoutButton = false;
  MyCart: any;

  // tslint:disable-next-line:max-line-length
  constructor(private cartService: CartService, private cd: ChangeDetectorRef, private router: Router, private itemsService: ItemsService) { }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async ngOnInit() {
    this.loading = true;
    this.ShowMenu = true;
    this.StoreMenu = await this.itemsService.getStoreMenu();
    this.cartService.getNumberOfCartItems.subscribe((data) => {
      this.NumberOfCartItems = data;
    });


    this.MyCart = this.cartService.getCart();

    try {
      if (this.MyCart.CartItems) {
        this.CartIsActive = true;

      }
    } catch (err) {
      console.log(err);
    }
    await this.sleep(200); // imitate loading external api
    this.loading = false;


  }

  checkout = () => {
    this.router.navigate(['/cart']);
  }


}
