import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { FilterOptionsComponent } from '../filter-options/filter-options.component';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { SearchOption } from '../interfaces/search-option';
import { map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-display-products',
  standalone: true,
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss'],
  imports: [ProductItemComponent, FilterOptionsComponent, NgIf, NgFor],
})
export class DisplayProductsComponent {
  productList: Product[] = [];

  private readonly DestroyRef = inject(DestroyRef);
  private readonly productService = inject(ProductService);
  
  onSearchTermChange(searchTerm: Partial<SearchOption>): void {
    this.fetchItems(searchTerm);
  }

  private fetchItems(searchTerm: Partial<SearchOption>): void {
    this.productService.fetchProduct().pipe(
      tap(value => console.log(value)),
      map(() => this.productService.filterProducts(searchTerm)),
      tap(products => this.productList = products),
      takeUntilDestroyed(this.DestroyRef)).subscribe();
  }
}
