import { TestBed, getTestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemsService } from './items.service';
import { Injector } from '@angular/core';
import { MenuItem } from 'src/app/_interfaces/interfaces.mystore';
import * as promisedData from '../../../assets/menu.json';

describe('ItemsService', () => {

  let injector: TestBed;

  let myProvider: ItemsService;

  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],

      providers: [ItemsService]

    });

    injector = getTestBed();

    myProvider = injector.get(ItemsService);

    httpMock = injector.get(HttpTestingController);

  });

  describe('getProducts', () => {


    it('should return an Observable<Product[]>', () => {







    });

  });



});



