import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../_services/CartService/cart-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  CartDisplayText = '';
  constructor(private cartService: CartService, private cd: ChangeDetectorRef) { }

  ngOnInit() {

    this.cartService.getNumberOfCartItems.subscribe((data) => {
      if (data === 1) {
        this.CartDisplayText = '(1 item)';
      } else if (data > 1) {
        this.CartDisplayText = '(' + data + ' items)';
      } else {
        this.CartDisplayText = '';
      }


    });
  }

}
