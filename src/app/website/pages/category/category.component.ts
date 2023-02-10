import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../../models/product.model';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  productId: string| null = null;
  products: Product[] = [];
  limit = 10;
  offset = 0;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    /* this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
    });

    if (this.categoryId) {
      this.productsService.getByCategory(this.categoryId).subscribe((rta) => {
        this.products = rta;
      });
    } */
    this.route.paramMap.pipe(switchMap(params => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        return this.productsService.getByCategory(this.categoryId, this.limit, this.offset);
      }
      return [];
    })).subscribe((data:any)=>{
      this.products = data;
    })

    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    })
  }

  loadMore() {
    if(this.categoryId){
      this.productsService.getByCategory(this.categoryId,this.limit, this.offset).subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
    }
   
  }
}
