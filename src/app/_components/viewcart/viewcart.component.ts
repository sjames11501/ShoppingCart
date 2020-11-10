import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartService } from '../../_services/CartService/cart-service.service';
import { Location, Cart, OrderMiscItem, Order } from '../../_interfaces/interfaces.mystore';
import { ItemsService } from '../../_services/ItemsService/items.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.scss']
})


export class ViewCartComponent implements OnInit {
  loading = false;
  OrderComplete = false;
  ShowCart = false;
  // Objects that are compiled into an order
  taxes: OrderMiscItem[] = [];
  Surecharges: OrderMiscItem[] = [];
  //////////////////////
  TaxTypes: string[] = [];
  SurechargesTotal = 0;
  TaxTotal = 0;
  Subtotal = 0;
  OrderTotal = 0;
  MyCart: Cart;
  constructor(private cartService: CartService, private itemsService: ItemsService) { }

  async ngOnInit() {
    this.loading = true;
    this.ShowCart = false;
    this.MyCart = this.cartService.getCart();
    console.log(this.MyCart);

    try {
      if (this.MyCart.CartItems.length >= 1) {
        this.ShowCart = true;
        await this.getOrderTotal();
        this.loading = false;
      }
    } catch (err) {
      this.ShowCart = false;
      this.loading = false;
      console.log(err);
    }
    this.loading = false;
  }

  // sumbits the order to api endpoint
  checkout = async () => {
    this.loading = true;

    try {
      console.log('Posting the follow to the orders api:');
      // Order total can be calculated based on the sum from order_items, taxes, and surecharges.
      const NewOrder: Order = {
        taxes: this.taxes,
        surecharges: this.Surecharges,
        order_items: this.MyCart.CartItems
      };
      await this.sleep(500); // pause to imitate POST request
      console.log(NewOrder);
      this.OrderComplete = true;
      this.cartService.clearCart();


    } catch (err) { // handle any errors that result from the POST
      console.log(err);
    } finally {
      this.loading = false;
    }




  }


  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  getOrderTotal = async () => {
    this.setSubTotal();
    this.getTaxTypes();
    this.setTaxTotal();
    await this.setSurchargesTotal();
    this.OrderTotal = this.Subtotal + this.TaxTotal + this.SurechargesTotal;
  }

  // Sets the private TaxTotal variable - the total of all taxes charged
  private setTaxTotal = () => {
    let total = 0;
    for (const item of this.TaxTypes) {
      this.getTaxTotalByType(item, true);
    }
    for (const item of this.taxes) {
      total = total + item.total;
    }
    this.TaxTotal = total;

  }
  private setSurchargesTotal = async () => {
    const location: Location = await this.itemsService.getLocation();
    let total = 0;

    for (const item of location.surcharge_configuration) {
      // generate the item to be saved with the (potential) order
      const newItem: OrderMiscItem = {
        label: item.label,
        total: parseInt(item.amount, 10)
      };

      this.Surecharges.push(newItem);
      if (item.percent === '0.0%') {
        total = total + parseInt(item.amount, 10);
      }
    }
    this.SurechargesTotal = total;


  }



  // Loops over all items and calculates taxes - this method is called from the view, and simpyl returns the value
  getTaxTotalByType = (type: string, addToTaxArray: boolean) => {
    let total = 0;
    for (const item of this.MyCart.CartItems) {
      const lineTotal = item.qty * parseInt(item.price, 10);
      for (const taxtype of item.tax_rates) {
        if (taxtype.label === type) {
          const taxTotal = parseFloat(taxtype.rate) * lineTotal;
          total = total + taxTotal;
        }


      }
    }
    const result: OrderMiscItem = { label: type, total };
    if (addToTaxArray) {
      this.taxes.push(result);
      return;
    }

    return total;
  }
  public setSubTotal() {
    let total = 0;
    for (const item of this.MyCart.CartItems) {
      const lineTotal = item.qty * parseInt(item.price, 10);
      total = total + lineTotal;
    }
    this.Subtotal = total;
  }
  private getTaxTypes() {


    for (const item of this.MyCart.CartItems) {
      for (const taxtype of item.tax_rates) {
        const alreadyExists = this.TaxTypes.includes(taxtype.label);
        if (!alreadyExists) {
          this.TaxTypes.push(taxtype.label);
          continue;

        }
      }
    }




  }

}
