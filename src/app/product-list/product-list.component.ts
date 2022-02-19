import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Product } from '../_shared/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements AfterViewInit {
  public readonly displayedColumns: Array<keyof Product> = ['product_name', 'product_desc', 'category', 'price'];

  public readonly dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) public paginator?: MatPaginator;

  @Input() set products(value: Product[] | null) {
    if (value === null) {
      return;
    }

    this.dataSource.data = value;
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }
}
