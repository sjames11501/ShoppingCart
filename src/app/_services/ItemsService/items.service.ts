import { Injectable } from '@angular/core';
import { StoreRoot, MenuItem } from '../../_interfaces/interfaces.mystore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AstMemoryEfficientTransformer } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }


  getStoreMenu(): Promise<any> {
    return this.http.get<any>('assets/menu.json').toPromise();
  }


  getLocation(): Promise<any>{

    return this.http.get<any>('assets/location.json').toPromise();
  }
  async getMenuItem(id): Promise<any> {
    const StoreMenu: StoreRoot = await this.http.get<any>('assets/menu.json').toPromise();
    // tslint:disable-next-line:prefer-const
    let items: MenuItem[] = [];

    try {
      // Since we do not have an external API that handles this logic, we have to loop through menu.json

      for (const category of StoreMenu.categories) {
        for (const item of category.items) {
          items.push(item);
        }
      }

      const SelectedItem = items.find(item => item.id === id);
      return Promise.resolve(SelectedItem);

    } catch (err) {
      console.log(err);
      return Promise.resolve(null);

    }
  }

}
