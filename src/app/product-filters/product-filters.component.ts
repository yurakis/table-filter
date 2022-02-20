import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';

import { ProductFilterDialogComponent } from '../product-filter-dialog/product-filter-dialog.component';
import { ProductFilter } from '../_shared/product.model';
import { DictionaryService } from '../_shared/dictionary.service';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFiltersComponent {
  @Output() public readonly filtersChange = new EventEmitter<ProductFilter[]>()

  public form?: FormGroup;

  public filters: ProductFilter[] = [];

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly matDialog: MatDialog,
    public readonly dictionaryService: DictionaryService,
  ) {}

  public openFilterDialog(): void {
    this.matDialog
      .open(ProductFilterDialogComponent)
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((filter: ProductFilter) => {
        this.updateFilters([...this.filters, filter]);
        this.changeDetector.markForCheck();
      });
  }

  public deleteFilter(filter: ProductFilter): void {
    const filters = [...this.filters];

    filters.splice(filters.indexOf(filter), 1);
    this.updateFilters(filters);
  }

  private updateFilters(filters: ProductFilter[]): void {
    this.filters = filters;
    this.filtersChange.emit(filters);
  }
}
