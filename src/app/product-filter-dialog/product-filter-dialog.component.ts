import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs';

import { DictionaryService } from '../_shared/dictionary.service';
import { DictionaryItem } from '../_shared/dictionary.model';
import { ProductFilterOperator } from '../_shared/product.model';

@Component({
  templateUrl: './product-filter-dialog.component.html',
  styleUrls: ['./product-filter-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterDialogComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  private isComponentDestroyed = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly dictionaryService: DictionaryService,
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      columnName: [null, Validators.required],
      operator: [null, Validators.required],
      value: [null, Validators.required],
    });

    this.form.get('columnName')?.valueChanges
      .pipe(takeWhile(() => !this.isComponentDestroyed))
      .subscribe(() => this.form.get('operator')?.setValue(null));
  }

  public ngOnDestroy(): void {
    this.isComponentDestroyed = true;
  }

  public isOperatorOptionDisabled(option: DictionaryItem): boolean {
    return this.form.get('columnName')?.value !== 'price' && (
      option.id === ProductFilterOperator.LessOrEqual ||
      option.id === ProductFilterOperator.GreaterOrEqual
    );
  }
}
