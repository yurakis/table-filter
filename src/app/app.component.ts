import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';

import { ProductService } from './_shared/product.service';
import { ProductFilter } from './_shared/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly filters$ = new BehaviorSubject<ProductFilter[]>([]);

  public readonly products$ = this.filters$.pipe(
    switchMap((filters) => this.productService.getProducts(filters)),
  );

  constructor(private readonly productService: ProductService) {}
}
