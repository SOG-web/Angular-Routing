import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { Product, ProductResolved } from './product';
// import {AppService} from '../app.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              // private appService: AppService,
              private router: Router
  ) {}

  ngOnInit(): void {
    const resolvedData: ProductResolved = this.route.snapshot.data[
      'resolvedData'
    ];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

  showOutlet(): void {
    /*
    for the multiple outlet stuff on app.html
    this.appService.isDisplayed = false;
    */

    this.router.navigate([{ outlets: {popup: 'summary' }}]);
  }
}
