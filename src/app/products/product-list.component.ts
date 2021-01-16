import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {Product, ProductResolved} from './product';
import { ProductService } from './product.service';
import {AppService} from '../app.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  loading = true;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    // private appService: AppService
  ) {}

  ngOnInit(): void {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage =
      this.route.snapshot.queryParamMap.get('showImage') === 'true';


    this.route.data.subscribe({
      next: (data) => {
        console.log(data);
        const resolvedProducts: Product[] = data['resolvedProducts'];
        this.products = resolvedProducts;
        this.filteredProducts = this.performFilter(this.listFilter);
      },
      error: (err) => (this.errorMessage = err),
    });
    this.router.navigate([{ outlets: {popup: ['summary'] }}]);
    // this.productService.getProducts().subscribe({
    //   next: (products) => {
    //     this.products = products;
    //     this.filteredProducts = this.performFilter(this.listFilter);
    //   },
    //   error: (err) => (this.errorMessage = err),
    // });
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: Product) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  hideOutlet(): void {
    /*
    for the multiple outlet stuff on app.html
    this.appService.isDisplayed = false;
    */

    this.router.navigate([{ outlets: {popup: 'summary' }}]);
  }
}
